import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduGraph-AI · Innovation Case Competition CDW 2026 (UNAIR)',
  description: 'Sistem Pembelajaran Adaptif Berbasis Graph-Guided RAG dan Deep Knowledge Tracing untuk Mengatasi Mispersepsi Prasyarat STEM di Perguruan Tinggi Indonesia',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="bg-[#090d16] text-slate-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
