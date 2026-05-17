import { Menu, PhoneCall, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { siteIdentity } from '../data/siteData'

const navigationItems = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Experiences' },
  { path: '/booking', label: 'Book Time' },
  { path: '/contact', label: 'Contact' },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors duration-200 ${
    isActive ? 'text-gold-300' : 'text-slate-100 hover:text-gold-200'
  }`

export const SiteLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-blush-50 font-sansBody text-slate-800">
      <header className="sticky top-0 z-50 border-b border-blush-300/50 bg-plum/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="group flex items-center gap-3">
            <div className="rounded-full border border-gold-500/50 bg-gold-500/10 p-2 text-gold-300 transition group-hover:bg-gold-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-serifDisplay text-lg font-semibold tracking-tight text-white">
                {siteIdentity.name}
              </p>
              <p className="text-xs text-slate-300">{siteIdentity.practiceName}</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${siteIdentity.phoneLink}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-500/10 px-4 py-2 text-sm font-semibold text-gold-200 transition hover:bg-gold-500/20"
            >
              <PhoneCall className="h-4 w-4" />
              {siteIdentity.phoneDisplay}
            </a>
          </div>

          <button
            type="button"
            className="inline-flex rounded-md border border-blush-400/40 p-2 text-slate-100 transition hover:border-gold-400 hover:text-gold-300 lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-blush-400/30 bg-plum/95 px-4 pb-5 pt-3 lg:hidden">
            <div className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 ${
                      isActive
                        ? 'bg-white/10 text-gold-300'
                        : 'text-slate-100 transition hover:bg-white/5 hover:text-gold-200'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href={`tel:${siteIdentity.phoneLink}`}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-md border border-gold-400/60 bg-gold-500/10 px-3 py-2 font-semibold text-gold-200"
              >
                <PhoneCall className="h-4 w-4" />
                Call {siteIdentity.phoneDisplay}
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-plum pb-20 pt-14 text-slate-200 sm:pb-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <section>
            <h2 className="font-serifDisplay text-2xl text-white">{siteIdentity.name}</h2>
            <p className="mt-2 text-sm text-slate-300">{siteIdentity.title}</p>
            <p className="mt-4 text-sm text-slate-300">
              {siteIdentity.tagline}
            </p>
          </section>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
              Contact
            </h3>
            <a
              href={`tel:${siteIdentity.phoneLink}`}
              className="mt-3 block text-xl font-semibold text-gold-200 hover:text-gold-100"
            >
              {siteIdentity.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteIdentity.email}`}
              className="mt-2 block text-sm text-slate-300 hover:text-white"
            >
              {siteIdentity.email}
            </a>
          </section>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
              Location
            </h3>
            <p className="mt-3 text-sm text-slate-300">{siteIdentity.officeAddress}</p>
            <p className="mt-2 text-sm text-slate-300">{siteIdentity.hours}</p>
          </section>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
              Policies
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <NavLink to="/privacy" className="text-slate-300 hover:text-white">
                Privacy Policy
              </NavLink>
              <NavLink to="/terms" className="text-slate-300 hover:text-white">
                Terms of Service
              </NavLink>
              <NavLink to="/disclaimer" className="text-slate-300 hover:text-white">
                Booking Disclaimer
              </NavLink>
            </div>
          </section>
        </div>
        <div className="mx-auto mt-10 w-full max-w-7xl border-t border-slate-700/70 px-4 pt-5 text-xs text-slate-400 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {siteIdentity.name}. All rights reserved.
        </div>
      </footer>

      <a
        href={`tel:${siteIdentity.phoneLink}`}
        className="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-charcoal shadow-lift transition hover:bg-gold-400 sm:left-auto sm:right-6 sm:w-auto lg:hidden"
      >
        <PhoneCall className="h-4 w-4" />
        Questions? Call {siteIdentity.phoneDisplay}
      </a>
    </div>
  )
}
