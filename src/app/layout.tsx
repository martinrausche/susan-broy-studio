import type { Metadata } from 'next';
import '@/styles/theme.css';

export const metadata: Metadata = {
  title: 'BROY · Instagram Studio',
  description: 'Automatisierte Erstellung & Freigabe von Instagram Postings für Susan Broy',
  icons: {
    icon: '/broy-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
