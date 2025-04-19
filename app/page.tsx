import UnitConverter from "@/components/unit-converter"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="main-noise-bg min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <UnitConverter />
        <Toaster />
      </main>
    </ThemeProvider>
  )
}
