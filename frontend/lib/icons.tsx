import React from 'react';

interface SocialIconProps {
    className?: string;
    size?: number;
    color?: string;
}

export const FacebookIcon: React.FC<SocialIconProps> = ({
    className = '',
    size = 24,
    color = 'currentColor'
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-facebook ${className}`}
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
    );
};

export const TwitterIcon: React.FC<SocialIconProps> = ({
    className = '',
    size = 24,
    color = 'currentColor'
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-twitter ${className}`}
        >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
    );
};

export const InstagramIcon: React.FC<SocialIconProps> = ({
    className = '',
    size = 24,
    color = 'currentColor'
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-instagram ${className}`}
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    );
};

export const LinkedInIcon: React.FC<SocialIconProps> = ({
    className = '',
    size = 24,
    color = 'currentColor'
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-linkedin ${className}`}
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
        </svg>
    );
};

export const YouTubeIcon: React.FC<SocialIconProps> = ({
    className = '',
    size = 24,
    color = 'currentColor'
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-youtube ${className}`}
        >
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
    );
};

export const TikTokIcon: React.FC<SocialIconProps> = ({
    className = '',
    size = 24,
    color = 'currentColor'
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-tiktok ${className}`}
        >
            <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm10-9v4.5a6 6 0 0 1-4.5 1.5 6 6 0 0 1-6-6h4.5A1.5 1.5 0 0 0 15 1.5h4.5z" />
            <path d="M19 3v12a6 6 0 0 1-6 6v-4.5a1.5 1.5 0 0 0 1.5-1.5V6c0-1.66-1.34-3-3-3h-4.5" />
        </svg>
    );
};

export const WeChatIcon: React.FC<SocialIconProps> = ({
    className = '',
    size = 24,
    color = 'currentColor'
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-wechat ${className}`}
        >
            <path d="M9.5 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            <path d="M14.5 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            <path d="M15.5 14c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            <path d="M10.5 14c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            <path d="M6.69 4.92C3 5.7 0 8.92 0 12.92c0 2.52 1.23 4.8 3.16 6.34.16.13.31.27.47.39l-.28 1.69c-.09.52.43.93.91.7l1.91-.91c.34.09.69.16 1.05.21 2.31.33 4.54-.1 6.18-1.09" />
            <path d="M24 17.92c0-4-4.08-7.23-9.08-6.23-4.08.82-7.08 4.04-7.08 8.04 0 4.43 4.49 7.92 10 6.92.39-.07.77-.16 1.14-.27l1.91.91c.48.23 1-.18.91-.7l-.28-1.69c1.93-1.39 3.16-3.67 3.16-6.19.31-.26-.37-.53-.68-.79z" />
        </svg>
    );
};

export const WeiboIcon: React.FC<SocialIconProps> = ({
    className = '',
    size = 24,
    color = 'currentColor'
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-weibo ${className}`}
        >
            <path d="M10 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            <path d="M17.5 7.5v.01" />
            <path d="M15 4.5c3.3 0 6 2.7 6 6v3c0 3.3-2.7 6-6 6H9c-3.3 0-6-2.7-6-6v-3c0-3.3 2.7-6 6-6" />
            <path d="M7 13.5c0 2.5 2.5 4.5 5.5 4.5s5.5-2 5.5-4.5c0-2-3-3-3-3s1-2-1-2c-1 0-1.5 1-1.5 1s-2.5-.5-5.5 3.5z" />
        </svg>
    );
};

export function getIcon(icon: string) {
    switch (icon) {
        case 'facebook':
            return <FacebookIcon />;
        case 'twitter':
            return <TwitterIcon />;
        case 'instagram':
            return <InstagramIcon />;
        case 'linkedin':
            return <LinkedInIcon />;
        case 'youtube':
            return <YouTubeIcon />;
        case 'tiktok':
            return <TikTokIcon />;
        case 'wechat':
            return <WeChatIcon />;
        case 'weibo':
            return <WeiboIcon />;
    }
}

// 社交图标集合组件
export interface SocialIconsProps {
    size?: number;
    color?: string;
    className?: string;
    iconClassName?: string;
    showFacebook?: boolean;
    showTwitter?: boolean;
    showInstagram?: boolean;
    showLinkedIn?: boolean;
    showYouTube?: boolean;
    showTikTok?: boolean;
    showWeChat?: boolean;
    showWeibo?: boolean;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
    size = 24,
    color = 'currentColor',
    className = '',
    iconClassName = '',
    showFacebook = true,
    showTwitter = true,
    showInstagram = true,
    showLinkedIn = true,
    showYouTube = true,
    showTikTok = true,
    showWeChat = true,
    showWeibo = true,
}) => {
    return (
        <div className={`social-icons-container flex gap-4 ${className}`}>
            {showFacebook && <FacebookIcon size={size} color={color} className={iconClassName} />}
            {showTwitter && <TwitterIcon size={size} color={color} className={iconClassName} />}
            {showInstagram && <InstagramIcon size={size} color={color} className={iconClassName} />}
            {showLinkedIn && <LinkedInIcon size={size} color={color} className={iconClassName} />}
            {showYouTube && <YouTubeIcon size={size} color={color} className={iconClassName} />}
            {showTikTok && <TikTokIcon size={size} color={color} className={iconClassName} />}
            {showWeChat && <WeChatIcon size={size} color={color} className={iconClassName} />}
            {showWeibo && <WeiboIcon size={size} color={color} className={iconClassName} />}
        </div>
    );
};
