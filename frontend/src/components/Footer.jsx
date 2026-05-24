import { Link } from 'react-router-dom'
import { brand } from '../api/homepageContent'

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-10" id="login">
      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/5 md:p-8">
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-extrabold tracking-[0.2em] text-white"
            aria-hidden="true"
          >
          AI
          </div>
          <p className="text-base font-bold text-slate-900">{brand.name}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Quick Links</h3>
            <div className="space-y-2">
              <Link className="block text-slate-600 transition hover:text-blue-700" to="/about">
                About
              </Link>
              <Link className="block text-slate-600 transition hover:text-blue-700" to="/features">
                Features
              </Link>
              <Link className="block text-slate-600 transition hover:text-blue-700" to="/faq">
                FAQ
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Resources</h3>
            <div className="space-y-2 text-slate-600">
              <a href="#">Blog</a>
              <a href="#">Docs</a>
              <a href="#">Help</a>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Social</h3>
            <div className="space-y-2 text-slate-600">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Facebook</a>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Newsletter</h3>
            <form className="grid gap-2">
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="h-11 rounded-xl border border-slate-200 px-3 text-slate-800 outline-none ring-blue-300 transition focus:ring"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <p className="border-t border-slate-200 pt-4 text-center text-sm text-slate-500">
          © 2026 InternMatch AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
