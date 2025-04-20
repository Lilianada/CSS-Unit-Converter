"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Repeat } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

type CssUnit = "px" | "rem" | "vh" | "vw" | "vmin" | "vmax" | "pt" | "pc" | "in" | "cm" | "mm"

const units: { value: CssUnit; label: string }[] = [
  { value: "px", label: "Pixels (px)" },
  { value: "rem", label: "Root em (rem)" },
  { value: "vh", label: "Viewport Height (vh)" },
  { value: "vw", label: "Viewport Width (vw)" },
  { value: "vmin", label: "Viewport Min (vmin)" },
  { value: "vmax", label: "Viewport Max (vmax)" },
  { value: "pt", label: "Points (pt)" },
  { value: "pc", label: "Picas (pc)" },
  { value: "in", label: "Inches (in)" },
  { value: "cm", label: "Centimeters (cm)" },
  { value: "mm", label: "Millimeters (mm)" },
]

export default function UnitConverter() {
  const [input, setInput] = useState("")
  const [from, setFrom] = useState<CssUnit>("px")
  const [to, setTo] = useState<CssUnit>("rem")
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input || isNaN(Number(input))) {
      setResult("")
      return
    }

    const inputValue = parseFloat(input)
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
    const rootFontSize = 16 // Standard browser default

    // Convert to pixels first
    let pxValue: number
    switch (from) {
      case "px": pxValue = inputValue; break
      case "rem": pxValue = inputValue * rootFontSize; break
      case "vh": pxValue = (inputValue / 100) * viewportHeight; break
      case "vw": pxValue = (inputValue / 100) * viewportWidth; break
      case "vmin": pxValue = (inputValue / 100) * Math.min(viewportWidth, viewportHeight); break
      case "vmax": pxValue = (inputValue / 100) * Math.max(viewportWidth, viewportHeight); break
      case "pt": pxValue = inputValue * (96 / 72); break
      case "pc": pxValue = inputValue * 16; break
      case "in": pxValue = inputValue * 96; break
      case "cm": pxValue = inputValue * (96 / 2.54); break
      case "mm": pxValue = inputValue * (96 / 25.4); break
      default: pxValue = inputValue
    }

    // Convert from pixels to target unit
    let finalValue: number
    switch (to) {
      case "px": finalValue = pxValue; break
      case "rem": finalValue = pxValue / rootFontSize; break
      case "vh": finalValue = (pxValue / viewportHeight) * 100; break
      case "vw": finalValue = (pxValue / viewportWidth) * 100; break
      case "vmin": finalValue = (pxValue / Math.min(viewportWidth, viewportHeight)) * 100; break
      case "vmax": finalValue = (pxValue / Math.max(viewportWidth, viewportHeight)) * 100; break
      case "pt": finalValue = pxValue * (72 / 96); break
      case "pc": finalValue = pxValue / 16; break
      case "in": finalValue = pxValue / 96; break
      case "cm": finalValue = (pxValue / 96) * 2.54; break
      case "mm": finalValue = (pxValue / 96) * 25.4; break
      default: finalValue = pxValue
    }

    // Format result (remove trailing zeros)
    setResult(finalValue.toFixed(6).replace(/\.?0+$/, ''))
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(`${result}${to}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
    setResult("")
  }

  return (
    <motion.div
      className="flex-1 flex flex-col space-y-6 items-center justify-center h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
       <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="mb-4" />
      <Card className="w-full max-w-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-0 dark:shadow-lg shadow rounded-2xl">
        <CardContent className="p-8">
          <form
            onSubmit={e => {
              e.preventDefault()
              convert()
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-base font-medium text-zinc-900 dark:text-zinc-200 mb-2">Input Value</label>
              <Input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:ring-2 focus:ring-zinc-700 rounded-md h-12"
                placeholder="Enter value"
                autoFocus
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">From Unit</label>
                <Select value={from} onValueChange={v => setFrom(v as CssUnit)}>
                  <SelectTrigger className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                    {units.map(u => (
                      <SelectItem key={u.value} value={u.value}>
                        {u.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full p-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={handleSwap}
                aria-label="Swap units"
              >
                <Repeat className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              </Button>
              <div className="flex-1">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">To Unit</label>
                <Select value={to} onValueChange={v => setTo(v as CssUnit)}>
                  <SelectTrigger className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                    {units.map(u => (
                      <SelectItem key={u.value} value={u.value}>
                        {u.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-1">Result</label>
              <Input
                value={result ? `${result}${to}` : ""}
                readOnly
                placeholder="Result"
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-md h-12"
              />
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <Button
                type="submit"
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold px-6 py-2 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow"
              >
                Convert
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 px-6 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={handleCopy}
                disabled={!result}
              >
                {copied ? "Copied!" : "Copy"}
                <Copy className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}