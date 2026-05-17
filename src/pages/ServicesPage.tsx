import { PageMeta } from '../components/PageMeta'
import { ServicesSection } from '../components/ServicesSection'
import { serviceList, siteIdentity } from '../data/siteData'

export const ServicesPage = () => (
  <>
    <PageMeta
      title={`Experiences | ${siteIdentity.name}`}
      description="Browse premium companionship experiences including dinner sessions, events, outings, and travel companionship."
    />
    <ServicesSection services={serviceList} />
  </>
)
