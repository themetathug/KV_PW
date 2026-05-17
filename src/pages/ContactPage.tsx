import { useState } from 'react'
import type { FormEvent } from 'react'
import { ContactDetailsPanel, QuickContactCard } from '../components/ContactWidgets'
import { FadeInSection } from '../components/FadeInSection'
import { PageMeta } from '../components/PageMeta'
import { siteIdentity } from '../data/siteData'
import { validateEmail } from '../utils/booking'

const inputClassName =
  'w-full rounded-xl border border-blush-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blush-400 focus:ring-2 focus:ring-blush-200'

export const ContactPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete all fields before submitting.')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setSubmitted(true)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <>
      <PageMeta
        title={`Contact | ${siteIdentity.name}`}
        description="Contact Katie V for legal companionship booking availability, scheduling, and custom plans."
      />

      <FadeInSection className="rounded-3xl border border-blush-100 bg-white p-6 shadow-soft sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">Contact</p>
        <h1 className="mt-2 font-serifDisplay text-3xl text-charcoal sm:text-4xl">
          Speak With Katie V
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
          For booking availability, custom plans, or schedule questions, call
          <a href={`tel:${siteIdentity.phoneLink}`} className="mx-1 font-semibold text-gold-800">
            {siteIdentity.phoneDisplay}
          </a>
          for direct assistance.
        </p>
      </FadeInSection>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-6">
          <ContactDetailsPanel />
          <article className="rounded-3xl border border-blush-100 bg-white p-6 shadow-soft">
            <h2 className="font-serifDisplay text-3xl text-charcoal">Send a Direct Message</h2>
            <p className="mt-2 text-sm text-slate-700">
              Use this form for questions. For faster booking confirmation, use the calendar page.
            </p>
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className={inputClassName}
                  placeholder="Your Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <input
                  className={inputClassName}
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <textarea
                className={`${inputClassName} min-h-[140px]`}
                placeholder="How can we help?"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              {error ? <p className="text-xs text-rose-600">{error}</p> : null}
              {submitted ? (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  Thank you. Your message has been received and our office will reply shortly.
                </p>
              ) : null}
              <button
                type="submit"
                className="rounded-full bg-plum px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-charcoal"
              >
                Send Message
              </button>
            </form>
          </article>
        </section>
        <QuickContactCard />
      </div>
    </>
  )
}
