import { PageMeta } from '../components/PageMeta'
import { FadeInSection } from '../components/FadeInSection'
import { siteIdentity } from '../data/siteData'

interface LegalPageProps {
  title: string
  description: string
  sections: Array<{ heading: string; content: string }>
}

const LegalPageTemplate = ({ title, description, sections }: LegalPageProps) => (
  <>
    <PageMeta title={`${title} | ${siteIdentity.name}`} description={description} />
    <FadeInSection className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <h1 className="font-serifDisplay text-3xl text-charcoal sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-slate-700">{description}</p>
      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <article key={section.heading}>
            <h2 className="font-serifDisplay text-2xl text-charcoal">{section.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{section.content}</p>
          </article>
        ))}
      </div>
    </FadeInSection>
  </>
)

export const PrivacyPage = () => (
  <LegalPageTemplate
    title="Privacy Policy"
    description="How booking and contact information is collected, used, and retained."
    sections={[
      {
        heading: 'Information Collected',
        content:
          'This website may collect information submitted through booking and contact forms, including your name, email, phone number, requested experience, and scheduling preferences.',
      },
      {
        heading: 'Usage of Information',
        content:
          'Submitted information is used only to schedule bookings, confirm details, and communicate service availability. Information is not sold or shared for unrelated marketing.',
      },
      {
        heading: 'Data Security',
        content:
          'Reasonable safeguards are used to protect submitted data. Please avoid sharing unnecessary sensitive personal details in web forms.',
      },
    ]}
  />
)

export const TermsPage = () => (
  <LegalPageTemplate
    title="Terms of Service"
    description="Terms governing the use of this companionship booking website."
    sections={[
      {
        heading: 'Use of Site',
        content:
          'This website is intended for legal companionship booking and communication only. Submitting a form is a request and does not guarantee a confirmed booking.',
      },
      {
        heading: 'Booking Requests',
        content:
          'All requests are subject to availability and direct confirmation. Session details, location expectations, and time windows must be agreed before final confirmation.',
      },
      {
        heading: 'Legal Boundaries',
        content:
          'Services are companionship-only and must remain legal, respectful, and consensual. Illegal, explicit, or unsafe requests will be declined.',
      },
    ]}
  />
)

export const DisclaimerPage = () => (
  <LegalPageTemplate
    title="Booking Disclaimer"
    description="Important disclosures regarding companionship bookings and expectations."
    sections={[
      {
        heading: 'Social Companionship Only',
        content:
          'Bookings are for social companionship experiences only. This service does not include illegal activities or explicit services.',
      },
      {
        heading: 'Right to Decline',
        content:
          'Any request may be declined if it does not meet safety, legal, or respectful conduct standards.',
      },
      {
        heading: 'Communication Standards',
        content:
          'Please communicate clearly and respectfully. Confirmation details are provided after booking review and acceptance.',
      },
    ]}
  />
)
