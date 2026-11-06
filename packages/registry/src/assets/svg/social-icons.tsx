import React from "react";

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  solid?: boolean;
}

export function WhatsAppIcon({ className, solid, ...props }: SocialIconProps) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <path
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5a7.5 7.5 0 0 0-6.5 11.2L4.5 19.5l3.9-1a7.5 7.5 0 1 0 3.6-14z"
        />
        <path
          fill="#ffffff"
          stroke="none"
          d="M15.5 13.8c-.2-.1-1.1-.6-1.3-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3 0-.1 0-.3 0-.4 0-.1-.4-1.1-.6-1.5-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.7.8-.7 1.8s.7 2.1.8 2.3c.1.2 1.5 2.4 3.7 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.5-.1 1.3-.6 1.5-1.1.2-.5.2-1 .2-1.1-.1-.1-.3-.2-.5-.3z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" />
      <path
        fill="currentColor"
        stroke="none"
        d="M15.5 13.8c-.2-.1-1.1-.6-1.3-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3 0-.1 0-.3 0-.4 0-.1-.4-1.1-.6-1.5-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.7.8-.7 1.8s.7 2.1.8 2.3c.1.2 1.5 2.4 3.7 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.5-.1 1.3-.6 1.5-1.1.2-.5.2-1 .2-1.1-.1-.1-.3-.2-.5-.3z"
      />
    </svg>
  );
}

export function InstagramIcon({ className, solid, ...props }: SocialIconProps) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
        <rect width="24" height="24" rx="7" fill="currentColor" />
        <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="#ffffff" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.8" fill="none" stroke="#ffffff" strokeWidth="2" />
        <circle cx="16.8" cy="7.2" r="1.1" fill="#ffffff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className, solid, ...props }: SocialIconProps) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <path fill="#ffffff" d="M14 21v-8.2h2.8l.4-3.2H14V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.1H7.5v3.2h2.8V21h3.7z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M17 2h-3.5a4.5 4.5 0 0 0-4.5 4.5V10H6v4h3v8h4v-8h3.5l.8-4H13V6.8a1.3 1.3 0 0 1 1.3-1.3H17V2z" />
    </svg>
  );
}

export function XIcon({ className, solid, ...props }: SocialIconProps) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <path
          fill="#ffffff"
          d="M15.8 6h2.1l-4.6 5.3 5.4 7.2h-4.3l-3.3-4.4-3.9 4.4H5l4.9-5.6L4.7 6h4.4l3 4 3.7-4zm-.8 11.2h1.2L9.2 7.2H8l7 10z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M4 4l16 16" />
      <path d="M20 4l-6.2 7.1L20 20h-3.4L12 14.3 7.4 20H4l6.2-7.1L4 4h3.4L12 9.7 16.6 4H20z" strokeWidth="1.8" />
    </svg>
  );
}

export function YouTubeIcon({ className, solid, ...props }: SocialIconProps) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
        <rect width="24" height="24" rx="7" fill="currentColor" />
        <path d="M18.8 8.4a2 2 0 0 0-1.4-1.4C16.1 6.7 12 6.7 12 6.7s-4.1 0-5.4.3a2 2 0 0 0-1.4 1.4C5 9.7 5 12 5 12s0 2.3.2 3.6a2 2 0 0 0 1.4 1.4c1.3.3 5.4.3 5.4.3s4.1 0 5.4-.3a2 2 0 0 0 1.4-1.4c.2-1.3.2-3.6.2-3.6s0-2.3-.2-3.6z" fill="#ffffff" />
        <polygon points="10.8,14.2 14.5,12 10.8,9.8" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="5" />
      <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
    </svg>
  );
}
