"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Repeat } from "lucide-react"

type CssUnit = "px" | "em" | "rem" | "%" | "vh" | "vw" | "vmin" | "vmax" | "pt" | "pc" | "in" | "cm" | "mm"

const units: { value: CssUnit; label: string }[] = [
  { value: "px", label: "Pixels (px)" },
  { value: "em", label: "Ems (em)" },
  { value: "rem", label: "Rems (rem)" },
  { value: "%", label: "Percent (%)" },
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

  // Dummy conversion for demo (replace with your logic)
  const convert = () => {
    if (!input || isNaN(Number(input))) {
      setResult("")
      return
    }
    // Simple px to rem conversion for demo
    if (from === "px" && to === "rem") setResult((Number(input) / 16).toString())
    else if (from === "rem" && to === "px") setResult((Number(input) * 16).toString())
    else setResult(input)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
    setResult("")
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
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
                value={result}
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
    </div>
  )
}