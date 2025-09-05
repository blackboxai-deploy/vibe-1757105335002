import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RideSync - Smart Ride Sharing Platform",
  description: "Experience the future of transportation with AI-powered routing, social connections, and environmental consciousness. Join the revolution that's redefining how we move.",
  keywords: ["ride sharing", "transportation", "AI routing", "eco-friendly", "social rides"],
  authors: [{ name: "RideSync Team" }],
  creator: "RideSync",
  publisher: "RideSync",
  robots: "index, follow",
  openGraph: {
    title: "RideSync - Smart Ride Sharing Platform",
    description: "Experience the future of transportation with AI-powered routing, social connections, and environmental consciousness.",
    type: "website",
    locale: "en_US",
    siteName: "RideSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "RideSync - Smart Ride Sharing Platform",
    description: "Experience the future of transportation with AI-powered routing, social connections, and environmental consciousness.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-emerald-600/5" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Theme detection
              if (typeof window !== 'undefined') {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}