import './globals.css';
import { Inter } from 'next/font/google';
import SupportChatBox from '../components/SupportChatBox';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Hans Travels | Premium Inter-City Bus Booking & Luxury Fleet',
  description: 'Book premium Volvo multi-axle and Mercedes luxury sleeper buses across India with Hans Travels. Safe, comfortable, and punctual inter-city transport.',
  keywords: 'Hans Travels, bus booking India, Indore bus booking, luxury sleeper bus, Volvo bus booking, intercity transport',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/assets/hans-logo.png" />
      </head>
      <body className="min-h-screen bg-white text-brand-charcoal antialiased flex flex-col font-sans selection:bg-blue-100 selection:text-slate-900">
        {children}
        <SupportChatBox />
      </body>
    </html>
  );
}
