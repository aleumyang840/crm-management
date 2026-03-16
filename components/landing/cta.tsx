export function CTA({ headline, buttonText }: { headline: string; buttonText: string }) {
  return (
    <section className="bg-blue-600 py-16 sm:py-24 text-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-400 rounded-full blur-3xl opacity-30 pointer-events-none" />
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
          {headline}
        </h2>
        <a
          href="#lead-form"
          className="rounded-full bg-white px-10 py-4 text-lg font-bold text-blue-600 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 inline-block"
        >
          {buttonText}
        </a>
      </div>
    </section>
  )
}
