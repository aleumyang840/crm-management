import { Hero } from "@/components/landing/hero"
import { Feature } from "@/components/landing/feature"
import { CTA } from "@/components/landing/cta"
import { LeadForm } from "@/components/landing/form"

// Mock data that would normally come from the DB based on slug
const mockLandingData = {
  title: "Premium Insurance for Your Peace of Mind",
  subtitle: "Get the best coverage with our comprehensive insurance plans tailored exactly to your family's needs.",
  features: [
    "Comprehensive health and life coverage",
    "24/7 priority customer support",
    "No hidden broker fees or extra charges",
    "Lightning fast claim processing within 24 hours"
  ],
  ctaHeadline: "Ready to protect what matters most?",
  ctaButtonText: "Get a Free Quote",
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  return (
    <main className="min-h-screen bg-white">
      <Hero 
        title={mockLandingData.title}
        subtitle={mockLandingData.subtitle}
        ctaText={mockLandingData.ctaButtonText}
      />
      <Feature features={mockLandingData.features} />
      <CTA 
        headline={mockLandingData.ctaHeadline}
        buttonText={mockLandingData.ctaButtonText}
      />
      <LeadForm slug={slug} />
    </main>
  )
}
