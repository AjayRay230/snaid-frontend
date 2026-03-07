"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { SnakeResult } from "@/lib/types"
import { AlertCircle, ArrowLeft, Shield, Zap, MapPin, Microscope, Activity, Dna } from "lucide-react"

interface ResultsDisplayProps {
  result: SnakeResult
  onReset: () => void
}

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const [barWidth, setBarWidth] = useState(0)

  const isVenomous = result["Venomous status"] === "Venomous"
  const isDangerous = result["Danger Level"] === "High"
  const confidence = parseFloat(result["Identification Confidence"])
  const hasAntivenom =
    result["Recommended Antivenom"] &&
    result["Recommended Antivenom"] !== "None" &&
    result["Recommended Antivenom"] !== "Not Available" &&
    result["Recommended Antivenom"] !== "Not applicable"

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(Math.min(confidence, 100)), 150)
    return () => clearTimeout(t)
  }, [confidence])

  const confidenceGradient =
    confidence >= 80 ? "from-emerald-500 to-green-400"
    : confidence >= 60 ? "from-yellow-500 to-amber-400"
    : "from-red-500 to-orange-400"

  return (
    <div className="mesh-bg min-h-screen">
    <div className="max-w-2xl mx-auto px-4 py-10">

        <Button
          variant="ghost"
          onClick={onReset}
          className="mb-6 text-muted-foreground hover:text-foreground gap-2 pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Identification
        </Button>

        {/* ── Species Hero Card ── */}
        <div className={`glass rounded-2xl overflow-hidden shadow-2xl mb-4 animate-fade-up
          ${isDangerous ? "ring-1 ring-red-500/30" : "ring-1 ring-primary/20"}`}
        >
          {/* Top bar — danger-coded */}
          <div className={`h-1 w-full ${isDangerous
            ? "bg-gradient-to-r from-red-600 via-orange-500 to-red-600"
            : "bg-gradient-to-r from-transparent via-primary to-transparent"
          }`} />

          <div className="p-6">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-primary/15 flex items-center justify-center">
                    <Dna className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    Identified Species
                  </span>
                </div>
                <h1 className="text-3xl font-bold italic text-primary leading-tight">
                  {result["Predicted Species"]}
                </h1>
              </div>
              <Badge
                variant={isVenomous ? "destructive" : "default"}
                className={`shrink-0 mt-1 text-xs px-3 py-1.5 font-bold
                  ${isVenomous
                    ? "bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/25"
                    : "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/25"
                  }`}
              >
                {result["Venomous status"]}
              </Badge>
            </div>

            {/* Confidence */}
            <div className="bg-black/20 rounded-xl p-4 mb-5 animate-fade-up-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs font-semibold text-blue-300">Confidence</span>
                </div>
                <span className="text-xl font-black font-mono tabular-nums text-blue-300">
                  {result["Identification Confidence"]}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${confidenceGradient} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                {[0, 25, 50, 75, 100].map(v => (
                  <span key={v} className="text-[9px] text-white/20 font-mono">{v}%</span>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-5 animate-fade-up-2">
              <div className="flex items-center gap-2 mb-2">
                <Microscope className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  About This Species
                </span>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {result["About This Snake"]}
              </p>
            </div>

            {/* Habitat */}
            <div className="bg-black/20 rounded-xl p-4 animate-fade-up-3">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Habitat &amp; Distribution
                </span>
              </div>
              <p className="text-sm text-foreground/70">{result["Habitat & Distribution"]}</p>
            </div>
          </div>
        </div>

        {/* ── Medical Card ── */}
        <div className={`glass rounded-2xl overflow-hidden shadow-2xl mb-4 animate-fade-up-2
          ${isDangerous ? "ring-1 ring-red-500/30" : "ring-1 ring-emerald-500/20"}`}
        >
          <div className={`h-0.5 w-full ${isDangerous
            ? "bg-gradient-to-r from-transparent via-red-500 to-transparent"
            : "bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          }`} />

          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertCircle className={`h-4 w-4 ${isDangerous ? "text-red-400" : "text-emerald-400"}`} />
              <span className={`text-sm font-bold ${isDangerous ? "text-red-400" : "text-emerald-400"}`}>
                Danger Level &amp; Medical Information
              </span>
            </div>

            {/* Danger badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm
                ${isDangerous
                  ? "bg-red-500/20 text-red-300 border border-red-500/30 animate-danger-pulse"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                }`}>
                {isDangerous ? "⚠" : "✓"} {result["Danger Level"].toUpperCase()}
              </div>
              {isDangerous && (
                <span className="text-xs text-red-400/80">Seek medical attention immediately if bitten</span>
              )}
            </div>

            {/* Antivenom box */}
            <div className={`rounded-xl p-4 mb-5 border
              ${hasAntivenom
                ? "bg-emerald-500/10 border-emerald-500/25"
                : "bg-white/5 border-white/10"
              }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                  ${hasAntivenom ? "bg-emerald-500/20" : "bg-white/10"}`}>
                  <Shield className={`h-4 w-4 ${hasAntivenom ? "text-emerald-400" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                    Recommended Antivenom
                  </p>
                  <p className={`text-sm font-bold leading-snug
                    ${hasAntivenom ? "text-emerald-300" : "text-muted-foreground"}`}>
                    {result["Recommended Antivenom"]}
                  </p>
                  {hasAntivenom && (
                    <p className="text-xs text-emerald-400/60 mt-1">
                      Inform emergency staff of this species name
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency steps */}
            <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-red-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                  If Bitten — Emergency Response
                </span>
              </div>
              <ol className="space-y-2">
                {[
                  "Call emergency services immediately",
                  "Keep the bitten area immobilized and below heart level",
                  "Remove jewelry or tight clothing near the bite",
                  "Do not catch, kill, or handle the snake",
                  "Do not apply tourniquets, ice, or cut the wound",
                  `Tell medical staff: species is "${result["Predicted Species"]}"`,
                  "Antivenom may be required — every second counts",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-red-300/80 text-xs">
                    <span className="font-black text-red-500 shrink-0 font-mono">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Prevention */}
            <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Prevention</span>
              </div>
              <ul className="space-y-1.5">
                {[
                  "Wear boots and long pants in snake-prone areas",
                  "Watch where you step and place your hands",
                  "Avoid handling snakes unless trained",
                  "Be extra cautious during warm months",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2 text-amber-300/70 text-xs">
                    <span className="font-bold shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground/40 mb-4">
          For educational purposes only. Always consult healthcare professionals in emergencies.
        </p>

        <div className="flex justify-center pb-8">
          <Button onClick={onReset} className="bg-primary/90 hover:bg-primary text-primary-foreground gap-2">
            <ArrowLeft className="h-4 w-4" />
            Identify Another Snake
          </Button>
        </div>
      </div>
    </div>
  )
}