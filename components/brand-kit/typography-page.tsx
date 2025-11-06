export function TypographyPage() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-[#2E2E2E] mb-6">Typography</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#16A34A] to-[#D4AF37] mx-auto" />
        </div>

        {/* Font Families */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Poppins */}
          <div className="bg-[#F5F5F5] p-8 rounded-3xl border border-[#E5E5E5]">
            <h3 className="text-3xl font-sans font-bold text-[#2E2E2E] mb-4">Poppins</h3>
            <p className="text-[#737373] mb-6 font-mono">Primary Font — Headings & Display</p>
            <div className="space-y-3">
              <p className="font-sans font-bold text-4xl text-[#2E2E2E]">Bold</p>
              <p className="font-sans font-semibold text-4xl text-[#2E2E2E]">Semibold</p>
              <p className="font-sans font-medium text-4xl text-[#2E2E2E]">Medium</p>
              <p className="font-sans font-normal text-4xl text-[#2E2E2E]">Regular</p>
            </div>
          </div>

          {/* Inter */}
          <div className="bg-[#F5F5F5] p-8 rounded-3xl border border-[#E5E5E5]">
            <h3 className="text-3xl font-mono font-bold text-[#2E2E2E] mb-4">Inter</h3>
            <p className="text-[#737373] mb-6 font-mono">Secondary Font — Body & UI</p>
            <div className="space-y-3">
              <p className="font-mono font-bold text-4xl text-[#2E2E2E]">Bold</p>
              <p className="font-mono font-semibold text-4xl text-[#2E2E2E]">Semibold</p>
              <p className="font-mono font-medium text-4xl text-[#2E2E2E]">Medium</p>
              <p className="font-mono font-normal text-4xl text-[#2E2E2E]">Regular</p>
            </div>
          </div>
        </div>

        {/* Typography Hierarchy */}
        <div className="bg-gradient-to-br from-[#F5F5F5] to-white p-12 rounded-3xl border border-[#E5E5E5]">
          <h3 className="text-2xl font-sans font-bold text-[#2E2E2E] mb-8">Typography Hierarchy</h3>

          <div className="space-y-8">
            <div>
              <span className="text-sm font-mono text-[#737373] mb-2 block">H1 — Hero Heading</span>
              <h1 className="text-6xl font-sans font-bold text-[#2E2E2E]">The Future of African Football</h1>
            </div>

            <div>
              <span className="text-sm font-mono text-[#737373] mb-2 block">H2 — Section Heading</span>
              <h2 className="text-4xl font-sans font-bold text-[#2E2E2E]">Excellence Through Education</h2>
            </div>

            <div>
              <span className="text-sm font-mono text-[#737373] mb-2 block">H3 — Subsection Heading</span>
              <h3 className="text-2xl font-sans font-bold text-[#2E2E2E]">World-Class Training Facilities</h3>
            </div>

            <div>
              <span className="text-sm font-mono text-[#737373] mb-2 block">Body Text — Paragraph</span>
              <p className="text-lg font-mono text-[#2E2E2E] leading-relaxed max-w-3xl">
                Farafina Foot Academy combines elite football training with rigorous academic education, preparing young
                athletes for success both on and off the field. Our holistic approach ensures that every student-athlete
                reaches their full potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
