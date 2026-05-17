import { ArrowRight, Mail, MapPin, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceList, siteIdentity } from '../data/siteData'
import type { BookingRecord } from '../types'
import { formatDateLabel, formatTimeLabel } from '../utils/booking'

interface QuickContactCardProps {
  compact?: boolean
}

export const QuickContactCard = ({ compact = false }: QuickContactCardProps) => (
  <aside
    className={`rounded-3xl border border-blush-200 bg-gradient-to-br from-blush-50 to-white p-5 shadow-soft ${
      compact ? '' : 'sticky top-28'
    }`}
  >
    <div className="mb-4 flex items-center gap-3 rounded-2xl border border-blush-200/70 bg-white/85 p-3">
      <img
        src={siteIdentity.media.quickContactPortrait}
        alt={`${siteIdentity.displayName} profile`}
        className="h-14 w-14 rounded-xl object-cover"
        loading="lazy"
        decoding="async"
      />
      <div>
        <p className="font-serifDisplay text-lg text-charcoal">{siteIdentity.displayName}</p>
        <p className="text-xs uppercase tracking-[0.12em] text-blush-700">{siteIdentity.practiceName}</p>
      </div>
    </div>
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">Quick Contact</p>
    <h3 className="mt-2 font-serifDisplay text-2xl text-charcoal">Ready to Book? Call Now</h3>
    <a
      href={`tel:${siteIdentity.phoneLink}`}
      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-charcoal transition hover:bg-gold-400"
    >
      <PhoneCall className="h-4 w-4" />
      {siteIdentity.phoneDisplay}
    </a>
    <a
      href={`mailto:${siteIdentity.email}`}
      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-charcoal/15 px-4 py-3 text-sm font-semibold text-charcoal transition hover:border-charcoal/40"
    >
      <Mail className="h-4 w-4" />
      Email Support
    </a>
    <p className="mt-4 text-sm text-slate-700">
      Availability: {siteIdentity.hours}
      <span className="mt-2 block text-xs text-slate-600">{siteIdentity.officeAddress}</span>
    </p>
  </aside>
)

interface BookingConfirmationProps {
  booking: BookingRecord
  onClose: () => void
}

export const BookingConfirmation = ({ booking, onClose }: BookingConfirmationProps) => {
  const service = serviceList.find((entry) => entry.id === booking.serviceId)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/60 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Booking confirmation"
    >
      <article className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-lift sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
          Booking Confirmed
        </p>
        <h2 className="mt-2 font-serifDisplay text-3xl text-charcoal">Booking Request Received</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Thank you, {booking.name}. We&apos;ll call you at <strong>{booking.phone}</strong> to confirm your
          date, time, and session details.
        </p>

        <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-2">
          <p>
            <strong>Date:</strong> {formatDateLabel(booking.preferredDate)}
          </p>
          <p>
            <strong>Time:</strong> {formatTimeLabel(booking.preferredTime)}
          </p>
          <p>
            <strong>Service:</strong> {service?.title ?? booking.serviceId}
          </p>
          <p>
            <strong>Phone:</strong> {booking.phone}
          </p>
          <p className="sm:col-span-2">
            <strong>Email confirmation:</strong> {booking.email}
          </p>
        </div>

        <div className="mt-4 rounded-xl border border-blush-200 bg-blush-50 px-4 py-3 text-sm text-charcoal">
          Reminder: bookings are for legal, respectful companionship and social activities only.
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-charcoal"
          >
            Return to Booking
          </button>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:border-gold-300 hover:text-gold-800"
          >
            Go to Homepage <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </article>
    </div>
  )
}

export const ContactDetailsPanel = () => (
  <div className="rounded-3xl border border-blush-100 bg-white p-6 shadow-soft">
    <h2 className="font-serifDisplay text-3xl text-charcoal">Contact Information</h2>
    <p className="mt-3 text-sm text-slate-700">
      Reach out by phone or email to confirm availability, preferred plans, and booking details.
    </p>
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
      <img
        src={siteIdentity.media.officeLocation}
        alt={`${siteIdentity.practiceName} location preview`}
        className="h-40 w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div className="mt-6 space-y-4 text-sm text-slate-700">
      <a href={`tel:${siteIdentity.phoneLink}`} className="group flex items-start gap-3">
        <PhoneCall className="mt-0.5 h-4 w-4 text-gold-700 group-hover:text-gold-500" />
        <span>
          <span className="block text-xs uppercase tracking-[0.12em] text-slate-500">Phone</span>
          <span className="text-base font-semibold text-charcoal">{siteIdentity.phoneDisplay}</span>
        </span>
      </a>
      <a href={`mailto:${siteIdentity.email}`} className="group flex items-start gap-3">
        <Mail className="mt-0.5 h-4 w-4 text-gold-700 group-hover:text-gold-500" />
        <span>
          <span className="block text-xs uppercase tracking-[0.12em] text-slate-500">Email</span>
          <span>{siteIdentity.email}</span>
        </span>
      </a>
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-4 w-4 text-gold-700" />
        <span>
          <span className="block text-xs uppercase tracking-[0.12em] text-slate-500">Address</span>
          <span>{siteIdentity.officeAddress}</span>
        </span>
      </div>
    </div>
  </div>
)
