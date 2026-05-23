import { PageHero } from '../components/PageHero'
import { FaqSection } from '../components/FaqSection'
import { CtaSection } from '../components/CtaSection'

export function FaqPage() {
  return (
    <main className="pb-6">
      <PageHero
        eyebrow="FAQ"
        title="Common questions, answered"
        description="Browse the most common questions about matching, allocation, privacy, and employer controls."
      />
      <FaqSection />
      <CtaSection />
    </main>
  )
}
