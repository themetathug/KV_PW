export type ServiceCategory =
  | 'Premium Time'
  | 'Social Outing'
  | 'Events'
  | 'Conversation'
  | 'Travel'
  | 'Lifestyle'

export interface SiteMedia {
  heroPortrait: string
  aboutPortrait: string
  quickContactPortrait: string
  officeLocation: string
}

export interface SiteIdentity {
  name: string
  displayName: string
  practiceName: string
  title: string
  tagline: string
  heroSummary: string
  aboutSummary: string
  phoneDisplay: string
  phoneLink: string
  email: string
  officeAddress: string
  yearsExperience: number
  hours: string
  media: SiteMedia
}

export interface Service {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: ServiceCategory
  durationMinutes: number
  rateInfo: string
  icon: 'heart' | 'sparkles' | 'users' | 'coffee' | 'plane'
  image: string
  imageAlt: string
  highlights: string[]
}

export interface TimeSlot {
  id: string
  time: string
  durationMinutes: number
  serviceIds?: string[]
  blocked?: boolean
}

export interface DayAvailability {
  date: string
  slots: TimeSlot[]
}

export interface BookingFormValues {
  name: string
  email: string
  phone: string
  serviceId: string
  preferredDate: string
  preferredTime: string
  message: string
  acceptedTerms: boolean
}

export interface BookingRecord extends BookingFormValues {
  id: string
  slotId: string
  normalizedPhone: string
  createdAt: string
}
