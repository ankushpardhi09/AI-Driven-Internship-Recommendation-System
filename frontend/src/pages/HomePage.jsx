import { CtaSection } from '../components/CtaSection'
import { FaqSection } from '../components/FaqSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { HeroSection } from '../components/HeroSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { StatsSection } from '../components/StatsSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { UserJourneySection } from '../components/UserJourneySection'

export function HomePage() {
  return (
    <main className="pb-6">
      <HeroSection />
      <FeaturesSection />
      <UserJourneySection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </main>
  )
}

