'use client';

import CardNav, { CardNavItem } from '@/components/CardNav';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const items: CardNavItem[] = [
    {
      label: 'Projects',
      bgColor: '#533599',
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
      bgColor: '#5700ff',
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
  ];

  return (
    <>
      <CardNav items={items} buttonTextColor="#000" buttonBgColor="#554181" baseColor="#fff" />
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start starting:bg-orange-500 transition-colors duration-500">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
            <li className="mb-2 tracking-[-.01em]">
              Get started by editing{' '}
              <code className="bg-black/5 dark:bg-white/6 font-mono font-semibold px-1 py-0.5 rounded">
                src/app/page.tsx
              </code>
              .
            </li>
            <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
            <li className="tracking-[-.01em]">
              Check out my{' '}
              <Link
                href={'/mods'}
                className="bg-black/5 dark:bg-white/6 font-mono font-semibold px-1 py-0.5 rounded"
              >
                mods
              </Link>
            </li>
            <li className="tracking-[-.01em]">
              Check out my{' '}
              <Link
                href={'/projects'}
                className="bg-black/5 dark:bg-white/6 font-mono font-semibold px-1 py-0.5 rounded"
              >
                projects
              </Link>
            </li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-black/8 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-39.5"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
