"use client"

import { useEffect, useState } from "react"

interface Hospital {
  placeName: string
  placeAddress: string
  latitude: number
  longitude: number
  distance: number
}

interface HospitalFinderProps {
  latitude: number
  longitude: number
}

export function HospitalFinder({
  latitude,
  longitude,
}: HospitalFinderProps) {

  const [hospitals, setHospitals] =
    useState<Hospital[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    async function fetchHospitals() {

      try {

        const response = await fetch(
          `/api/mappls-token?lat=${latitude}&lng=${longitude}`
        )

        const data = await response.json()

        const places =
          data.suggestedLocations || []

        const formattedHospitals =
          places.map((hospital: any) => ({
            placeName:
              hospital.placeName,
            placeAddress:
              hospital.placeAddress,
            latitude:
              hospital.latitude,
            longitude:
              hospital.longitude,
            distance:
              hospital.distance,
          }))

        setHospitals(formattedHospitals)

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)

      }
    }

    fetchHospitals()

  }, [latitude, longitude])

  if (loading) {

    return (

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <h2 className="text-2xl font-bold text-gray-900">
          Nearby Hospitals
        </h2>

        <p className="mt-4 text-gray-600">
          Loading nearby hospitals...
        </p>

      </div>
    )
  }

  return (

    <div className="space-y-6 rounded-3xl bg-white p-8 shadow-lg">

      <div>

        <h2 className="text-2xl font-bold text-gray-900">
          Nearby Emergency Hospitals
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Hospitals closest to your current location
        </p>

      </div>

      {/* Hospital Cards */}
      <div className="grid gap-5">

        {hospitals.slice(0, 5).map((hospital, index) => (

          <div
            key={index}
            className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm"
          >

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="space-y-2">

                <h3 className="text-lg font-bold text-red-900">
                  {hospital.placeName}
                </h3>

                <p className="text-sm text-gray-700">
                  {hospital.placeAddress}
                </p>

                <div className="text-sm font-semibold text-red-700">
                  {(hospital.distance / 1000).toFixed(2)} km away
                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3">

                {/* View on Map */}
                <a
                  href={`https://www.google.com/maps?q=${hospital.latitude},${hospital.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow transition hover:bg-gray-100"
                >
                  View Map
                </a>

                {/* Navigate */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-red-800"
                >
                  Navigate
                </a>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}