import { Link } from 'react-router-dom'
import { faqEntries, siteIdentity } from '../data/siteData'
import { FadeInSection } from '../components/FadeInSection'
import { AboutSection, CredentialsSection, HeroSection } from '../components/HomeSections'
import { PageMeta } from '../components/PageMeta'

export const HomePage = () => (
  <>
    <PageMeta
      title={`${siteIdentity.name} | Premium Companionship`}
      description="Book elegant, legal companionship experiences with flexible scheduling and private booking."
    />

    <HeroSection />
    <AboutSection />
    <CredentialsSection />

    <FadeInSection className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="rounded-3xl border border-blush-100 bg-white p-6 shadow-soft sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">Book</p>
        <h2 className="mt-3 font-serifDisplay text-3xl text-charcoal">Ready to Spend Quality Time?</h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          Reserve your preferred date, pick an experience, and confirm your booking in minutes. The
          process is private, clear, and mobile-friendly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/booking"
            className="rounded-full bg-plum px-6 py-3 text-sm font-semibold uppercase tracking-[0.09em] text-white transition hover:bg-charcoal"
          >
            Book Now
          </Link>
          <Link
            to="/services"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.09em] text-charcoal transition hover:border-gold-300 hover:text-gold-800"
          >
            Explore Services
          </Link>
        </div>
      </article>

      <article className="rounded-3xl border border-blush-100 bg-white p-6 shadow-soft sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">FAQ</p>
        <h2 className="mt-3 font-serifDisplay text-3xl text-charcoal">Frequently Asked Questions</h2>
        <div className="mt-5 space-y-4">
          {faqEntries.map((entry) => (
            <div key={entry.question} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-medium text-charcoal">{entry.question}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{entry.answer}</p>
            </div>
          ))}
        </div>
      </article>
    </FadeInSection>
  </>
)
