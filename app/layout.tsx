import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import { BuyMeCoffee } from "@/components/buy-me-coffee";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CSS Unit and Code Converter",
  description: "A modern, intuitive tool for web developers and designers to convert between different CSS units with ease.",
  keywords: ["Lilian Okeke", "Lilyslab", "Lily's Lab", "css", "software engineer", "css unit converter", "css units", "css code converter", "css code conversion"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lilyslab.xyz",
    title: "Lily's Lab",
    description: "Software engineer, product manager, and digital creator",
    siteName: "Lily's Lab",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 1200,
        alt: "Lily's Lab",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex h-screen flex-col bg-background dark:bg-[#111] transition-colors duration-300 gap-4 main-noise-bg">
            <Header />
            {children}
            <Toaster />
            <Footer />
          </main>
        <BuyMeCoffee />
        </ThemeProvider>
      </body>
    </html>
  );
}
