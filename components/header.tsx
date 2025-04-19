"use client"

import { useState, useEffect } from "react"
import { SquareCode, Sun, Moon, Info } from "lucide-react"
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

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  // Ensure theme toggle only renders client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

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

        <div className="flex items-center gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="default" className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <DialogHeader>
                <DialogTitle className="text-zinc-800 dark:text-zinc-200">About CSS Unit Converter</DialogTitle>
                <DialogDescription className="text-zinc-600 dark:text-zinc-400 pt-4 space-y-3">
                  <p>
                    CSS Unit Converter is a tool designed to help web developers and designers easily convert between
                    different CSS units.
                  </p>
                  <p>
                    It solves the problem of manually calculating conversions between units like pixels, ems, rems, and
                    viewport units, which can be time-consuming and error-prone.
                  </p>
                  <p>
                    Built for front-end developers, UI/UX designers, and anyone working with CSS who needs quick and
                    accurate unit conversions.
                  </p>
                  <p>
                    To make a contribution, fork the <a href="https://github.com/lilianada/css-unit-converter" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100">github repository</a>.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

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
      </div>
    </motion.header>
  )
}
