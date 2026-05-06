import { SnakeData } from "./types"

interface FilterParams {
  snakes: SnakeData[]

  userState: string

  selectedColor: string
  selectedHabitat: string
  selectedBodyShape: string
  selectedHeadShape: string
}

export function filterSnakes({
  snakes,
  userState,
  selectedColor,
  selectedHabitat,
  selectedBodyShape,
  selectedHeadShape,
}: FilterParams) {

  // Normalize helper
  const normalize = (value?: string) =>
    value?.toLowerCase().trim() || ""

  // Check if user selected any filters
  const hasSelectedFilters =
    selectedColor ||
    selectedHabitat ||
    selectedBodyShape ||
    selectedHeadShape

  // -----------------------------
  // Region Filtering
  // -----------------------------
  const regionFilteredSnakes = snakes.filter((snake) => {

    // No location yet
    if (!userState) return true

    // No region data
    if (!snake.Region) return false

    const snakeRegions = snake.Region
      .split(";")
      .map((region) => normalize(region))

    return snakeRegions.includes(
      normalize(userState)
    )
  })

  // -----------------------------
  // Score Matching
  // -----------------------------
  const scoredSnakes = regionFilteredSnakes.map((snake) => {

    let matchScore = 0

    // Color Match (Highest Weight)
    if (
      selectedColor &&
      normalize(snake.Color) === normalize(selectedColor)
    ) {
      matchScore += 4
    }

    // Habitat Match
    if (
      selectedHabitat &&
      normalize(snake.Habitat) === normalize(selectedHabitat)
    ) {
      matchScore += 3
    }

    // Body Shape Match
    if (
      selectedBodyShape &&
      normalize(snake["Body Shape"]) === normalize(selectedBodyShape)
    ) {
      matchScore += 2
    }

    // Head Shape Match
    if (
      selectedHeadShape &&
      normalize(snake["Head Shape"]) === normalize(selectedHeadShape)
    ) {
      matchScore += 1
    }

    return {
      ...snake,
      matchScore,
    }
  })

  // -----------------------------
  // Sort by Match Score
  // -----------------------------
  const sortedSnakes = [...scoredSnakes].sort(
    (a, b) => {

      // Higher score first
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore
      }

      // Stable alphabetical fallback
      return a.Name.localeCompare(b.Name)
    }
  )

  // -----------------------------
  // If filters selected:
  // hide 0-score snakes
  // -----------------------------
  if (hasSelectedFilters) {
    return sortedSnakes.filter(
      (snake) => snake.matchScore > 0
    )
  }

  // Otherwise show all
  return sortedSnakes
}