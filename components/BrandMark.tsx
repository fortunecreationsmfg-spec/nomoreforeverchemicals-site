export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#1A2E26" />
      <path d="M32 10c9 11 18 20 18 31a18 18 0 1 1-36 0c0-11 9-20 18-31z" fill="#20B2AA" />
      <path d="M32 24c4.2 5.2 8 9.2 8 14.2a8 8 0 1 1-16 0C24 33.2 27.8 29.2 32 24z" fill="#F7F5F0" />
    </svg>
  );
}
