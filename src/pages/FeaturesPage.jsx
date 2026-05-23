import { PageHero } from '../components/PageHero'
import { AudienceSection } from '../components/AudienceSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { HowItWorksSection } from '../components/HowItWorksSection'

export function FeaturesPage() {
  return (
    <main className="pb-6">
      <PageHero
        eyebrow="Features"
        title="Everything you need for faster internship placement"
        description="From intelligent matching to analytics and allocation, the platform organizes the full internship journey in one place."
      />
      <FeaturesSection />
      <HowItWorksSection />
      <AudienceSection />
    </main>
  )
}
