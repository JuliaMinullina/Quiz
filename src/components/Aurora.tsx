export function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="aurora-arch absolute left-1/2 top-[-18%] h-[70%] w-[120%] -translate-x-1/2 rounded-[50%]" />
      <div className="aurora-wash absolute inset-0" />
      <style>{`
        .aurora-arch {
          background: radial-gradient(closest-side, rgba(80, 230, 255, 0.0) 42%, rgba(70, 210, 255, 0.55) 58%, rgba(90, 140, 255, 0.0) 72%);
          filter: blur(10px);
          animation: aurora-drift 18s ease-in-out infinite alternate;
        }
        .aurora-wash {
          background:
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(70, 255, 200, 0.18), transparent 60%),
            radial-gradient(ellipse 40% 50% at 12% 20%, rgba(120, 90, 255, 0.16), transparent 62%);
        }
        @keyframes aurora-drift {
          from { transform: translate3d(-50%, 0, 0) scale(1); }
          to { transform: translate3d(-48%, 3%, 0) scale(1.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-arch { animation: none; }
        }
      `}</style>
    </div>
  )
}
