import React from "react";

interface IconProps {
  className?: string;
}

export function TelegramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.031 0C5.385 0 0 5.386 0 12.032c0 2.123.553 4.195 1.605 6.02L0 24l6.115-1.603a11.98 11.98 0 0 0 5.915 1.551h.005c6.645 0 12.03-5.386 12.03-12.031 0-3.214-1.251-6.236-3.524-8.509A11.954 11.954 0 0 0 12.031 0zm0 21.92a9.89 9.89 0 0 1-5.043-1.381l-.362-.215-3.753.984 1.002-3.658-.236-.375a9.882 9.882 0 0 1-1.519-5.244c0-5.461 4.444-9.905 9.911-9.905 2.646 0 5.134 1.031 7.005 2.903a9.845 9.845 0 0 1 2.9 7.003c0 5.462-4.444 9.888-9.905 9.888zm5.434-7.41c-.298-.15-1.763-.87-2.037-.969-.273-.1-.472-.15-.67.15-.199.298-.77.969-.944 1.168-.174.199-.348.224-.646.075-.298-.15-1.258-.464-2.397-1.479-.886-.79-1.484-1.766-1.658-2.064-.174-.298-.018-.46.131-.608.134-.134.298-.348.447-.522.149-.174.199-.298.298-.497.1-.199.05-.373-.025-.522-.075-.15-.67-1.616-.919-2.212-.242-.58-.488-.502-.67-.511l-.572-.01c-.199 0-.522.075-.795.373-.273.298-1.044 1.02-1.044 2.486s1.069 2.884 1.218 3.083c.149.199 2.104 3.212 5.097 4.504.712.307 1.268.491 1.701.629.715.227 1.365.195 1.879.118.573-.086 1.763-.721 2.012-1.417.248-.696.248-1.293.174-1.417-.075-.124-.273-.199-.572-.348z" />
    </svg>
  );
}

export function MaxMessengerIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 1.5C6.201 1.5 1.5 5.95 1.5 11.44c0 2.77 1.196 5.274 3.128 7.078-.15 1.26-.64 2.616-1.158 3.495a.44.44 0 0 0 .465.654c1.737-.335 3.495-1.04 4.716-1.693 1.065.265 2.187.406 3.349.406 5.799 0 10.5-4.45 10.5-9.94S17.799 1.5 12 1.5zm4.83 13.69h-1.89v-4.29l-2.18 3.16a.92.92 0 0 1-1.52 0L9.06 10.9v4.29H7.17V8.25c0-.58.69-.89 1.12-.48l3.71 4.51 3.71-4.51c.43-.41 1.12-.1 1.12.48v6.94z" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

export function ChatBubbleIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
