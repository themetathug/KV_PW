import { Award, Briefcase, Medal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { qualificationList, siteIdentity } from '../data/siteData'
import { FadeInSection } from './FadeInSection'

interface HeroSectionProps {
  headlineName?: string
  headlineTitle?: string
}

export const HeroSection = ({
  headlineName = siteIdentity.name,
  headlineTitle = siteIdentity.title,
}: HeroSectionProps) => (
  <FadeInSection className="relative overflow-hidden rounded-3xl bg-hero-mesh px-6 pb-10 pt-12 text-white shadow-soft sm:px-10 lg:px-14 lg:pb-12 lg:pt-16">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(255,255,255,0.16),transparent_45%)]" />
    <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <span className="inline-flex rounded-full border border-gold-300/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
          Premium Companionship
        </span>
        <h1 className="mt-5 font-serifDisplay text-4xl leading-tight text-white sm:text-5xl">
          {headlineName}
          <span className="block pt-1 text-gold-200">{headlineTitle}</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-100 sm:text-lg">
          {siteIdentity.heroSummary}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/booking"
            className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-charcoal transition duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-lift"
          >
            Book Time Together
          </Link>
          <a
            href={`tel:${siteIdentity.phoneLink}`}
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:border-gold-200 hover:text-gold-200"
          >
            Call {siteIdentity.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-sm">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-white/30 shadow-lift">
          <img
            src={siteIdentity.media.heroPortrait}
            alt={`Portrait of ${siteIdentity.name}`}
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/25 bg-charcoal/55 px-4 py-3 backdrop-blur-sm">
            <p className="font-serifDisplay text-lg text-white">{siteIdentity.displayName}</p>
            <p className="text-xs uppercase tracking-[0.13em] text-gold-200">{siteIdentity.practiceName}</p>
          </div>
        </div>
      </div>
    </div>
  </FadeInSection>
)

export const AboutSection = () => (
  <FadeInSection className="mt-14 grid gap-8 rounded-3xl border border-blush-100 bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-[1fr_0.9fr]">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">About</p>
      <h2 className="mt-3 font-serifDisplay text-3xl text-charcoal sm:text-4xl">
        Confident Company, Genuine Connection
      </h2>
      <p className="mt-5 text-base leading-relaxed text-slate-700">
        {siteIdentity.aboutSummary} With {siteIdentity.yearsExperience}+ years of social hosting
        experience, guests receive thoughtful planning and clear communication from day one.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="rounded-2xl border border-gold-200 bg-gold-50 px-5 py-3">
          <p className="text-2xl font-semibold text-charcoal">{siteIdentity.yearsExperience}+</p>
          <p className="text-sm text-slate-700">Years of hosting social sessions</p>
        </div>
        <div className="rounded-2xl border border-blush-200 bg-blush-50 px-5 py-3">
          <p className="text-2xl font-semibold text-charcoal">850+</p>
          <p className="text-sm text-slate-700">Memorable bookings completed</p>
        </div>
      </div>
    </div>
    <div className="overflow-hidden rounded-2xl border border-blush-100 bg-blush-50">
      <div className="relative aspect-[16/10]">
        <img
          src={siteIdentity.media.aboutPortrait}
          alt={`${siteIdentity.displayName} professional profile`}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-serifDisplay text-2xl text-charcoal">Why People Book Katie V</h3>
        <ul className="mt-4 space-y-3">
          {qualificationList.map((qualification) => (
            <li key={qualification} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold-500" />
              <span>{qualification}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </FadeInSection>
)

const credentials = [
  {
    title: 'Charming Presence',
    description: 'Warm, polished energy that fits both elegant and casual settings.',
    icon: Briefcase,
  },
  {
    title: 'Great Conversation',
    description: 'Natural communication that keeps the experience relaxed and engaging.',
    icon: Award,
  },
  {
    title: 'Discreet & Reliable',
    description: 'Private bookings handled with punctuality and respect.',
    icon: Medal,
  },
]

export const CredentialsSection = () => (
  <FadeInSection className="mt-14" delayMs={120}>
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">Highlights</p>
    <h2 className="mt-3 font-serifDisplay text-3xl text-charcoal sm:text-4xl">
      Designed for Great Social Experiences
    </h2>
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {credentials.map(({ title, description, icon: Icon }, index) => (
        <article
          key={title}
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="inline-flex rounded-full border border-gold-200 bg-gold-50 p-3 text-gold-700 transition group-hover:border-gold-400 group-hover:bg-gold-100">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-serifDisplay text-xl text-charcoal">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{description}</p>
        </article>
      ))}
    </div>
  </FadeInSection>
)
