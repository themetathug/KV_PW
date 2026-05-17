import { ChevronLeft, ChevronRight, Clock3, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { advanceNoticeHours } from '../data/siteData'
import type { TimeSlot } from '../types'
import { formatDateLabel, formatTimeLabel, isInsideNoticeWindow, isPastDate } from '../utils/booking'

type CalendarView = 'month' | 'week'

interface BookingCalendarProps {
  availabilityByDate: Record<string, TimeSlot[]>
  bookedSlotIds: Set<string>
  selectedDate: string
  selectedSlotId: string
  noticeHours?: number
  loading?: boolean
  onDateSelect: (dateIso: string) => void
  onSlotSelect: (slot: TimeSlot, dateIso: string) => void
}

const toDateIso = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const startOfWeek = (source: Date): Date => {
  const date = new Date(source)
  const day = date.getDay()
  const diff = -day
  date.setDate(date.getDate() + diff)
  date.setHours(0, 0, 0, 0)
  return date
}

const monthMatrix = (source: Date): Date[] => {
  const first = new Date(source.getFullYear(), source.getMonth(), 1)
  const start = new Date(first)
  start.setDate(first.getDate() - first.getDay())
  return Array.from({ length: 42 }).map((_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date
  })
}

const weekMatrix = (source: Date): Date[] => {
  const start = startOfWeek(source)
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date
  })
}

const slotIsAvailable = (
  dateIso: string,
  slot: TimeSlot,
  bookedSlotIds: Set<string>,
  noticeHours: number,
): boolean => !slot.blocked && !bookedSlotIds.has(slot.id) && !isInsideNoticeWindow(dateIso, slot.time, noticeHours)

export const BookingCalendar = ({
  availabilityByDate,
  bookedSlotIds,
  selectedDate,
  selectedSlotId,
  noticeHours = advanceNoticeHours,
  loading = false,
  onDateSelect,
  onSlotSelect,
}: BookingCalendarProps) => {
  const [viewMode, setViewMode] = useState<CalendarView>('month')
  const [viewDate, setViewDate] = useState<Date>(selectedDate ? new Date(`${selectedDate}T00:00:00`) : new Date())

  const days = useMemo(
    () => (viewMode === 'month' ? monthMatrix(viewDate) : weekMatrix(viewDate)),
    [viewDate, viewMode],
  )

  const label = useMemo(() => {
    if (viewMode === 'month') {
      return viewDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    }
    const [start] = days
    const endDate = days[days.length - 1]
    if (!start || !endDate) {
      return ''
    }
    return `${start.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    })} - ${endDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })}`
  }, [days, viewDate, viewMode])

  const selectedSlots = selectedDate ? availabilityByDate[selectedDate] ?? [] : []

  const canMoveBackward = useMemo(() => {
    if (viewMode === 'month') {
      const now = new Date()
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const targetMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
      return targetMonth > thisMonth
    }
    const nowWeekStart = startOfWeek(new Date())
    return startOfWeek(viewDate) > nowWeekStart
  }, [viewDate, viewMode])

  const shiftPeriod = (direction: 1 | -1) => {
    setViewDate((current) => {
      const next = new Date(current)
      if (viewMode === 'month') {
        next.setMonth(current.getMonth() + direction)
      } else {
        next.setDate(current.getDate() + direction * 7)
      }
      return next
    })
  }

  return (
    <section className="rounded-3xl border border-blush-100 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
            Available Schedule
          </p>
          <h2 className="mt-2 font-serifDisplay text-2xl text-charcoal sm:text-3xl">
            Choose Date & Time
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Open booking dates are highlighted in gold and pink. Reservations require at least{' '}
            {noticeHours} hours notice.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-blush-200 bg-blush-50 p-1">
          <button
            type="button"
            onClick={() => setViewMode('month')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              viewMode === 'month' ? 'bg-plum text-white shadow-soft' : 'text-slate-600 hover:text-charcoal'
            }`}
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => setViewMode('week')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              viewMode === 'week' ? 'bg-plum text-white shadow-soft' : 'text-slate-600 hover:text-charcoal'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-blush-100 bg-blush-50 p-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => shiftPeriod(-1)}
            disabled={!canMoveBackward}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition enabled:hover:border-gold-300 enabled:hover:text-gold-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous period"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="font-semibold text-charcoal">{label}</p>
          <button
            type="button"
            onClick={() => shiftPeriod(1)}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-gold-300 hover:text-gold-700"
            aria-label="Next period"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <span key={day} className="py-2">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((date) => {
            const dateIso = toDateIso(date)
            const slots = availabilityByDate[dateIso] ?? []
            const hasAvailableSlot = slots.some((slot) =>
              slotIsAvailable(dateIso, slot, bookedSlotIds, noticeHours),
            )
            const isCurrentMonth = date.getMonth() === viewDate.getMonth()
            const isSelected = selectedDate === dateIso
            const isPast = isPastDate(dateIso)

            return (
              <button
                type="button"
                key={dateIso}
                disabled={isPast}
                onClick={() => onDateSelect(dateIso)}
                className={`relative min-h-[50px] rounded-xl border text-sm font-medium transition sm:min-h-[58px] ${
                  isSelected
                    ? 'border-gold-500 bg-gold-100 text-charcoal shadow-soft'
                    : hasAvailableSlot
                      ? 'border-blush-200 bg-white text-charcoal hover:border-gold-400 hover:shadow-soft'
                      : 'border-blush-100 bg-white text-slate-400'
                } ${!isCurrentMonth ? 'opacity-45' : ''} ${isPast ? 'cursor-not-allowed opacity-35' : ''}`}
              >
                <span>{date.getDate()}</span>
                {hasAvailableSlot ? (
                  <span className="absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blush-600" />
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-blush-100 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold text-charcoal">
            {selectedDate ? formatDateLabel(selectedDate) : 'Select a date to view times'}
          </h3>
          {loading ? (
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading slots...
            </span>
          ) : null}
        </div>

        {!selectedDate ? (
          <p className="mt-3 text-sm text-slate-600">Select any day to see available booking times.</p>
        ) : (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {selectedSlots.length === 0 ? (
              <p className="text-sm text-slate-600">No slots are configured for this date.</p>
            ) : null}
            {selectedSlots.map((slot) => {
              const unavailableReason = slot.blocked
                ? 'Blocked'
                : bookedSlotIds.has(slot.id)
                  ? 'Booked'
                  : isInsideNoticeWindow(selectedDate, slot.time, noticeHours)
                    ? 'Notice required'
                    : null
              const available = unavailableReason === null
              const isSelected = selectedSlotId === slot.id
              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!available}
                  onClick={() => onSlotSelect(slot, selectedDate)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    isSelected
                      ? 'border-gold-500 bg-gold-100'
                      : available
                        ? 'border-slate-200 bg-white hover:border-gold-300 hover:shadow-soft'
                        : 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                  }`}
                >
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    <Clock3 className="h-4 w-4 text-gold-700" />
                    {formatTimeLabel(slot.time)}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {available ? `${slot.durationMinutes} min` : unavailableReason}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
