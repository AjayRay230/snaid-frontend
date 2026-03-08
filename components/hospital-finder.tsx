"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone, AlertTriangle, Loader2 } from "lucide-react"

interface Hospital {
  placeName: string
  placeAddress: string
  distance: number
  latitude: number
  longitude: number
  phone?: string
}

export function HospitalFinder() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [mapLoading, setMapLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [mapReady, setMapReady] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  // Load Mappls SDK v3
useEffect(() => {
  if (typeof window === "undefined") return
  if ((window as any).Mappls || (window as any).mappls) { setMapReady(true); return }

  const script = document.createElement("script")
  script.src = `https://apis.mappls.com/advancedmaps/api/${process.env.NEXT_PUBLIC_MAPPLS_KEY}/map_sdk?layer=vector&v=3.0`
  script.async = true
  script.defer = true
  script.onload = () => setTimeout(() => setMapReady(true), 500)
  script.onerror = () => setError("Failed to load map SDK")
  document.head.appendChild(script)
}, [])

  // Init map once SDK ready and location available
// Init map once SDK ready and location available
useEffect(() => {
  if (!mapReady || !userLocation || !mapRef.current) return
  if (mapInstanceRef.current) return

  setMapLoading(true)

  let attempts = 0
  const init = () => {
    const Mappls = (window as any).Mappls || (window as any).mappls
    if (!Mappls) {
      attempts++
      if (attempts < 20) { setTimeout(init, 300); return }
      setError("Map failed to load. Please refresh.")
      setMapLoading(false)
      return
    }

    try {
        const map = new Mappls.Map({
        id: mapRef.current!,
        center: { lat: userLocation.lat, lng: userLocation.lng },
        zoom: 14
        })

      // v3 uses 'load' event differently — just add marker directly after a short delay
      setTimeout(() => {
        try {
          new Mappls.Marker({
            map,
            position: { lat: userLocation.lat, lng: userLocation.lng },
            popupHtml: "<b>📍 Your Location</b>",
            popupOptions: { openPopup: true },
          })
        } catch (e) {
          console.warn("Marker error:", e)
        }
        mapInstanceRef.current = map
        setMapLoading(false)
      }, 1000)

    } catch (e) {
      console.error("Map init error:", e)
      setMapLoading(false)
    }
  }

  init()
}, [mapReady, userLocation])

  // Add hospital markers when hospitals change
useEffect(() => {
  if (!mapInstanceRef.current || hospitals.length === 0) return
  const Mappls = (window as any).Mappls || (window as any).mappls
  if (!Mappls) return

  markersRef.current.forEach(m => m.remove?.())
  markersRef.current = []

  hospitals.forEach((h, i) => {
    const marker = new Mappls.Marker({
      map: mapInstanceRef.current,
      position: { lat: h.latitude, lng: h.longitude },
      popupHtml: `<div style="font-size:13px;padding:4px">
        <b>#${i + 1} ${h.placeName}</b><br/>
        <span style="color:#666">${h.placeAddress}</span><br/>
        <span style="color:#16a34a;font-weight:bold">${(h.distance / 1000).toFixed(1)} km away</span>
      </div>`,
    })
    marker.addListener("click", () => setSelectedHospital(h))
    markersRef.current.push(marker)
  })
}, [hospitals])

  const fetchLocation = () => {
    setLoading(true)
    setError("")
    setHospitals([])

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setUserLocation({ lat, lng })
        await fetchNearbyHospitals(lat, lng)
      },
      () => {
        setError("Location access denied. Please allow location access and try again.")
        setLoading(false)
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  const fetchNearbyHospitals = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`/api/mappls-token?lat=${lat}&lng=${lng}`)
      if (!res.ok) throw new Error("Failed to fetch hospitals")
      const data = await res.json()

      if (!data.suggestedLocations || data.suggestedLocations.length === 0) {
        setError("No hospitals found within 5km of your location.")
        setLoading(false)
        return
      }

      const results: Hospital[] = data.suggestedLocations.map((p: any) => ({
        placeName: p.placeName || "Unknown Hospital",
        placeAddress: p.placeAddress || "",
        distance: p.distance || 0,
        latitude: p.latitude,
        longitude: p.longitude,
        phone: p.phone || null,
      }))

      results.sort((a, b) => a.distance - b.distance)
      setHospitals(results)
    } catch (err) {
      setError("Failed to fetch nearby hospitals. Check your API credentials.")
    } finally {
      setLoading(false)
    }
  }

  const openDirections = (hospital: Hospital) => {
    if (!userLocation) return
    const url = `https://maps.mappls.com/directions?origin=${userLocation.lat},${userLocation.lng}&destination=${hospital.latitude},${hospital.longitude}`
    window.open(url, "_blank")
  }

  const focusOnMap = (hospital: Hospital) => {
    if (!mapInstanceRef.current) return
            mapInstanceRef.current.setCenter({
            lat: hospital.latitude,
            lng: hospital.longitude
            })
            mapInstanceRef.current.setZoom(16)
            setSelectedHospital(hospital)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/40">
        <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-red-700 dark:text-red-400">Emergency Hospital Finder</p>
          <p className="text-xs text-red-600/70 dark:text-red-300/60">Find nearest hospitals sorted by distance</p>
        </div>
      </div>

      {/* Get location button */}
      {!userLocation && (
        <Button
          onClick={fetchLocation}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Fetching your location...</>
          ) : (
            <><Navigation className="mr-2 h-4 w-4" />Find Nearby Hospitals</>
          )}
        </Button>
      )}

      {/* Error */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/25 rounded-xl text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Map */}
      {userLocation && (
        <div className="relative rounded-xl overflow-hidden border border-border shadow-sm">
          {mapLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/80">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-xs text-muted-foreground">Loading map...</p>
              </div>
            </div>
          )}
          <div ref={mapRef} style={{ width: "100%", height: "320px" }} />
        </div>
      )}

      {/* Hospital list */}
      {hospitals.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">
              {hospitals.length} hospitals found nearby
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchLocation}
              className="text-xs text-muted-foreground"
            >
              Refresh
            </Button>
          </div>

          {hospitals.map((h, i) => (
            <div
              key={i}
              onClick={() => focusOnMap(h)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-150
                ${selectedHospital?.placeName === h.placeName
                  ? "border-primary/50 bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/30 hover:bg-muted/30"
                }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 flex-1 min-w-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black
                    ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{h.placeName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{h.placeAddress}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs font-bold flex items-center gap-1
                        ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                        <MapPin className="h-3 w-3" />
                        {(h.distance / 1000).toFixed(1)} km
                      </span>
                      {h.phone && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {h.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={i === 0 ? "default" : "outline"}
                  className="shrink-0 text-xs h-8 px-3"
                  onClick={(e) => { e.stopPropagation(); openDirections(h) }}
                >
                  <Navigation className="h-3 w-3 mr-1" />
                  Go
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}