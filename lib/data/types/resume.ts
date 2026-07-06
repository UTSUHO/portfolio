export interface ExperienceItem {
  year: string
  company: string
  position: string
  description: string
}

export interface ExperienceProfile {
  id: string
  label: string
  items: ExperienceItem[]
  skills: { name: string; level: number }[]
}
