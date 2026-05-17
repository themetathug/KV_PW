import { Coffee, Heart, Plane, Sparkles, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Service } from '../types'
import { formatTimeLabel } from '../utils/booking'
import { FadeInSection } from './FadeInSection'

interface ServicesSectionProps {
  services: Service[]
}

const getServiceIcon = (icon: Service['icon']) => {
  switch (icon) {
    case 'heart':
      return Heart
    case 'sparkles':
      return Sparkles
    case 'users':
      return Users
    case 'coffee':
      return Coffee
    case 'plane':
      return Plane
    default:
      return Heart
  }
}

const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  if (!remainder) {
    return `${hours} hr`
  }
  return `${hours} hr ${remainder} min`
}

const serviceStartExamples = ['09:00', '10:30', '13:00', '14:30', '16:00']

export const ServicesSection = ({ services }: ServicesSectionProps) => {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(services[0]?.id ?? null)

  const groupedServices = useMemo(
    () =>
      services.map((service, index) => ({
        ...service,
        exampleTime: serviceStartExamples[index % serviceStartExamples.length],
      })),
    [services],
  )

  return (
    <FadeInSection className="rounded-3xl border border-blush-100 bg-white p-6 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
            Services
          </p>
          <h1 className="mt-3 font-serifDisplay text-3xl text-charcoal sm:text-4xl">
            Premium Companionship Services
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Choose the experience that best fits your vibe, timing, and social plans.
          </p>
        </div>
        <Link
          to="/booking"
          className="inline-flex rounded-full border border-blush-300 bg-blush-50 px-5 py-2.5 text-sm font-semibold text-blush-700 transition hover:bg-blush-100"
        >
          Book General Session
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groupedServices.map((service, index) => {
          const Icon = getServiceIcon(service.icon)
          const isExpanded = expandedServiceId === service.id
          return (
            <article
              key={service.id}
              className={`service-card group animate-fade-up rounded-2xl border p-5 shadow-soft transition duration-300 ${
                isExpanded
                  ? 'border-blush-300 bg-blush-50/40'
                  : 'border-blush-100 bg-white hover:-translate-y-1 hover:border-blush-300 hover:shadow-lift'
              }`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <button
                type="button"
                onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                className="w-full text-left"
                aria-expanded={isExpanded}
              >
                <div className="mb-4 overflow-hidden rounded-xl border border-blush-100 bg-blush-50">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="h-36 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex rounded-full border border-gold-200 bg-gold-50 p-3 text-gold-700 transition group-hover:border-blush-300 group-hover:bg-blush-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-blush-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-blush-700">
                    {service.category}
                  </span>
                </div>
                <h2 className="mt-4 font-serifDisplay text-2xl leading-tight text-charcoal">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{service.shortDescription}</p>
              </button>

              <div
                className={`overflow-hidden transition-all duration-400 ${
                  isExpanded ? 'max-h-[380px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="mt-4 border-t border-blush-100 pt-4 text-sm leading-relaxed text-slate-700">
                  {service.fullDescription}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-gold-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl border border-blush-100 bg-white p-3 text-sm text-slate-700">
                  <p className="font-medium text-charcoal">{service.rateInfo}</p>
                  <p className="mt-1">
                    Typical duration: {formatDuration(service.durationMinutes)} | Earliest sample
                    slot: {formatTimeLabel(service.exampleTime)}
                  </p>
                </div>
              </div>

              <Link
                to={`/booking?service=${service.id}`}
                className="mt-5 inline-flex rounded-full bg-plum px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-charcoal"
              >
                Book This Experience
              </Link>
            </article>
          )
        })}
      </div>
    </FadeInSection>
  )
}
