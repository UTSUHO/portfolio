'use client'

import { useState } from 'react'
import { Layers, ArrowRight } from 'lucide-react'
import SubSection from './sub-section'
import ExperiencePanel from '../components/experience-panel'
import Link from 'next/link'
import { ExperienceProfile } from '@/lib/data'

interface ExperienceSectionProps {
  profiles: ExperienceProfile[]
}

export default function ExperienceSection({ profiles }: ExperienceSectionProps) {
  const [index, setIndex] = useState(0)
  const profile = profiles[index]

  const cycleProfile = () => {
    setIndex((prev) => (prev + 1) % profiles.length)
  }

  return (
    <SubSection
      title="EXPERIENCE"
      action={
        <button
          type="button"
          onClick={cycleProfile}
          className="flex items-center mr-4 gap-1.5 text-text-secondary hover:text-accent transition-colors duration-150"
          title={profile.label}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{profile.label}</span>
        </button>
      }
      count={
        <Link
          href="/resume"
          className="flex items-center gap-1 hover:text-accent transition-colors duration-150"
        >
          <span>VIEW FULL RESUME</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
    >
      <ExperiencePanel items={profile.items} skills={profile.skills} />
    </SubSection>
  )
}
