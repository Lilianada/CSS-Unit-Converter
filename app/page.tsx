import UnitConverter from "@/components/unit-converter"

export const metadata = {
  title: "CSS Unit Converter | LilysLab",
  description: "Convert between px, em, rem, vw, %, and more with LilysLab's fast, modern CSS unit converter.",
  keywords: [
    "css unit converter",
    "px to rem",
    "rem to em",
    "css conversion",
    "responsive design",
    "web development tools"
  ],
  openGraph: {
    title: "CSS Unit Converter | LilysLab",
    description: "Convert between px, em, rem, vw, %, and more with LilysLab's fast, modern CSS unit converter.",
    url: "https://lilyslab.xyz/",
    type: "website",
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
    title: "CSS Unit Converter | LilysLab",
    description: "Convert between px, em, rem, vw, %, and more with LilysLab's fast, modern CSS unit converter.",
    images: [
      {
        url: "/images/logo.png",
        alt: "LilysLab CSS Unit Converter logo",
      },
    ],
  },
  alternates: {
    canonical: "https://lilyslab.xyz/",
  },
};

export default function Home() {
  return (
   
      <div className="p-4 h-full">
        <UnitConverter />
        </div>
  )
}
