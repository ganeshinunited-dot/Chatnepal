import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: "ChatNP — Nepal's Contextual AI Platform",
  description:
    "ChatNP is a working prototype of a Nepal-first AI assistant, powered by KarkTech's NP1 MONI model — tuned for Nepali language, culture, and local context.",
  alternates: { canonical: 'https://karktech.tech/chat' },
  manifest: '/chat/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'ChatNP',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    apple: [
      {
        url: '/chat/app-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
