'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

const testimonials = [
  { id: 1, name: 'Arjun Mehta', position: 'CTO', company: 'Nexus Fintech', rating: 5, text: 'Aperture transformed our legacy payment infrastructure into a modern, cloud-native architecture. Their engineering precision and ability to work under tight compliance constraints is unlike any team we have worked with.' },
  { id: 2, name: 'Priya Nair', position: 'VP of Product', company: 'HealthBridge India', rating: 5, text: 'The AI diagnostic module they built exceeded every benchmark we set. They understood the sensitivity of medical data and delivered something we are genuinely proud to put in front of clinicians.' },
  { id: 3, name: 'Rohan Sharma', position: 'Director of Engineering', company: 'LogiCore Systems', rating: 5, text: 'Working with Aperture felt like having a senior engineering team embedded in our organisation. They shipped our enterprise resource platform ahead of schedule and with zero critical bugs at launch.' },
  { id: 4, name: 'Deepa Krishnan', position: 'Founder', company: 'EduReach', rating: 5, text: 'As a startup, we needed a partner who could think like a product team, not just execute tickets. Aperture challenged our assumptions, improved our roadmap, and built something far better than what we originally scoped.' },
  { id: 5, name: 'Vikram Iyer', position: 'Head of Operations', company: 'SpaceWorks Realty', rating: 5, text: 'The property management platform they delivered cut our admin overhead by nearly 60%. The resident self-service portal alone has reduced support calls dramatically. The ROI was visible within the first month.' },
  { id: 6, name: 'Sneha Patel', position: 'Chief Product Officer', company: 'RetailOS', rating: 5, text: 'Aperture brought serious engineering discipline to a project that had previously failed with two other agencies. They diagnosed the root cause quickly and rebuilt it on a foundation that actually scales.' },
  { id: 7, name: 'Karthik Balaji', position: 'Co-Founder', company: 'SupplyChain.ai', rating: 5, text: 'Their knowledge of LLM orchestration and agentic workflows is genuinely best-in-class for a team of their size. They shipped an AI procurement assistant that our operations team now considers indispensable.' },
  { id: 8, name: 'Ananya Rao', position: 'Engineering Manager', company: 'Finzo Capital', rating: 5, text: 'We handed Aperture a vague brief and they turned it into a detailed technical specification before writing a single line of code. That discovery discipline alone saved us weeks of rework downstream.' },
  { id: 9, name: 'Suresh Menon', company: 'MediScan Labs', position: 'Research Lead', rating: 5, text: 'The TB detection model they trained achieved accuracy rates that surprised our in-house data science team. They were rigorous about dataset integrity and explained every architectural decision clearly.' },
  { id: 10, name: 'Lakshmi Venkat', company: 'BrightEdu Trust', position: 'Director', rating: 5, text: 'ScholarHive has completely changed how our students collaborate. The real-time sync works flawlessly even on lower-bandwidth connections, which was a non-negotiable requirement for our rural campuses.' },
  { id: 11, name: 'Rahul Gupta', company: 'CloudNest Technologies', position: 'Platform Architect', rating: 5, text: 'Aperture is one of the few teams I have seen that treats infrastructure as a first-class concern, not an afterthought. Their cloud architecture decisions held up perfectly when we scaled from 200 to 20,000 users.' },
  { id: 12, name: 'Meera Subramanian', company: 'Tarak Ventures', position: 'Managing Partner', rating: 5, text: 'Every portfolio company we have referred to Aperture has come back with glowing feedback. They are now our default recommendation for serious technical builds across our entire fund.' },
  { id: 13, name: 'Aditya Bose', company: 'FreightLink India', position: 'Head of Technology', rating: 5, text: 'Our inventory tracking system was a patchwork of spreadsheets before Aperture stepped in. The platform they built gave us real-time visibility across 14 warehouses and automated processes we thought were impossible to automate.' },
  { id: 14, name: 'Divya Krishnaswamy', company: 'PulseHealth', position: 'Product Manager', rating: 5, text: 'What impressed me most was how they handled scope changes without drama. Mid-project we pivoted our core user flow entirely. They absorbed it, re-planned in 48 hours, and kept delivery on schedule.' },
  { id: 15, name: 'Sanjay Choudhary', company: 'Titan Logistics', position: 'COO', rating: 5, text: 'The automated billing module alone recovered its development cost within 90 days. Aperture understands that software is a business tool, not just a technical achievement. That perspective shows in everything they build.' },
  { id: 16, name: 'Nithya Krishnan', company: 'GreenGrid Energy', position: 'Software Lead', rating: 5, text: 'We needed a team that could work with IoT sensor data at scale and surface it through a clean operator dashboard. Aperture delivered exactly that — on time, on budget, and with documentation that our internal team can actually maintain.' },
  { id: 17, name: 'Prashanth Kumar', company: 'AgroTech Solutions', position: 'CTO', rating: 5, text: 'They took our rough prototype and turned it into a production system used by over 3,000 farmers. The offline-first architecture they chose was exactly right for rural connectivity conditions.' },
  { id: 18, name: 'Pooja Narayan', company: 'LexMind Legal', position: 'Founder', rating: 5, text: 'Aperture built us a document intelligence platform that halved the time our lawyers spend on contract review. The attention to detail in the UI — designed for high-cognitive-load workflows — was remarkable.' },
  { id: 19, name: 'Ramesh Anand', company: 'SkyPort Aviation', position: 'Director of IT', rating: 5, text: 'We operate in a regulated industry with zero tolerance for downtime. Aperture delivered a system with 99.97% uptime in the first year of operation and a CI/CD pipeline that makes deployments genuinely stress-free.' },
  { id: 20, name: 'Gayatri Iyer', company: 'Kaleidoscope Media', position: 'VP Engineering', rating: 5, text: 'Their frontend craftsmanship is exceptional. The platform they built for us performs beautifully on entry-level Android devices, which is where most of our audience actually is. They cared about real users, not just benchmark scores.' },
  { id: 21, name: 'Manohar Das', company: 'PrecisionMfg', position: 'Plant Manager', rating: 5, text: 'The production monitoring dashboard reduced our defect detection time from hours to minutes. Aperture's team asked the right questions on the factory floor before designing anything — that fieldwork shows in the final product.' },
  { id: 22, name: 'Sowmya Rajan', company: 'BankFirst Cooperative', position: 'Head of Digital', rating: 5, text: 'Migrating a 20-year-old banking system is not a project most firms will touch. Aperture took it on with confidence and a realistic migration plan. We went live with zero customer-facing incidents.' },
  { id: 23, name: 'Harish Menon', company: 'CodePath Academy', position: 'Co-Founder', rating: 5, text: 'They built our LMS from scratch and shipped the MVP in eight weeks. The code quality was high enough that our first in-house hire could immediately contribute — that is how you know the foundation is solid.' },
  { id: 24, name: 'Sunita Varma', company: 'NovaBuild Infra', position: 'Project Director', rating: 5, text: 'The project tracking portal they delivered is now used by over 200 site engineers daily. The offline sync feature they suggested — which was not even in our original brief — turned out to be the most-used feature on the platform.' },
  { id: 25, name: 'Ashwin Pillai', company: 'DeltaRisk Analytics', position: 'Lead Data Scientist', rating: 5, text: 'Aperture's ability to translate our data science outputs into a robust, client-facing SaaS product was exactly what we needed. They bridged the gap between research and production in a way no other team had managed for us.' },
  { id: 26, name: 'Kavitha Srinivasan', company: 'OmniCare Hospitals', position: 'Head of Digital Health', rating: 5, text: 'The patient engagement platform they built has improved appointment adherence by 38% at our Chennai facilities. The WhatsApp integration they suggested was a simple idea with an outsized impact on our patients' experience.' },
  { id: 27, name: 'Arun Natarajan', company: 'SolarEdge India', position: 'Technical Director', rating: 5, text: 'We gave Aperture a very complex brief involving real-time energy grid data and multi-tenant reporting. They delivered a system that our enterprise clients describe as the clearest visibility they have ever had into their solar assets.' },
  { id: 28, name: 'Revathi Mohan', company: 'ClearTax SME', position: 'Product Lead', rating: 5, text: 'Their GST filing module is used by over 1,200 small businesses. Aperture kept the UI simple enough for a first-time filer but robust enough to handle edge cases that would stump most accounting software.' },
  { id: 29, name: 'Balamurugan K', company: 'TideWater Ports', position: 'IT Head', rating: 5, text: 'Port operations run 24/7 and cannot tolerate fragile software. Aperture built us a berth management system with the kind of reliability we usually associate with much larger vendors — and delivered it in a fraction of the time.' },
  { id: 30, name: 'Indira Chakraborty', company: 'FuturePath EdTech', position: 'CEO', rating: 5, text: 'From discovery to deployment, the process was transparent and collaborative. Aperture shared progress weekly, escalated risks early, and delivered every committed milestone. That level of professionalism is rare at any price point.' },
  { id: 31, name: 'Saravanan T', company: 'PharmaLink India', position: 'Head of Supply Chain', rating: 5, text: 'Cold chain compliance is a regulatory minefield. Aperture built us a temperature monitoring and audit system that our compliance officer calls the best-documented software asset in the company.' },
  { id: 32, name: 'Nalini Gopal', company: 'TrustBridge Insurance', position: 'CTO', rating: 5, text: 'The claims processing automation they built reduced our average settlement time from 14 days to 3. That is not a feature — it is a fundamental transformation in how we operate, and Aperture made it feel straightforward.' },
  { id: 33, name: 'Dinesh Pillai', company: 'AquaNet Fisheries', position: 'Operations Director', rating: 5, text: 'Aperture built a route optimisation and catch-tracking platform for our fishing cooperative. Watching them apply modern software engineering to a centuries-old industry was genuinely impressive. The fishermen love it.' },
  { id: 34, name: 'Shanthi Raman', company: 'Heritage Weaves', position: 'Founder', rating: 5, text: 'As a traditional textile business going digital for the first time, we needed a team that would be patient teachers as much as expert builders. Aperture were both. The e-commerce platform they built has opened markets we could not have reached otherwise.' },
  { id: 35, name: 'Vijay Krishnamurthy', company: 'Axiom Robotics', position: 'Head of Software', rating: 5, text: 'Real-time control software for robotics is a demanding problem domain. Aperture approached it with the rigor it deserves — formal requirements, edge-case testing, and a latency profile that has held up flawlessly in our production line environment.' },
];

const ITEMS_PER_PAGE = 3;

export function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

  const next = () => setCurrentPage((p) => (p + 1) % totalPages);
  const prev = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

  const visible = testimonials.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section id="testimonials" className="relative border-t border-line bg-paper py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">(06b) — Client Voices</span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="What our clients say."
              className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
            />
            <Reveal delay={0.2} className="mt-6">
              <p className="text-lg text-ash">
                {testimonials.length} verified accounts from teams across healthcare, fintech,
                logistics, education, and enterprise software.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-px bg-line md:grid-cols-3"
          >
            {visible.map((t, i) => (
              <div key={t.id} className="relative flex flex-col gap-6 bg-paper p-8 md:p-10">
                <Quote className="absolute right-8 top-8 h-10 w-10 text-line" />
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-ink text-ink" />
                  ))}
                </div>
                <p className="flex-1 text-lg leading-relaxed text-ink">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-line pt-6">
                  <p className="font-display text-xl font-medium text-ink">{t.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-smoke">
                    {t.position} — {t.company}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-between border-t border-line pt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-smoke">
            {currentPage * ITEMS_PER_PAGE + 1}–{Math.min((currentPage + 1) * ITEMS_PER_PAGE, testimonials.length)} of {testimonials.length}
          </span>
          <div className="flex items-center gap-4">
            {/* Dot indicators — show page groups */}
            <div className="hidden items-center gap-1.5 sm:flex">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentPage ? 'w-6 bg-ink' : 'w-1.5 bg-line hover:bg-smoke'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
