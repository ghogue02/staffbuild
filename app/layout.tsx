// app/layout.tsx
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Build Day Workbook',
  description: 'AI Build Day staff workbook',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-900 min-h-screen text-white p-8">
          {children}
        </main>
      </body>
    </html>
  );
}