"use client"

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

        {/* Color */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-green-900">
            Color
          </label>

          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="h-11 w-full rounded-xl border border-green-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            <option value="">All Colors</option>

            {uniqueColors.map((color) => (
              <option key={color} value={color}>
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