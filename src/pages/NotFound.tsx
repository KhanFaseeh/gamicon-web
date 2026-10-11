import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center font-mono">
      <p className="text-sm tracking-widest text-neutral-500 mb-2">ERROR 404</p>
      <h1 className="text-5xl font-bold tracking-widest mb-6">SIGNAL LOST</h1>
      <Link
        to="/"
        className="px-6 py-2 border border-neutral-700 hover:border-white text-sm tracking-wider uppercase transition-colors"
      >
        Return to Base
      </Link>
    </div>
  )
}
