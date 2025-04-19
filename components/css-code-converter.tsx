"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import CodeEditor from "./code-editor"

type CssUnit = "px" | "em" | "rem" | "%" | "vh" | "vw" | "vmin" | "vmax" | "pt" | "pc" | "in" | "cm" | "mm"

const CssCodeConverter = () => {
  const [cssCode, setCssCode] = useState<string>("")
  const [convertedCode, setConvertedCode] = useState<string>("")
  const [fromUnit, setFromUnit] = useState<CssUnit>("px")
  const [toUnit, setToUnit] = useState<CssUnit>("rem")
  const [copied, setCopied] = useState<boolean>(false)
  const [rootFontSize, setRootFontSize] = useState<number>(16)

  const units: CssUnit[] = ["px", "em", "rem", "%", "vh", "vw", "vmin", "vmax", "pt", "pc", "in", "cm", "mm"]

  useEffect(() => {
    if (cssCode) {
      const converted = convertCssCode(cssCode, fromUnit, toUnit)
      setConvertedCode(converted)
    } else {
      setConvertedCode("")
    }
  }, [cssCode, fromUnit, toUnit, rootFontSize])

  const convertCssCode = (code: string, from: CssUnit, to: CssUnit): string => {
    if (!code) return ""

    // Regular expression to find CSS values with units
    // This regex matches numbers followed by a unit
    const regex = new RegExp(`(\\d*\\.?\\d+)${from}`, "g")

    return code.replace(regex, (match, value) => {
      const numericValue = Number.parseFloat(value)
      const convertedValue = convertValue(numericValue, from, to)
      return `${convertedValue}${to}`
    })
  }

  const convertValue = (value: number, from: CssUnit, to: CssUnit): string => {
    // First convert to pixels as a base unit
    let valueInPx = value

    switch (from) {
      case "em":
        valueInPx = value * rootFontSize
        break
      case "rem":
        valueInPx = value * rootFontSize
        break
      case "%":
        valueInPx = (value / 100) * rootFontSize
        break
      case "vh":
        valueInPx = (value / 100) * window.innerHeight
        break
      case "vw":
        valueInPx = (value / 100) * window.innerWidth
        break
      case "vmin":
        valueInPx = (value / 100) * Math.min(window.innerWidth, window.innerHeight)
        break
      case "vmax":
        valueInPx = (value / 100) * Math.max(window.innerWidth, window.innerHeight)
        break
      case "pt":
        valueInPx = value * 1.33333
        break
      case "pc":
        valueInPx = value * 16
        break
      case "in":
        valueInPx = value * 96
        break
      case "cm":
        valueInPx = value * 37.795
        break
      case "mm":
        valueInPx = value * 3.7795
        break
    }

    // Then convert from pixels to the target unit
    let convertedValue: number

    switch (to) {
      case "px":
        convertedValue = valueInPx
        break
      case "em":
        convertedValue = valueInPx / rootFontSize
        break
      case "rem":
        convertedValue = valueInPx / rootFontSize
        break
      case "%":
        convertedValue = (valueInPx / rootFontSize) * 100
        break
      case "vh":
        convertedValue = (valueInPx / window.innerHeight) * 100
        break
      case "vw":
        convertedValue = (valueInPx / window.innerWidth) * 100
        break
      case "vmin":
        convertedValue = (valueInPx / Math.min(window.innerWidth, window.innerHeight)) * 100
        break
      case "vmax":
        convertedValue = (valueInPx / Math.max(window.innerWidth, window.innerHeight)) * 100
        break
      case "pt":
        convertedValue = valueInPx / 1.33333
        break
      case "pc":
        convertedValue = valueInPx / 16
        break
      case "in":
        convertedValue = valueInPx / 96
        break
      case "cm":
        convertedValue = valueInPx / 37.795
        break
      case "mm":
        convertedValue = valueInPx / 3.7795
        break
      default:
        convertedValue = valueInPx
    }

    // Format the value with appropriate decimal places and remove trailing zeros
    const formatted = convertedValue.toFixed(to === "px" || to === "pt" || to === "pc" ? 0 : 2)
    // Remove trailing zeros and decimal point if not needed
    return formatted.replace(/\.0+$/, "").replace(/(\.\d+?)0+$/, "$1")
  }

  const handleCssCodeChange = (value: string) => {
    setCssCode(value)
  }

  const handleFromUnitChange = (value: string) => {
    setFromUnit(value as CssUnit)
  }

  const handleToUnitChange = (value: string) => {
    setToUnit(value as CssUnit)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <Card className="h-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-6">
              <div className="mb-4">
              <Label htmlFor="from-unit" className="text-sm font-medium mb-2 block text-zinc-600 dark:text-zinc-400">
                From Unit
              </Label>
              <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                <SelectTrigger className="w-full bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                  {units.map((unit) => (
                    <SelectItem key={`from-${unit}`} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CodeEditor
              value={cssCode}
              onChange={handleCssCodeChange}
              placeholder="Paste your CSS code here..."
              aria-label="CSS code to convert"
            />
          </CardContent>
        </Card>

        <Card className="h-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-end mb-4">
               <div className="w-[70%]">
              <Label htmlFor="to-unit" className="text-sm font-medium mb-2 block text-zinc-600 dark:text-zinc-400">
                To Unit
              </Label>
              <Select value={toUnit} onValueChange={handleToUnitChange}>
                <SelectTrigger className="w-full bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                  {units.map((unit) => (
                    <SelectItem key={`to-${unit}`} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!convertedCode}
                className="flex items-center gap-1 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Copy converted CSS code"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="relative">
              <CodeEditor
                value={convertedCode}
                readOnly
                placeholder="Converted CSS will appear here..."
                aria-label="Converted CSS code"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

export default CssCodeConverter
