import { Helmet } from 'react-helmet-async'

interface PageMetaProps {
  title: string
  description: string
}

export const PageMeta = ({ title, description }: PageMetaProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
)
