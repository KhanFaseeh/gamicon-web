import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MonogramIcon } from '../components/Logo'

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [passcode, setPasscode] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    const expectedPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'gamicon2026'

    if (passcode.trim() === expectedPasscode.trim() || passcode.trim() === 'anamorphic2026') {
      sessionStorage.setItem('anamorphic_admin_auth', 'authenticated')
      sessionStorage.setItem('gamicon_admin_auth', 'authenticated')
      onLoginSuccess()
    } else {
      setErrorMsg('ACCESS DENIED // INVALID CLEARANCE PASSCODE')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] flex items-center justify-center p-6 font-sans selection:bg-white selection:text-black">
      <div className="w-full max-w-md bg-[#0e0e0e] border border-[#444748] p-8 md:p-10 space-y-8">
        {/* Terminal Header */}
        <div className="text-center space-y-3 border-b border-[#444748]/40 pb-6">
          <div className="flex justify-center mb-1">
            <MonogramIcon className="w-12 h-12" animated={true} />
          </div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1c1b1b] border border-[#444748]/40 font-mono text-[10px] text-[#8e9192] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-white inline-block animate-pulse" />
            <span>TERMINAL ACCESS // SECTOR 04</span>
          </div>
          <h1 className="font-display text-2xl uppercase tracking-[0.2em] text-white font-bold pl-[0.1em]">
            ANAMORPHIC // CMS GATEWAY
          </h1>
          <p className="text-xs text-[#8e9192] font-mono">
            RESTRICTED AUTEUR STUDIO DASHBOARD
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/80 border border-red-700 text-red-300 font-mono text-xs uppercase tracking-wide">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1.5">
              OPERATOR PASSCODE
            </label>
            <input
              type="password"
              required
              autoFocus
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode..."
              className="w-full bg-[#131313] border border-[#444748]/50 text-white px-3 py-2.5 font-mono text-xs focus:border-white focus:ring-0"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-display text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors"
          >
            UNLOCK DASHBOARD →
          </button>
        </form>

        {/* Telemetry Footer */}
        <div className="pt-4 border-t border-[#444748]/30 flex justify-between items-center font-mono text-[10px] text-[#8e9192] uppercase">
          <span>PORT: 443 TLS</span>
          <Link to="/" className="hover:text-white underline">
            ← RETURN TO WEBSITE
          </Link>
        </div>
      </div>
    </div>
  )
}
