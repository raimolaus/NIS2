import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NIS2 Abimees - AI-toega infoturbe ja vastavuse juhtimise platvorm',
  description: 'AI-toega veebipõhine platvorm, mis aitab väikestel ja keskmistel organisatsioonidel täita NIS2 direktiivi nõudeid.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="et">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
