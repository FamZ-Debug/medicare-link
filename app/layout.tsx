import type { Metadata, Viewport } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '600', '800'],
    variable: '--font-outfit',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'MediCare Link - ดูแลคนที่คุณรัก',
    description: 'บริการดูแลสุขภาพครบวงจร เรียกรถพยาบาล นัดหมายแพทย์ ปรึกษาออนไลน์',
    manifest: '/medicare-link/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'MediCare Link',
    },
    formatDetection: {
        telephone: false,
    },
    icons: {
        icon: '/medicare-link/icon-192x192.svg',
        apple: '/medicare-link/icon-192x192.svg',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover', // Important for safe area insets
    themeColor: '#14b8a6',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={outfit.className} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
