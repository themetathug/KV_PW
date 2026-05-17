import type { DayAvailability, Service, SiteIdentity, TimeSlot } from '../types'

// Update this single object to rename the site and swap photos globally.
export const siteIdentity: SiteIdentity = {
  name: 'Katie V',
  displayName: 'Katie V',
  practiceName: 'Katie V Companionship',
  title: 'Proffesical working women',
  tagline: 'Elegant, friendly companionship for quality social time.',
  heroSummary:
    'Book quality social time with a confident and friendly companion. Sessions are designed for conversation, connection, and memorable experiences.',
  aboutSummary:
    'Katie V offers polished, respectful companionship for adults seeking meaningful social time. Every booking is handled with discretion, clear communication, and positive energy.',
  phoneDisplay: '+1 512-704-9173',
  phoneLink: '+15127049173',
  email: 'katievallo2016@icloud.com',
  officeAddress: 'Austin, Texas - private meetup details shared after confirmation',
  yearsExperience: 6,
  hours: 'Daily, 12:00 PM - 11:00 PM',
  media: {
    heroPortrait: '/images/katie-hero.png',
    aboutPortrait: '/images/katie-contact.png',
    quickContactPortrait: '/images/katie-hero.png',
    officeLocation: '/images/office-location.svg',
  },
}

export const advanceNoticeHours = 24

export const serviceList: Service[] = [
  {
    id: 'dinner-companion-session',
    title: 'Dinner Companion Session',
    shortDescription:
      'Enjoy upscale dinner company with engaging conversation and relaxed energy.',
    fullDescription:
      'Perfect for fine dining, date nights, or special evenings where you want polished company. Sessions are social, respectful, and focused on quality time.',
    category: 'Premium Time',
    durationMinutes: 120,
    rateInfo: '$250 / 2-hour session',
    icon: 'heart',
    image: '/images/katie-contact.png',
    imageAlt: 'Katie V available for elegant dinner companion session',
    highlights: [
      'Warm, confident social presence',
      'Great conversation and positive vibe',
      'Planned schedule and punctual arrival',
    ],
  },
  {
    id: 'event-plus-one',
    title: 'Event Plus-One Experience',
    shortDescription:
      'Bring a stylish, friendly plus-one to parties, launches, and social events.',
    fullDescription:
      'Ideal for networking events, private celebrations, and nightlife plans. You get a poised companion who keeps the energy fun and effortless.',
    category: 'Events',
    durationMinutes: 180,
    rateInfo: '$350 / 3-hour event package',
    icon: 'sparkles',
    image: '/images/katie-hero.png',
    imageAlt: 'Katie V event plus-one booking experience',
    highlights: [
      'Confident public presence',
      'Easy social chemistry',
      'Flexible event pacing',
    ],
  },
  {
    id: 'city-outing',
    title: 'City Outing & Lifestyle Time',
    shortDescription:
      'Spend quality daytime or evening time exploring the city together.',
    fullDescription:
      'Perfect for brunches, shopping, live music spots, or scenic walks. Designed for people who want enjoyable company and shared moments.',
    category: 'Social Outing',
    durationMinutes: 150,
    rateInfo: '$300 / 2.5-hour outing',
    icon: 'users',
    image: '/images/katie-contact.png',
    imageAlt: 'Katie V city outing companionship service',
    highlights: [
      'Relaxed and fun atmosphere',
      'Great for local activities',
      'Personalized outing plans',
    ],
  },
  {
    id: 'coffee-conversation',
    title: 'Coffee & Conversation',
    shortDescription:
      'Casual meetup for meaningful conversation and connection in public settings.',
    fullDescription:
      'Simple and comfortable quality time for those who prefer calm, low-pressure social plans. Great for first-time bookings.',
    category: 'Conversation',
    durationMinutes: 90,
    rateInfo: '$180 / 90-minute meet',
    icon: 'coffee',
    image: '/images/katie-hero.png',
    imageAlt: 'Katie V coffee and conversation companionship',
    highlights: [
      'Public, relaxed meetup setting',
      'Friendly one-on-one conversation',
      'Ideal intro session',
    ],
  },
  {
    id: 'travel-companion',
    title: 'Travel Companion (Local/Regional)',
    shortDescription:
      'Short local or regional trips with curated social company and flexible planning.',
    fullDescription:
      'For clients who want polished companionship while traveling for leisure or events. Trip planning, scheduling, and boundaries are discussed before confirmation.',
    category: 'Travel',
    durationMinutes: 240,
    rateInfo: 'Custom quote based on schedule and location',
    icon: 'plane',
    image: '/images/office-location.svg',
    imageAlt: 'Travel companionship booking service',
    highlights: [
      'Pre-trip planning call',
      'Clear expectations and boundaries',
      'Tailored to your itinerary',
    ],
  },
]

const baseTimeSlots = [
  { time: '12:00', durationMinutes: 90 },
  { time: '14:00', durationMinutes: 120 },
  { time: '17:00', durationMinutes: 120 },
  { time: '19:30', durationMinutes: 150 },
  { time: '21:00', durationMinutes: 90 },
]

export const buildMockAvailability = (daysToGenerate = 120): DayAvailability[] => {
  const result: DayAvailability[] = []
  const today = new Date()

  for (let offset = 0; offset <= daysToGenerate; offset += 1) {
    const date = new Date(today)
    date.setDate(today.getDate() + offset)

    const dateIso = date.toISOString().split('T')[0]
    const slots: TimeSlot[] = baseTimeSlots.map((slot, index) => ({
      id: `${dateIso}-${slot.time}`,
      time: slot.time,
      durationMinutes: slot.durationMinutes,
      blocked: (offset + index) % 9 === 0,
    }))

    result.push({ date: dateIso, slots })
  }

  return result
}

export const qualificationList = [
  'Respectful, friendly, and well-presented',
  'Clear communication before every booking',
  'Discreet and punctual scheduling',
  'Public and private social-event ready',
]

export const faqEntries = [
  {
    question: 'How quickly can I book time?',
    answer:
      'Most bookings can be confirmed within 24-48 hours based on your requested date and time.',
  },
  {
    question: 'Is this discreet?',
    answer:
      'Yes. Your booking details and contact information are treated as private and handled discreetly.',
  },
  {
    question: 'What should I prepare before meeting?',
    answer:
      'Share your preferred activity, location, and schedule so we can confirm the best plan for your time.',
  },
  {
    question: 'Are services strictly legal and social?',
    answer:
      'Yes. All bookings are legal, consensual, and strictly companionship-based. Illegal or explicit requests are not accepted.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Bookings can be rescheduled with at least 24 hours notice. Late cancellations may include a reservation fee.',
  },
]

