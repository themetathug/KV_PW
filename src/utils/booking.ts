import type { BookingRecord, DayAvailability, TimeSlot } from '../types'

export const bookingStorageKey = 'katie-companionship-bookings-v1'

export const formatDateLabel = (dateIso: string): string => {
  const date = new Date(`${dateIso}T00:00:00`)
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatTimeLabel = (time24: string): string => {
  const [hourString, minuteString] = time24.split(':')
  const hour = Number(hourString)
  const minute = Number(minuteString)
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export const toDateTime = (dateIso: string, time24: string): Date => {
  const [year, month, day] = dateIso.split('-').map(Number)
  const [hour, minute] = time24.split(':').map(Number)
  return new Date(year, month - 1, day, hour, minute, 0, 0)
}

export const isPastDate = (dateIso: string): boolean => {
  const date = new Date(`${dateIso}T00:00:00`)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return date < today
}

export const isInsideNoticeWindow = (
  dateIso: string,
  time24: string,
  noticeHours: number,
): boolean => {
  const slotDate = toDateTime(dateIso, time24)
  const threshold = new Date(Date.now() + noticeHours * 60 * 60 * 1000)
  return slotDate < threshold
}

export const groupAvailabilityByDate = (availability: DayAvailability[]) =>
  availability.reduce<Record<string, TimeSlot[]>>((accumulator, item) => {
    accumulator[item.date] = item.slots
    return accumulator
  }, {})

export const normalizePhoneNumber = (input: string): string => {
  const digits = input.replace(/\D/g, '')
  if (digits.length === 10) {
    return `+1${digits}`
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`
  }

  if (digits.length > 11) {
    return `+${digits}`
  }

  return digits
}

export const formatPhoneInput = (input: string): string => {
  const digits = input.replace(/\D/g, '').slice(0, 10)
  const part1 = digits.slice(0, 3)
  const part2 = digits.slice(3, 6)
  const part3 = digits.slice(6, 10)

  if (digits.length < 4) {
    return part1
  }
  if (digits.length < 7) {
    return `${part1}-${part2}`
  }
  return `${part1}-${part2}-${part3}`
}

export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const validatePhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
}

export const getStoredBookings = (): BookingRecord[] => {
  const raw = localStorage.getItem(bookingStorageKey)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as BookingRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const saveBooking = (record: BookingRecord): BookingRecord[] => {
  const existing = getStoredBookings()
  const updated = [record, ...existing]
  localStorage.setItem(bookingStorageKey, JSON.stringify(updated))
  return updated
}

