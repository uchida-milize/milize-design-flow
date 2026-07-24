export function MascotIcon({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        {/* Body */}
        <ellipse cx="28" cy="32" rx="18" ry="20" fill="url(#mascot-body)" />
        {/* Face */}
        <ellipse cx="28" cy="26" rx="14" ry="14" fill="white" opacity="0.95" />
        {/* Eyes */}
        <circle cx="23" cy="24" r="2.5" fill="#2563eb" />
        <circle cx="33" cy="24" r="2.5" fill="#2563eb" />
        <circle cx="24" cy="23" r="0.8" fill="white" />
        <circle cx="34" cy="23" r="0.8" fill="white" />
        {/* Smile */}
        <path d="M23 29 Q28 33 33 29" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Compass needle */}
        <path d="M28 14 L30 20 L28 19 L26 20 Z" fill="#3b82f6" opacity="0.8" />
        <path d="M28 14 L26 20 L28 19 L30 20 Z" fill="#bfdbfe" opacity="0.8" />
        <defs>
          <linearGradient id="mascot-body" x1="10" y1="12" x2="46" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
