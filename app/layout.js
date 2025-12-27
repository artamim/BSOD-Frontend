"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './styles.scss';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/list', label: 'List' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
//{ href: '/add', label: 'Add' },
export default function RootLayout({ children }) {
    const pathname = usePathname();
    const isShortsPage = pathname.startsWith('/shorts/');
    return (
        <html lang="en">
        <body>
            {!isShortsPage && (
            <nav className='nav'>
            <ul className='links'>
                {navLinks.map((link) => {
                const isActive = 
                    pathname === link.href || 
                    (link.href !== '/' && pathname.startsWith(link.href));

                return (
                    <li key={link.href}>
                    <Link 
                        href={link.href}
                        style={isActive ? { fontWeight: 'bold' } : {}}
                        aria-current={isActive ? 'page' : undefined}
                        className="link"
                    >
                        {link.label}
                    </Link>
                    </li>
                );
                })}
            </ul>
            </nav>
            )}
            <main>{children}</main>
        </body>
        </html>
    );
}