import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ChatNP — Nepal's Contextual AI Platform",
  description:
    "ChatNP is a working prototype of a Nepal-first AI assistant, powered by KarkTech's NP1 MONI model — tuned for Nepali language, culture, and local context.",
  alternates: { canonical: 'https://karktech.tech/chat' },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
