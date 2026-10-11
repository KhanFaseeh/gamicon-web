interface VideoModalProps {
  isOpen: boolean
  youtubeId: string
  title: string
  onClose: () => void
}

export default function VideoModal({ isOpen, youtubeId, title, onClose }: VideoModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0e0e0e] border border-[#444748] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#131313] border-b border-[#444748]/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white inline-block animate-pulse"></span>
            <span className="font-display text-xs uppercase tracking-widest text-white">
              SIGNAL FEED // {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#131313] border-t border-[#444748]/40 flex justify-between text-[11px] font-display text-neutral-400 tracking-wider uppercase">
          <span>YOUTUBE TRANSMISSION ID: {youtubeId}</span>
          <span>PRESS ESC OR CLICK OUTSIDE TO CLOSE</span>
        </div>
      </div>
    </div>
  )
}
