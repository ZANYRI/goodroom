import React from "react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowUpRight,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconCheck,
  IconChevronDown,
  IconCircleCheck,
  IconClock24,
  IconDeviceGamepad2,
  IconGlassFull,
  IconMapPin,
  IconMenu2,
  IconMessageCircle,
  IconMessageDots,
  IconMicrophone2,
  IconMinus,
  IconMoon,
  IconPhone,
  IconPlus,
  IconShieldCheck,
  IconSparkles,
  IconStarFilled,
  IconSun,
  IconUsers,
  IconWifi,
  IconX,
} from "@tabler/icons-react";

interface IconProps {
  className?: string;
}

export function TelegramIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconBrandTelegram className={className} stroke={1.9} aria-hidden="true" />;
}

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconBrandWhatsapp className={className} stroke={1.9} aria-hidden="true" />;
}

export function MaxMessengerIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconMessageDots className={className} stroke={1.9} aria-hidden="true" />;
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconPhone className={className} stroke={1.9} aria-hidden="true" />;
}

export function ChevronDownIcon({ className = "h-4 w-4" }: IconProps) {
  return <IconChevronDown className={className} stroke={2} aria-hidden="true" />;
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconX className={className} stroke={2} aria-hidden="true" />;
}

export function MenuIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconMenu2 className={className} stroke={2} aria-hidden="true" />;
}

export function ArrowLeftIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconArrowLeft className={className} stroke={2} aria-hidden="true" />;
}

export function ArrowRightIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconArrowRight className={className} stroke={2} aria-hidden="true" />;
}

export function ArrowUpIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconArrowUp className={className} stroke={2} aria-hidden="true" />;
}

export function ArrowUpRightIcon({ className = "h-4 w-4" }: IconProps) {
  return <IconArrowUpRight className={className} stroke={2} aria-hidden="true" />;
}

export function CheckCircleIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconCircleCheck className={className} stroke={1.9} aria-hidden="true" />;
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return <IconCheck className={className} stroke={2.2} aria-hidden="true" />;
}

export function ChatBubbleIcon({ className = "h-6 w-6" }: IconProps) {
  return <IconMessageCircle className={className} stroke={1.9} aria-hidden="true" />;
}

export function PlusIcon({ className = "h-4 w-4" }: IconProps) {
  return <IconPlus className={className} stroke={2.1} aria-hidden="true" />;
}

export function MinusIcon({ className = "h-4 w-4" }: IconProps) {
  return <IconMinus className={className} stroke={2.1} aria-hidden="true" />;
}

export function SunIcon({ className = "h-4 w-4" }: IconProps) {
  return <IconSun className={className} stroke={1.9} aria-hidden="true" />;
}

export function MoonIcon({ className = "h-4 w-4" }: IconProps) {
  return <IconMoon className={className} stroke={1.9} aria-hidden="true" />;
}

export function MapPinIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconMapPin className={className} stroke={1.8} aria-hidden="true" />;
}

export function Clock24Icon({ className = "h-5 w-5" }: IconProps) {
  return <IconClock24 className={className} stroke={1.8} aria-hidden="true" />;
}

export function UsersIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconUsers className={className} stroke={1.8} aria-hidden="true" />;
}

export function GlassIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconGlassFull className={className} stroke={1.8} aria-hidden="true" />;
}

export function GamepadIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconDeviceGamepad2 className={className} stroke={1.8} aria-hidden="true" />;
}

export function MicrophoneIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconMicrophone2 className={className} stroke={1.8} aria-hidden="true" />;
}

export function WifiIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconWifi className={className} stroke={1.8} aria-hidden="true" />;
}

export function ShieldIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconShieldCheck className={className} stroke={1.8} aria-hidden="true" />;
}

export function SparklesIcon({ className = "h-5 w-5" }: IconProps) {
  return <IconSparkles className={className} stroke={1.8} aria-hidden="true" />;
}

export function StarFilledIcon({ className = "h-4 w-4" }: IconProps) {
  return <IconStarFilled className={className} aria-hidden="true" />;
}
