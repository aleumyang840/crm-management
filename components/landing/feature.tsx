import { CheckCircle2 } from "lucide-react"

interface FeatureProps {
  features: string[]
}

export function Feature({ features }: FeatureProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 bg-white flex flex-col items-center">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50 shadow-sm transition-transform hover:-translate-y-1">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 leading-relaxed font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
