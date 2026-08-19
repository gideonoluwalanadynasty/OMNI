import React from 'react';
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
  Pin,
  Send,
  Camera,
  AtSign,
  Share2,
  Video
} from 'lucide-react';
import { SocialPlatform } from '../../../types/social_hub';

interface OmniSocialPlatformBadgeProps {
  platform: SocialPlatform;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PLATFORM_METADATA: Record<
  SocialPlatform,
  {
    name: string;
    color: string;
    bg: string;
    border: string;
    officialApi: string;
    maxChars: number;
    icon: React.FC<{ className?: string }>;
  }
> = {
  x: {
    name: 'X (Twitter)',
    color: 'text-stone-200',
    bg: 'bg-stone-800',
    border: 'border-stone-700',
    officialApi: 'Twitter API v2',
    maxChars: 280,
    icon: Twitter
  },
  linkedin: {
    name: 'LinkedIn',
    color: 'text-blue-400',
    bg: 'bg-blue-950/80',
    border: 'border-blue-800/80',
    officialApi: 'Community Management API',
    maxChars: 3000,
    icon: Linkedin
  },
  instagram: {
    name: 'Instagram',
    color: 'text-pink-400',
    bg: 'bg-pink-950/80',
    border: 'border-pink-800/80',
    officialApi: 'Meta Graph API v20.0',
    maxChars: 2200,
    icon: Instagram
  },
  tiktok: {
    name: 'TikTok',
    color: 'text-cyan-400',
    bg: 'bg-cyan-950/80',
    border: 'border-cyan-800/80',
    officialApi: 'TikTok Content Posting API',
    maxChars: 2200,
    icon: Video
  },
  youtube: {
    name: 'YouTube',
    color: 'text-red-400',
    bg: 'bg-red-950/80',
    border: 'border-red-800/80',
    officialApi: 'YouTube Data API v3',
    maxChars: 5000,
    icon: Youtube
  },
  threads: {
    name: 'Threads',
    color: 'text-purple-400',
    bg: 'bg-purple-950/80',
    border: 'border-purple-800/80',
    officialApi: 'Threads Publishing API',
    maxChars: 500,
    icon: AtSign
  },
  facebook: {
    name: 'Facebook',
    color: 'text-blue-500',
    bg: 'bg-blue-950/80',
    border: 'border-blue-700/80',
    officialApi: 'Meta Graph API v20.0',
    maxChars: 63206,
    icon: Facebook
  },
  pinterest: {
    name: 'Pinterest',
    color: 'text-red-500',
    bg: 'bg-rose-950/80',
    border: 'border-rose-800/80',
    officialApi: 'Pinterest API v5',
    maxChars: 500,
    icon: Pin
  },
  telegram: {
    name: 'Telegram',
    color: 'text-sky-400',
    bg: 'bg-sky-950/80',
    border: 'border-sky-800/80',
    officialApi: 'Telegram Bot API v7.4',
    maxChars: 4096,
    icon: Send
  },
  whatsapp: {
    name: 'WhatsApp Business',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/80',
    border: 'border-emerald-800/80',
    officialApi: 'WhatsApp Cloud API',
    maxChars: 4096,
    icon: MessageCircle
  },
  snapchat: {
    name: 'Snapchat',
    color: 'text-amber-400',
    bg: 'bg-amber-950/80',
    border: 'border-amber-800/80',
    officialApi: 'Snap Marketing API v3',
    maxChars: 250,
    icon: Camera
  }
};

export const OmniSocialPlatformBadge: React.FC<OmniSocialPlatformBadgeProps> = ({
  platform,
  showName = true,
  size = 'md',
  className = ''
}) => {
  const meta = PLATFORM_METADATA[platform] || {
    name: platform,
    color: 'text-stone-300',
    bg: 'bg-stone-800',
    border: 'border-stone-700',
    officialApi: 'REST API',
    maxChars: 2000,
    icon: Share2
  };

  const Icon = meta.icon;

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  const textSizes = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-xs px-2.5 py-1'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border font-semibold ${meta.bg} ${meta.border} ${meta.color} ${textSizes[size]} ${className}`}
    >
      <Icon className={iconSizes[size]} />
      {showName && <span>{meta.name}</span>}
    </span>
  );
};
