"use client"

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"
import { SquareCode, Sun, Moon, Info, MoreVertical } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import Link from "next/link"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import AboutDialog from "./about-dialog"

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  const pathname = usePathname();
  const isCodeConverter = pathname === "/css-code-converter";

  // Ensure theme toggle only renders client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      className="border-b border-zinc-200 dark:border-zinc-800 py-4 px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SquareCode className="h-6 w-6 text-zinc-800 dark:text-zinc-200" />
          <h1 className="text-base font-medium text-zinc-800 dark:text-zinc-200">CSS Unit Converter</h1>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          <Link href={isCodeConverter ? "/" : "/css-code-converter"}>
            <Button variant="outline" className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
              <span>{isCodeConverter ? "Unit Converter" : "Code Converter"}</span>
            </Button>
          </Link>
          <AboutDialog
            open={open}
            onOpenChange={setOpen}
            trigger={
              <Button variant="ghost" size="default" className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Button>
            }
          />
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              className="h-9 w-9 text-zinc-600 dark:text-zinc-300"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        <div className="flex md:hidden items-center">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MoreVertical className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content sideOffset={8} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg min-w-[180px] p-1 z-50">
              <DropdownMenu.Item asChild>
                <Link
                  href={isCodeConverter ? "/" : "/css-code-converter"}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <SquareCode className="h-4 w-4" />
                  {isCodeConverter ? "CSS Unit Converter" : "CSS Code Converter"}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 bg-zinc-200 dark:bg-zinc-800 h-px" />
              <DropdownMenu.Item asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 w-full"
                  onClick={handleThemeToggle}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 bg-zinc-200 dark:bg-zinc-800 h-px" />
              <DropdownMenu.Item asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 w-full"
                  onClick={() => setOpen(true)}
                >
                  <Info className="h-4 w-4" />
                  About
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          {/* About Dialog for mobile - keep mounted for accessibility */}
          <AboutDialog open={open} onOpenChange={setOpen} />
        </div>
      </div>
    </motion.header>
  )
}
