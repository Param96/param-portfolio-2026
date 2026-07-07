'use client';

/**
 * PandaBamboo — small decorative animated illustration for the letter popup.
 * Panda gently blinks and bobs; bamboo leaves sway. Pure SVG + CSS animation,
 * no JS animation loop needed.
 *
 * Usage:
 *   <PandaBamboo className="absolute bottom-4 right-4 w-24 h-24" />
 */
export default function PandaBamboo({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          .pb-panda {
            animation: pb-bob 3.2s ease-in-out infinite;
            transform-origin: 80px 130px;
          }
          .pb-eye {
            animation: pb-blink 4.5s ease-in-out infinite;
            transform-origin: center;
          }
          .pb-eye-r {
            animation-delay: 0.05s;
          }
          .pb-leaf-1 {
            animation: pb-sway 2.6s ease-in-out infinite;
            transform-origin: 60px 70px;
          }
          .pb-leaf-2 {
            animation: pb-sway 2.6s ease-in-out infinite;
            animation-delay: 0.4s;
            transform-origin: 68px 60px;
          }
          .pb-leaf-3 {
            animation: pb-sway 2.6s ease-in-out infinite;
            animation-delay: 0.8s;
            transform-origin: 76px 66px;
          }

          @keyframes pb-bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes pb-blink {
            0%, 92%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          @keyframes pb-sway {
            0%, 100% { transform: rotate(-4deg); }
            50% { transform: rotate(5deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            .pb-panda, .pb-eye, .pb-leaf-1, .pb-leaf-2, .pb-leaf-3 {
              animation: none;
            }
          }
        `}</style>

        {/* Bamboo stalks, behind the panda */}
        <g>
          <rect x="56" y="50" width="6" height="80" rx="3" fill="#6B7353" />
          <rect x="66" y="42" width="6" height="88" rx="3" fill="#8A9270" />
          <rect x="76" y="56" width="6" height="74" rx="3" fill="#6B7353" />
          {/* stalk joints */}
          <rect x="55" y="70" width="8" height="3" rx="1.5" fill="#F4EDE4" opacity="0.6" />
          <rect x="65" y="62" width="8" height="3" rx="1.5" fill="#F4EDE4" opacity="0.6" />
          <rect x="75" y="76" width="8" height="3" rx="1.5" fill="#F4EDE4" opacity="0.6" />

          {/* leaves */}
          <ellipse className="pb-leaf-1" cx="52" cy="62" rx="12" ry="5" fill="#6B7353" />
          <ellipse className="pb-leaf-2" cx="70" cy="46" rx="13" ry="5.5" fill="#8A9270" />
          <ellipse className="pb-leaf-3" cx="82" cy="60" rx="11" ry="4.5" fill="#6B7353" />
        </g>

        {/* Panda */}
        <g className="pb-panda">
          {/* body */}
          <ellipse cx="90" cy="118" rx="34" ry="26" fill="#F4EDE4" stroke="#2E2C2A" strokeWidth="2.5" />
          {/* head */}
          <circle cx="90" cy="80" r="30" fill="#F4EDE4" stroke="#2E2C2A" strokeWidth="2.5" />
          {/* ears */}
          <circle cx="68" cy="56" r="11" fill="#2E2C2A" />
          <circle cx="112" cy="56" r="11" fill="#2E2C2A" />
          {/* eye patches */}
          <ellipse cx="76" cy="82" rx="10" ry="13" fill="#2E2C2A" transform="rotate(-10 76 82)" />
          <ellipse cx="104" cy="82" rx="10" ry="13" fill="#2E2C2A" transform="rotate(10 104 82)" />
          {/* eyes */}
          <ellipse className="pb-eye" cx="77" cy="83" rx="3.2" ry="4" fill="#F4EDE4" />
          <ellipse className="pb-eye pb-eye-r" cx="103" cy="83" rx="3.2" ry="4" fill="#F4EDE4" />
          {/* nose */}
          <ellipse cx="90" cy="96" rx="4.5" ry="3.5" fill="#2E2C2A" />
          {/* paw holding bamboo */}
          <ellipse cx="66" cy="108" rx="11" ry="9" fill="#2E2C2A" />
          <rect x="60" y="88" width="7" height="30" rx="3.5" fill="#8A9270" />
        </g>
      </svg>
    </div>
  );
}
