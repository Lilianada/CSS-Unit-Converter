import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { BuyMeCoffee } from "@/components/buy-me-coffee";
import StructuredData from "@/components/StructuredData";

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
  title: "CSS Unit Converter & Code Converter | LilysLab - Convert px, em, rem, vw, % and More",
  description:
    "Easily convert between CSS units (px, em, rem, vw, %, ch, pt, and more) with LilysLab's modern, intuitive converter for web developers and designers. Includes code conversion, tips, and best practices for responsive design.",
  keywords: [
    "CSS unit converter",
    "convert px to rem",
    "convert rem to em",
    "css code converter",
    "responsive design",
    "web development tools",
    "css units",
    "vw",
    "%",
    "ch",
    "pt",
    "css conversion",
    "Lilian Okeke",
    "Lilyslab",
    "Lily's Lab",
    "software engineer",
    "frontend tools",
    "css best practices"
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.png",
  },
  authors: [{ name: "Lilian Okeke", url: "https://lilyslab.xyz" }],
  alternates: {
    canonical: "https://lilyslab.xyz",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lilyslab.xyz",
    title: "CSS Unit Converter & Code Converter | LilysLab",
    description:
      "Easily convert between CSS units (px, em, rem, vw, %, ch, pt, and more) with LilysLab's modern, intuitive converter for web developers and designers. Includes code conversion, tips, and best practices for responsive design.",
    siteName: "Lily's Lab",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 1200,
        alt: "LilysLab CSS Unit Converter logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LilysLab",
    creator: "@LilysLab",
    title: "CSS Unit Converter & Code Converter | LilysLab",
    description:
      "Easily convert between CSS units (px, em, rem, vw, %, ch, pt, and more) with LilysLab's modern, intuitive converter for web developers and designers.",
    images: [
      {
        url: "/images/logo.png",
        alt: "LilysLab CSS Unit Converter logo",
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
      <head>
        <StructuredData />
      </head>
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
