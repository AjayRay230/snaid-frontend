"use client"

import { useEffect, useState } from "react"
import { SnakeGallery } from "./snake-gallery"
import { SnakeDetails } from "./snake-details"

import { loadSnakes } from "@/lib/load-snakes"
import { SnakeData } from "@/lib/types"
import { filterSnakes } from "@/lib/filter-snakes"

import { FeatureFilters } from "./feature-filters"
interface VisualIdentificationProps {
  userLocation: {
    lat: number
    lng: number
  } | null
}

export default function VisualIdentification({
  userLocation,
}: VisualIdentificationProps) {

  // Snake Database
  const [snakes, setSnakes] = useState<SnakeData[]>([])

  // Loading + Error
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // User Location
  const [userState, setUserState] = useState("")
 

  // Filters
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedHabitat, setSelectedHabitat] = useState("")
  const [selectedBodyShape, setSelectedBodyShape] = useState("")
  const [selectedHeadShape, setSelectedHeadShape] = useState("")

  // Pagination
  const [visibleCount, setVisibleCount] = useState(5)

  const [selectedSnake, setSelectedSnake] =
  useState<SnakeData | null>(null)

  // Load CSV
  useEffect(() => {

    async function fetchSnakes() {

      try {

        const data = await loadSnakes()
        setSnakes(data)

      } catch (err) {

        console.error(err)
        setError("Failed to load snake database")

      } finally {

        setLoading(false)

      }
    }

    fetchSnakes()

  }, [])



  // Reset Pagination on Filter Change
  useEffect(() => {

    setVisibleCount(5)

  }, [
    selectedColor,
    selectedHabitat,
    selectedBodyShape,
    selectedHeadShape,
  ])

  // Has Filters
  const hasSelectedFilters =
    selectedColor ||
    selectedHabitat ||
    selectedBodyShape ||
    selectedHeadShape

  // Filter + Rank Snakes
  const finalSnakes = filterSnakes({
    snakes,
    userState,
    selectedColor,
    selectedHabitat,
    selectedBodyShape,
    selectedHeadShape,
  })

  // Unique Options
  const uniqueColors = [
    ...new Set(
      snakes.map((snake) => snake.Color).filter(Boolean)
    ),
  ]

  const uniqueHabitats = [
    ...new Set(
      snakes.map((snake) => snake.Habitat).filter(Boolean)
    ),
  ]

  const uniqueBodyShapes = [
    ...new Set(
      snakes.map((snake) => snake["Body Shape"]).filter(Boolean)
    ),
  ]

  const uniqueHeadShapes = [
    ...new Set(
      snakes.map((snake) => snake["Head Shape"]).filter(Boolean)
    ),
  ]

  // Loading UI
  if (loading ) {
    return (
      <div className="py-20 text-center text-lg font-medium text-green-800">
        Loading snake database...
      </div>
    )
  }

  // Error UI
  if (error) {
    return (
      <div className="py-20 text-center text-red-600">
        {error}
      </div>
    )
  }

  return (

    <div className="space-y-8">

      {/* Header */}
      <div className="space-y-2">

        <h2 className="text-3xl font-bold text-green-900">
          Visual Snake Identification
        </h2>

        <p className="text-sm text-gray-500">
          Select visible snake features to narrow down the most probable species.
        </p>

        {userState && (
          <div className="text-sm font-medium text-emerald-700">
            Showing snakes commonly found in {userState}
          </div>
        )}

        <div className="text-sm font-semibold text-green-700">
          {finalSnakes.length} probable snakes found
        </div>

      </div>

      {/* Filters */}
      <FeatureFilters
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}

        selectedHabitat={selectedHabitat}
        setSelectedHabitat={setSelectedHabitat}

        selectedBodyShape={selectedBodyShape}
        setSelectedBodyShape={setSelectedBodyShape}

        selectedHeadShape={selectedHeadShape}
        setSelectedHeadShape={setSelectedHeadShape}

        uniqueColors={uniqueColors}
        uniqueHabitats={uniqueHabitats}
        uniqueBodyShapes={uniqueBodyShapes}
        uniqueHeadShapes={uniqueHeadShapes}
      />

      {/* Snake Gallery */}
        <SnakeGallery
        snakes={finalSnakes}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        hasSelectedFilters={!!hasSelectedFilters}
        setSelectedSnake={setSelectedSnake}
        />

        
       

    </div>
  )
}