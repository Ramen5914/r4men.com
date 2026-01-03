import type { Metadata } from 'next';
import { Doto, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import CardNav, { CardNavItem } from '@/components/CardNav';

const dotoSans = Doto({
  variable: '--font-doto',
  subsets: ['latin'],
  weight: ['500'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ramen',
  description: 'r4men.com',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items: CardNavItem[] = [
    {
      label: 'Projects',
      bgColor: '#D4FAFA',
      textColor: '#000',
      links: [
        {
          label: 'All Projects',
          href: '/projects',
          ariaLabel: 'All Projects',
        },
      ],
    },
    {
      label: 'Minecraft Mods',
      bgColor: '#C3EEFA',
      textColor: '#000',
      links: [
        {
          label: 'Create: Cobblemon Manufactory',
          href: '/mods/cobblemon-manufactory',
          ariaLabel: 'Cobblemon Manufactory',
        },
        {
          label: "Ramen's Additions",
          href: '/mods/ramens-additions',
          ariaLabel: "Ramen's Additions",
        },
      ],
    },
    {
      label: 'Contact',
      bgColor: '#AFD5F0',
      textColor: '#000',
      links: [
        {
          label: 'Email',
          href: 'mailto:omar@r4men.com',
          ariaLabel: 'email',
        },
      ],
    },
    {
      label: 'Support Me',
      bgColor: '#9DCAEB',
      textColor: '#000',
      links: [
        {
          label: 'GitHub Sponsors',
          href: 'https://github.com/sponsors/Ramen5914',
          ariaLabel: 'GitHub Sponsors',
        },
      ],
    },
  ];

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </head>
      <body
        className={`${dotoSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CardNav items={items} buttonTextColor="#000" buttonBgColor="#554181" baseColor="#fff" />
        {children}
      </body>
      <GoogleAnalytics gaId="G-9D5KGL0BKR" />
    </html>
  );
}
