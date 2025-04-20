"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Repeat, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type CssUnit = "px" | "em" | "rem" | "%" | "vh" | "vw" | "vmin" | "vmax" | "pt" | "pc" | "in" | "cm" | "mm" | "svh" | "lvh" | "dvh" | "cqw" | "cqh" | "ex" | "ch"

const units: { value: CssUnit; label: string; warning?: string }[] = [
  { value: "px", label: "Pixels (px)" },
  { value: "em", label: "Ems (em)", warning: "Depends on parent element's font-size" },
  { value: "rem", label: "Rems (rem)" },
  { value: "%", label: "Percent (%)", warning: "Requires container context" },
  { value: "vh", label: "Viewport Height (vh)" },
  { value: "vw", label: "Viewport Width (vw)" },
  { value: "vmin", label: "Viewport Min (vmin)" },
  { value: "vmax", label: "Viewport Max (vmax)" },
  { value: "svh", label: "Small Viewport Height (svh)" },
  { value: "lvh", label: "Large Viewport Height (lvh)" },
  { value: "dvh", label: "Dynamic Viewport Height (dvh)" },
  { value: "cqw", label: "Container Query Width (cqw)", warning: "Requires container context" },
  { value: "cqh", label: "Container Query Height (cqh)", warning: "Requires container context" },
  { value: "ex", label: "X-Height (ex)", warning: "Depends on font metrics" },
  { value: "ch", label: "Character Width (ch)", warning: "Depends on font metrics" },
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
  const [error, setError] = useState<string | null>(null)
  const [rootFontSize, setRootFontSize] = useState(16)
  const [containerSize, setContainerSize] = useState({ width: 1000, height: 800 })

  // Update viewport dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setContainerSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const convert = () => {
    setError(null)
    
    if (!input || isNaN(Number(input))) {
      setError("Please enter a valid number")
      setResult("")
      return
    }
    
    const inputValue = parseFloat(input)
    
    try {
      // Convert from source unit to pixels (base unit)
      let valueInPx = convertToPx(inputValue, from)
      
      // Convert from pixels to target unit
      let finalValue = convertFromPx(valueInPx, to)
      
      // Format result
      setResult(cleanNumber(finalValue))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setResult("")
    }
  }

  const convertToPx = (value: number, unit: CssUnit): number => {
    switch (unit) {
      case "px": return value
      case "em": 
      case "rem": return value * rootFontSize
      case "%": throw new Error("Percentage requires container context")
      case "vh": return (value / 100) * containerSize.height
      case "vw": return (value / 100) * containerSize.width
      case "vmin": return (value / 100) * Math.min(containerSize.width, containerSize.height)
      case "vmax": return (value / 100) * Math.max(containerSize.width, containerSize.height)
      case "svh": return (value / 100) * (containerSize.height * 0.9) // Approximation
      case "lvh": return (value / 100) * (containerSize.height * 1.1) // Approximation
      case "dvh": return (value / 100) * containerSize.height // Same as vh in this implementation
      case "cqw": return (value / 100) * containerSize.width // Requires container context
      case "cqh": return (value / 100) * containerSize.height // Requires container context
      case "ex": return value * (rootFontSize / 2) // Approximation (x-height ≈ 0.5em)
      case "ch": return value * (rootFontSize / 2.5) // Approximation (character width ≈ 0.4em)
      case "pt": return value * (96 / 72) // 1pt = 1/72in, 1in = 96px
      case "pc": return value * 16 // 1pc = 16px
      case "in": return value * 96 // 1in = 96px
      case "cm": return value * (96 / 2.54) // 1cm = 0.3937in
      case "mm": return value * (96 / 25.4) // 1mm = 0.03937in
      default: throw new Error(`Unsupported unit: ${unit}`)
    }
  }

  const convertFromPx = (pxValue: number, targetUnit: CssUnit): number => {
    switch (targetUnit) {
      case "px": return pxValue
      case "em": 
      case "rem": return pxValue / rootFontSize
      case "%": throw new Error("Percentage requires container context")
      case "vh": return (pxValue / containerSize.height) * 100
      case "vw": return (pxValue / containerSize.width) * 100
      case "vmin": return (pxValue / Math.min(containerSize.width, containerSize.height)) * 100
      case "vmax": return (pxValue / Math.max(containerSize.width, containerSize.height)) * 100
      case "svh": return (pxValue / (containerSize.height * 0.9)) * 100
      case "lvh": return (pxValue / (containerSize.height * 1.1)) * 100
      case "dvh": return (pxValue / containerSize.height) * 100
      case "cqw": return (pxValue / containerSize.width) * 100
      case "cqh": return (pxValue / containerSize.height) * 100
      case "ex": return pxValue / (rootFontSize / 2)
      case "ch": return pxValue / (rootFontSize / 2.5)
      case "pt": return pxValue * (72 / 96)
      case "pc": return pxValue / 16
      case "in": return pxValue / 96
      case "cm": return (pxValue / 96) * 2.54
      case "mm": return (pxValue / 96) * 25.4
      default: throw new Error(`Unsupported unit: ${targetUnit}`)
    }
  }

  const cleanNumber = (num: number): string => {
    return num.toFixed(6).replace(/\.?0+$/, '')
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
    setError(null)
  }

  const getUnitWarning = (unit: CssUnit): string | undefined => {
    return units.find(u => u.value === unit)?.warning
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-xl">
        <CardContent className="p-6 space-y-6">
          {/* Root Font Size Adjustment */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              Root Font Size (for rem)
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Change this if your CSS uses a different root font-size
                </TooltipContent>
              </Tooltip>
            </label>
            <Input
              type="number"
              value={rootFontSize}
              onChange={(e) => setRootFontSize(Number(e.target.value))}
              min="1"
              step="1"
            />
          </div>

          {/* Container Size (for % and cq units) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                Container Width
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Set the assumed container width for % and cqw conversions
                  </TooltipContent>
                </Tooltip>
              </label>
              <Input
                type="number"
                value={
