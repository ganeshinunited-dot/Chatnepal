import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json(
    {
      name: 'ChatNP',
      short_name: 'ChatNP',
      description: "ChatNP is KarkTech's Nepal-first contextual AI assistant.",
      id: '/chat',
      start_url: '/chat',
      scope: '/chat',
      display: 'standalone',
      orientation: 'any',
      background_color: '#0f172a',
      theme_color: '#2563eb',
      categories: ['productivity', 'utilities', 'education'],
      icons: [
        {
          src: '/chat/app-icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/chat/app-icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/manifest+json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
}
