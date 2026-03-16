interface HeroProps {
  title: string
  subtitle: string
  ctaText?: string
}

export function Hero({ title, subtitle, ctaText = "Sign Up Now" }: HeroProps) {
  return (
    <section className="relative px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="mx-auto max-w-2xl text-center z-10 relative">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {subtitle}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#lead-form"
            className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            {ctaText}
          </a>
        </div>
      </div>
      {/* Decorative Blob */}
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-200/50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
    </section>
  )
}
