import { Loader2, Phone, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Service } from '../types'
import {
  formatDateLabel,
  formatPhoneInput,
  formatTimeLabel,
  normalizePhoneNumber,
  validateEmail,
  validatePhone,
} from '../utils/booking'

interface BookingFormPayload {
  name: string
  email: string
  phone: string
  normalizedPhone: string
  serviceId: string
  preferredDate: string
  preferredTime: string
  message: string
  acceptedTerms: boolean
  slotId: string
}

interface BookingFormProps {
  services: Service[]
  selectedDate: string
  selectedTime: string
  selectedSlotId: string
  initialServiceId?: string
  onSubmitBooking: (payload: BookingFormPayload) => Promise<void> | void
}

type ErrorState = Partial<Record<keyof BookingFormPayload | 'slotSelection', string>>

const inputClassName =
  'w-full rounded-xl border border-blush-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blush-400 focus:ring-2 focus:ring-blush-200'

export const BookingForm = ({
  services,
  selectedDate,
  selectedTime,
  selectedSlotId,
  initialServiceId,
  onSubmitBooking,
}: BookingFormProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceId, setServiceId] = useState(initialServiceId ?? services[0]?.id ?? '')
  const [message, setMessage] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<ErrorState>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!initialServiceId) {
      return
    }
    setServiceId(initialServiceId)
  }, [initialServiceId])

  const selectedDateLabel = useMemo(
    () => (selectedDate ? formatDateLabel(selectedDate) : ''),
    [selectedDate],
  )

  const selectedTimeLabel = useMemo(
    () => (selectedTime ? formatTimeLabel(selectedTime) : ''),
    [selectedTime],
  )

  const validate = (): boolean => {
    const nextErrors: ErrorState = {}
    if (!name.trim()) {
      nextErrors.name = 'Please enter your full name.'
    }
    if (!email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!validateEmail(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    } else if (!validatePhone(phone)) {
      nextErrors.phone = 'Enter a valid phone number (e.g., 123-456-7890).'
    }
    if (!serviceId) {
      nextErrors.serviceId = 'Please select a service type.'
    }
    if (!selectedDate || !selectedTime || !selectedSlotId) {
      nextErrors.slotSelection = 'Please choose an available date and time from the calendar.'
    }
    if (message.trim().length < 15) {
      nextErrors.message = 'Please include at least 15 characters about your preferred experience.'
    }
    if (!acceptedTerms) {
      nextErrors.acceptedTerms = 'You must accept the terms to continue.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) {
      return
    }

    const normalizedPhone = normalizePhoneNumber(phone)
    const payload: BookingFormPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      normalizedPhone,
      serviceId,
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      message: message.trim(),
      acceptedTerms,
      slotId: selectedSlotId,
    }

    try {
      setIsSubmitting(true)
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 700)
      })
      await onSubmitBooking(payload)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setAcceptedTerms(false)
      setErrors({})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-3xl border border-blush-100 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
            Booking Form
          </p>
          <h2 className="mt-2 font-serifDisplay text-2xl text-charcoal sm:text-3xl">
            Reserve Your Time
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-blush-200 bg-blush-50 px-3 py-1 text-xs font-semibold text-blush-700">
          <ShieldCheck className="h-4 w-4" /> Private Booking
        </span>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Jane Doe"
              className={inputClassName}
              autoComplete="name"
            />
            {errors.name ? <p className="mt-1 text-xs text-rose-600">{errors.name}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className={inputClassName}
              autoComplete="email"
            />
            {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email}</p> : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
              Phone Number * (Critical)
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(formatPhoneInput(event.target.value))}
                placeholder="123-456-7890"
                className={`${inputClassName} pl-9`}
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
            {errors.phone ? <p className="mt-1 text-xs text-rose-600">{errors.phone}</p> : null}
          </div>

          <div>
            <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-slate-700">
              Service Type *
            </label>
            <select
              id="service"
              value={serviceId}
              onChange={(event) => setServiceId(event.target.value)}
              className={inputClassName}
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
            {errors.serviceId ? <p className="mt-1 text-xs text-rose-600">{errors.serviceId}</p> : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-slate-700">
              Preferred Date *
            </label>
            <input
              id="date"
              readOnly
              value={selectedDateLabel || 'Select a date from calendar'}
              className={`${inputClassName} bg-slate-50`}
            />
          </div>
          <div>
            <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-slate-700">
              Preferred Time *
            </label>
            <input
              id="time"
              readOnly
              value={selectedTimeLabel || 'Select a time slot'}
              className={`${inputClassName} bg-slate-50`}
            />
          </div>
        </div>
        {errors.slotSelection ? <p className="-mt-1 text-xs text-rose-600">{errors.slotSelection}</p> : null}

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
            Preferences / Message *
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Share your preferred experience, timing, and any important notes..."
            rows={5}
            className={`${inputClassName} resize-y`}
          />
          {errors.message ? <p className="mt-1 text-xs text-rose-600">{errors.message}</p> : null}
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-blush-100 bg-blush-50 p-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-blush-600"
          />
          <span>
            I agree to the terms and privacy policy, and understand this booking is for legal,
            respectful companionship only.
          </span>
        </label>
        {errors.acceptedTerms ? <p className="-mt-2 text-xs text-rose-600">{errors.acceptedTerms}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}
        </button>
      </form>
    </section>
  )
}

export type { BookingFormPayload }
