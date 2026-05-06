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


export interface SnakeData {
  Name: string
  Binomial: string
  Region: string
  Color: string
  Habitat: string
  "Body Shape": string
  "Head Shape": string
  Scales: string
  Fangs: string
  Image: string
  "Venomous status": string
  "Recommended Antivenom": string
  "About This Snake": string
}