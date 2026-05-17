import { CalendarClock, PhoneCall } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BookingCalendar } from '../components/BookingCalendar'
import { BookingForm } from '../components/BookingForm'
import type { BookingFormPayload } from '../components/BookingForm'
import { BookingConfirmation, QuickContactCard } from '../components/ContactWidgets'
import { FadeInSection } from '../components/FadeInSection'
import { PageMeta } from '../components/PageMeta'
import { advanceNoticeHours, buildMockAvailability, serviceList, siteIdentity } from '../data/siteData'
import type { BookingRecord, TimeSlot } from '../types'
import { getStoredBookings, groupAvailabilityByDate, saveBooking } from '../utils/booking'

const availabilityByDate = groupAvailabilityByDate(buildMockAvailability())

export const BookingPage = () => {
  const [searchParams] = useSearchParams()
  const serviceFromQuery = searchParams.get('service') ?? ''
  const validServiceFromQuery = serviceList.some((service) => service.id === serviceFromQuery)
    ? serviceFromQuery
    : ''

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlotId, setSelectedSlotId] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [storedBookings, setStoredBookings] = useState<BookingRecord[]>([])
  const [latestBooking, setLatestBooking] = useState<BookingRecord | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)

  useEffect(() => {
    setStoredBookings(getStoredBookings())
  }, [])

  useEffect(() => {
    if (!selectedDate) {
      return
    }
    setSlotsLoading(true)
    const timer = window.setTimeout(() => setSlotsLoading(false), 240)
    return () => window.clearTimeout(timer)
  }, [selectedDate])

  const bookedSlotIds = useMemo(() => new Set(storedBookings.map((booking) => booking.slotId)), [storedBookings])

  const handleDateSelect = (dateIso: string) => {
    setSelectedDate(dateIso)
    setSelectedSlotId('')
    setSelectedTime('')
  }

  const handleSlotSelect = (slot: TimeSlot, dateIso: string) => {
    setSelectedDate(dateIso)
    setSelectedSlotId(slot.id)
    setSelectedTime(slot.time)
  }

  const handleBookingSubmit = async (payload: BookingFormPayload) => {
    if (bookedSlotIds.has(payload.slotId)) {
      return
    }

    const record: BookingRecord = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      normalizedPhone: payload.normalizedPhone,
      serviceId: payload.serviceId,
      preferredDate: payload.preferredDate,
      preferredTime: payload.preferredTime,
      message: payload.message,
      acceptedTerms: payload.acceptedTerms,
      slotId: payload.slotId,
    }

    const updatedBookings = saveBooking(record)
    setStoredBookings(updatedBookings)
    setLatestBooking(record)
  }

  return (
    <>
      <PageMeta
        title={`Book Time | ${siteIdentity.name}`}
        description="Choose an available date and reserve your preferred companionship experience."
      />

      <FadeInSection className="rounded-3xl border border-blush-100 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
              Calendar & Booking
            </p>
            <h1 className="mt-2 font-serifDisplay text-3xl text-charcoal sm:text-4xl">
              Book Private Companionship Time
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Select your date, choose an open time slot, and complete the booking form. Reservations
              require at least {advanceNoticeHours} hours notice.
            </p>
          </div>
          <a
            href={`tel:${siteIdentity.phoneLink}`}
            className="inline-flex animate-subtle-pulse items-center gap-2 rounded-full border border-gold-400/60 bg-gold-50 px-5 py-2.5 text-sm font-semibold text-gold-900 transition hover:bg-gold-100"
          >
            <PhoneCall className="h-4 w-4" />
            Need help? Call {siteIdentity.phoneDisplay}
          </a>
        </div>
      </FadeInSection>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_330px]">
        <section className="space-y-6">
          <BookingCalendar
            availabilityByDate={availabilityByDate}
            bookedSlotIds={bookedSlotIds}
            selectedDate={selectedDate}
            selectedSlotId={selectedSlotId}
            noticeHours={advanceNoticeHours}
            loading={slotsLoading}
            onDateSelect={handleDateSelect}
            onSlotSelect={handleSlotSelect}
          />
          <BookingForm
            services={serviceList}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedSlotId={selectedSlotId}
            initialServiceId={validServiceFromQuery}
            onSubmitBooking={handleBookingSubmit}
          />
        </section>
        <section className="space-y-6">
          <QuickContactCard />
          <article className="rounded-3xl border border-blush-200 bg-blush-50 p-5 text-sm text-charcoal shadow-soft">
            <h3 className="inline-flex items-center gap-2 font-semibold">
              <CalendarClock className="h-4 w-4" />
              Booking Notes
            </h3>
            <ul className="mt-3 space-y-2 leading-relaxed">
              <li>- Selected date/time auto-fills into the form below.</li>
              <li>- Booked and blocked slots cannot be selected again.</li>
              <li>- Bookings are legal, respectful, and companionship-only.</li>
              <li>- You will receive confirmation details by email and phone.</li>
            </ul>
          </article>
        </section>
      </div>

      {latestBooking ? (
        <BookingConfirmation booking={latestBooking} onClose={() => setLatestBooking(null)} />
      ) : null}
    </>
  )
}
