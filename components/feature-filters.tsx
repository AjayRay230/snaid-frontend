"use client"
const displayColorMap: Record<string, string> = {
  red: "bg-red-500",
  green: "bg-green-500",
  brown: "bg-amber-700",
  olive: "bg-lime-700",
  black: "bg-black",
  yellow: "bg-yellow-400",
  gray: "bg-gray-400",
  grey: "bg-gray-400",
  silver: "bg-gray-300",
  orange: "bg-orange-500",
  golden: "bg-yellow-500",
  bronze: "bg-amber-600",
  cream: "bg-yellow-100",
  tan: "bg-yellow-700",
  sandy: "bg-yellow-600",
  pink: "bg-pink-400",
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  lime: "bg-lime-500",
  crimson: "bg-red-700",
  coral: "bg-rose-400",
}

function getColorClass(color: string) {

  const normalized =
    color.toLowerCase()

  for (const key in displayColorMap) {

    if (normalized.includes(key)) {
      return displayColorMap[key]
    }
  }

  return "bg-gray-300"
}

function getDisplayLabel(color: string) {

  const normalized =
    color.toLowerCase()

  if (normalized.includes("brown"))
    return "Brown"

  if (normalized.includes("green"))
    return "Green"

  if (normalized.includes("black"))
    return "Black"

  if (normalized.includes("gray"))
    return "Gray"

  if (normalized.includes("grey"))
    return "Gray"

  if (normalized.includes("olive"))
    return "Olive"

  if (normalized.includes("yellow"))
    return "Yellow"

  if (normalized.includes("red"))
    return "Red"

  if (normalized.includes("orange"))
    return "Orange"

  if (normalized.includes("gold"))
    return "Golden"

  if (normalized.includes("bronze"))
    return "Bronze"

  if (normalized.includes("purple"))
    return "Purple"

  if (normalized.includes("pink"))
    return "Pink"

  return color
}


function normalizeColor(color: string) {

  const normalized =
    color.toLowerCase()

  if (normalized.includes("brown"))
    return "Brown"

  if (normalized.includes("green"))
    return "Green"

  if (normalized.includes("black"))
    return "Black"

  if (normalized.includes("gray"))
    return "Gray"

  if (normalized.includes("grey"))
    return "Gray"

  if (normalized.includes("olive"))
    return "Olive"

  if (normalized.includes("yellow"))
    return "Yellow"

  if (normalized.includes("red"))
    return "Red"

  if (normalized.includes("orange"))
    return "Orange"

  if (normalized.includes("gold"))
    return "Golden"

  if (normalized.includes("bronze"))
    return "Bronze"

  if (normalized.includes("purple"))
    return "Purple"

  if (normalized.includes("pink"))
    return "Pink"

  return "Other"
}

interface FeatureFiltersProps {
  selectedColor: string
  setSelectedColor: (value: string) => void

  selectedHabitat: string
  setSelectedHabitat: (value: string) => void

  selectedBodyShape: string
  setSelectedBodyShape: (value: string) => void

  selectedHeadShape: string
  setSelectedHeadShape: (value: string) => void

  uniqueColors: string[]
  uniqueHabitats: string[]
  uniqueBodyShapes: string[]
  uniqueHeadShapes: string[]
}

export function FeatureFilters({
  selectedColor,
  setSelectedColor,

  selectedHabitat,
  setSelectedHabitat,

  selectedBodyShape,
  setSelectedBodyShape,

  selectedHeadShape,
  setSelectedHeadShape,

  uniqueColors,
  uniqueHabitats,
  uniqueBodyShapes,
  uniqueHeadShapes,
}: FeatureFiltersProps) {

  const resetFilters = () => {
    setSelectedColor("")
    setSelectedHabitat("")
    setSelectedBodyShape("")
    setSelectedHeadShape("")
  }

  return (
    <div className="space-y-5">

      {/* Heading */}
      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold text-green-900">
            Visual Filters
          </h3>

          <p className="text-sm text-gray-500">
            Select visible snake characteristics
          </p>
        </div>

        <button
          onClick={resetFilters}
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
        >
          Reset Filters
        </button>

      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">


{/* Color Dropdown */}
<div className="space-y-2">

  <label className="text-sm font-semibold text-green-900">
    Color
  </label>

  <select
    value={selectedColor}
    onChange={(e) =>
      setSelectedColor(e.target.value)
    }
    className="w-full rounded-2xl border border-green-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-green-500"
  >

    <option value="">
      All Colors
    </option>

    {uniqueColors.map((color) => (
      <option
        key={color}
        value={color}
      >
        {color}
      </option>
    ))}

  </select>

</div>

        {/* Habitat */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-green-900">
            Habitat
          </label>

          <select
            value={selectedHabitat}
            onChange={(e) => setSelectedHabitat(e.target.value)}
            className="h-11 w-full rounded-xl border border-green-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            <option value="">All Habitats</option>

            {uniqueHabitats.map((habitat) => (
              <option key={habitat} value={habitat}>
                {habitat}
              </option>
            ))}
          </select>

        </div>

        {/* Body Shape */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-green-900">
            Body Shape
          </label>

          <select
            value={selectedBodyShape}
            onChange={(e) => setSelectedBodyShape(e.target.value)}
            className="h-11 w-full rounded-xl border border-green-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            <option value="">All Body Shapes</option>

            {uniqueBodyShapes.map((shape) => (
              <option key={shape} value={shape}>
                {shape}
              </option>
            ))}
          </select>

        </div>

        {/* Head Shape */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-green-900">
            Head Shape
          </label>

          <select
            value={selectedHeadShape}
            onChange={(e) => setSelectedHeadShape(e.target.value)}
            className="h-11 w-full rounded-xl border border-green-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            <option value="">All Head Shapes</option>

            {uniqueHeadShapes.map((shape) => (
              <option key={shape} value={shape}>
                {shape}
              </option>
            ))}
          </select>

        </div>

      </div>

    </div>
  )
}