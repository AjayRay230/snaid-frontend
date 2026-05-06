// lib/types.ts — REPLACE ENTIRE FILE
export interface SnakeResult {
  // IMAGE RESPONSE
  Image?: string
  "Identification Confidence"?: string
  "Predicted Species"?: string
  "Venomous status"?: "Venomous" | "Non-Venomous"
  "About This Snake"?: string
  "Habitat & Distribution"?: string
  "Danger Level"?: "High" | "Low"
  "Recommended Antivenom"?: string

  // TEXT RESPONSE
  species?: string
  confidence?: string
  venom_status?: string
  about?: string
  habitat?: string
  antivenom?: string

  error?: string
}
