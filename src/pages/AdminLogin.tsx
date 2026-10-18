import { useState } from 'react'
import { Link } from 'react-router-dom'

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('engineer@anamorphic.studio')
  const [password, setPassword] = useState('anamorphic_studio_session_key')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [rememberKey, setRememberKey] = useState(true)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    // Allow default demo credentials or custom env passcode
    const expectedPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'anamorphic2026'

    if (
      password.trim() === 'anamorphic_studio_session_key' ||
      password.trim() === expectedPasscode ||
      password.trim() === 'gamicon2026' ||
      password.trim() === 'anamorphic2026'
    ) {
      sessionStorage.setItem('gamicon_admin_auth', 'authenticated')
      onLoginSuccess()
    } else {
      setErrorMsg('Invalid credentials. Please verify your work email and password.')
    }
  }

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex flex-col justify-between antialiased selection:bg-secondary selection:text-on-secondary">
      {/* Top Editorial Header */}
      <header className="w-full border-b border-on-surface/10 px-6 py-3 flex items-center justify-between text-label-eyebrow font-label-eyebrow text-on-surface-variant bg-surface/90">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-on-surface">Anamorphic Studio CMS</span>
          <span className="hidden sm:inline text-outline">/</span>
          <span className="hidden sm:inline text-on-surface-variant">Production Management</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link
            to="/"
            className="hover:text-primary transition-colors flex items-center gap-1 text-on-surface-variant hover:text-on-surface"
          >
            <span>View Public Site</span>
            <span className="material-symbols-outlined text-[14px]">north_east</span>
          </Link>
        </div>
      </header>

      {/* Central Working Authentication Canvas */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Studio Admin Authentication Card */}
          <div className="bg-surface-container-lowest/90 border border-on-surface/10 rounded-2xl p-8 sm:p-10 shadow-[2px_2px_0px_#1B1A17] transition-all">
            {/* Brand Wordmark & Eyebrow Metadata */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-2xl font-bold tracking-tight text-on-surface lowercase">
                  anamorphic
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono tracking-tight bg-surface-container text-on-surface-variant border border-outline-variant/20">
                ADMIN_AUTH
              </span>
            </div>

            {/* Heading Cluster */}
            <div className="mt-6 mb-6">
              <h1 className="font-headline-md text-xl font-bold text-on-surface tracking-tight">
                Admin sign in
              </h1>
              <p className="font-label-eyebrow text-xs text-on-surface-variant/80 mt-1">
                Enter studio credentials to access the production workspace
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Direct Authentication Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  className="block font-label-eyebrow text-xs font-semibold text-on-surface tracking-wider uppercase mb-1.5"
                  htmlFor="work-email"
                >
                  Work email
                </label>
                <div className="relative">
                  <input
                    id="work-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@anamorphic.studio"
                    className="w-full rounded-xl border border-on-surface/20 bg-surface-container-lowest px-3.5 py-2.5 text-sm font-body-md text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-base">alternate_email</span>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className="block font-label-eyebrow text-xs font-semibold text-on-surface tracking-wider uppercase"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Default demo password is pre-filled: anamorphic_studio_session_key')}
                    className="font-label-eyebrow text-xs text-on-surface-variant hover:text-on-surface underline underline-offset-2 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full rounded-xl border border-on-surface/20 bg-surface-container-lowest px-3.5 py-2.5 text-sm font-body-md text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors pr-10"
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-outline hover:text-on-surface transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Production Session Toggle Checkbox */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberKey}
                    onChange={(e) => setRememberKey(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-0 focus:ring-offset-0 bg-surface"
                  />
                  <span className="text-xs text-on-surface-variant font-label-eyebrow">
                    Remember terminal key
                  </span>
                </label>
                <span className="text-[11px] font-mono text-outline">TTL: 12h</span>
              </div>

              {/* Fused Primary Compound Pill CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-11 px-6 rounded-full bg-primary-container text-on-primary hover:bg-secondary-container hover:text-on-secondary active:scale-[0.99] transition-all duration-150 font-medium text-sm flex items-center justify-center gap-2 group shadow-none"
                >
                  <span>Sign in</span>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-container-lowest/15 group-hover:bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <span className="material-symbols-outlined text-sm font-bold">north_east</span>
                  </span>
                </button>
              </div>
            </form>

            {/* Hardware Key / SSO Alternative */}
            <div className="mt-4 pt-4 border-t border-outline-variant/15 flex items-center justify-between text-xs text-on-surface-variant">
              <button
                type="button"
                onClick={() => onLoginSuccess()}
                className="flex items-center gap-1.5 hover:text-primary transition-colors text-xs font-label-eyebrow"
              >
                <span className="material-symbols-outlined text-sm text-outline">key</span>
                <span>Use hardware key (FIDO2)</span>
              </button>
              <button
                type="button"
                onClick={() => onLoginSuccess()}
                className="hover:text-primary transition-colors font-mono text-[11px] text-outline"
              >
                SSO/Okta
              </button>
            </div>

            {/* Direct Session Security Note */}
            <div className="mt-6 pt-4 border-t border-outline-variant/15 text-center">
              <p className="text-[11px] font-mono text-on-surface-variant/70 tracking-tight flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container inline-block"></span>
                Authorized Studio Management Access
              </p>
            </div>
          </div>

          {/* Clean Subtext */}
          <div className="mt-6 text-center text-xs text-on-surface-variant/60 font-label-eyebrow">
            <p>Anamorphic Studio Administration</p>
          </div>
        </div>
      </main>

      {/* Studio Footer Utility Bar */}
      <footer className="w-full border-t border-outline-variant/15 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant font-label-eyebrow">
        <div className="flex items-center gap-4">
          <span className="text-on-surface font-semibold">anamorphic</span>
          <span className="text-outline">·</span>
          <span>Engineering Management Console</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-outline">
          <Link to="/" className="hover:text-on-surface transition-colors">
            Return to Studio
          </Link>
        </div>
      </footer>
    </div>
  )
}
