import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/Layout'
import { BookingPage } from './pages/BookingPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { DisclaimerPage, PrivacyPage, TermsPage } from './pages/LegalPages'
import { ServicesPage } from './pages/ServicesPage'

export const App = () => (
  <Routes>
    <Route path="/" element={<SiteLayout />}>
      <Route index element={<HomePage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="booking" element={<BookingPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
      <Route path="terms" element={<TermsPage />} />
      <Route path="disclaimer" element={<DisclaimerPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
)
