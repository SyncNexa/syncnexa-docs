import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.syncnexa.co'),
  title: {
    default: 'SyncNexa Documentation — Developer Guides & API Reference',
    template: '%s | SyncNexa Docs',
  },
  description:
    'Comprehensive developer documentation for SyncNexa: Zero-knowledge student verification, SyncID Business Portal, Verification Portal, and REST APIs.',
  keywords: [
    'SyncNexa',
    'SyncID',
    'Documentation',
    'API Reference',
    'Zero Knowledge Proof',
    'Student Verification',
    'Business Portal',
    'Verification Portal',
    'OAuth 2.0',
    'Webhooks',
  ],
  authors: [{ name: 'SyncNexa Limited', url: 'https://syncnexa.co' }],
  creator: 'SyncNexa Limited',
  publisher: 'SyncNexa Limited',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docs.syncnexa.co',
    siteName: 'SyncNexa Docs',
    title: 'SyncNexa Documentation — Developer Guides & API Reference',
    description:
      'Official documentation for zero-knowledge student verification, Business Portal integrations, and Verification Portal workflows.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'SyncNexa Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@SyncNexa',
    creator: '@SyncNexa',
    title: 'SyncNexa Documentation',
    description: 'Developer documentation for SyncNexa and SyncID.',
    images: ['/android-chrome-512x512.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={poppins.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('syncnexa-docs-theme');
                if (savedTheme === 'light' || savedTheme === 'dark') {
                  document.documentElement.setAttribute('data-theme', savedTheme);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
