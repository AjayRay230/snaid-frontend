// lib/types.ts — REPLACE ENTIRE FILE
export interface SnakeResult {
  "Image": string
  "Identification Confidence": string
  "Predicted Species": string
  "Venomous status": "Venomous" | "Non-Venomous"
  "About This Snake": string
  "Habitat & Distribution": string
  "Danger Level": "High" | "Low"
  "Recommended Antivenom": string
  error?: string
}