"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import CodeEditor from "@/components/code-editor"

  // Define type for CSS units
  type CssUnit = 
    | "px" | "em" | "rem" | "%" 
    | "vh" | "vw" | "vmin" | "vmax" 
    | "pt" | "pc" | "in" | "cm" | "mm" | "q"
    | "ex" | "ch";
    
const CssCodeConverter = () => {
  const [cssCode, setCssCode] = useState<string>("")
  const [convertedCode, setConvertedCode] = useState<string>("")
  const [fromUnit, setFromUnit] = useState<CssUnit>("px")
  const [toUnit, setToUnit] = useState<CssUnit>("rem")
  const [copied, setCopied] = useState<boolean>(false)
  const [rootFontSize] = useState<number>(16)

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

  const convertValue = (value: number, from: CssUnit, to: CssUnit, context: {
    rootFontSize?: number;           // Browser default is typically 16px
    parentFontSize?: number;         // For em calculations
    targetElementWidth?: number;     // For % calculations when dealing with width
    targetElementHeight?: number;    // For % calculations when dealing with height
    propertyType?: 'width' | 'height' | 'font-size' | 'other'; // Context of what we're converting
  } = {}): string => {
    // Set defaults
    const rootFontSize = context.rootFontSize || 16;
    const parentFontSize = context.parentFontSize || rootFontSize;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920; // Default to common width
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080; // Default to common height
    
    // First convert to pixels as a base unit
    let valueInPx = value;
    
    switch (from) {
      case "px":
        valueInPx = value;
        break;
      case "em":
        valueInPx = value * parentFontSize;
        break;
      case "rem":
        valueInPx = value * rootFontSize;
        break;
      case "%":
        // Percentages are contextual
        if (context.propertyType === 'width' && context.targetElementWidth) {
          valueInPx = (value / 100) * context.targetElementWidth;
        } else if (context.propertyType === 'height' && context.targetElementHeight) {
          valueInPx = (value / 100) * context.targetElementHeight;
        } else if (context.propertyType === 'font-size') {
          valueInPx = (value / 100) * parentFontSize;
        } else {
          // Default behavior - assume it's relative to parent font size
          valueInPx = (value / 100) * parentFontSize;
        }
        break;
      case "vh":
        valueInPx = (value / 100) * viewportHeight;
        break;
      case "vw":
        valueInPx = (value / 100) * viewportWidth;
        break;
      case "vmin":
        valueInPx = (value / 100) * Math.min(viewportWidth, viewportHeight);
        break;
      case "vmax":
        valueInPx = (value / 100) * Math.max(viewportWidth, viewportHeight);
        break;
      case "pt":
        valueInPx = value * (96 / 72); // 1pt = 1/72 inch, and 1 inch = 96px
        break;
      case "pc":
        valueInPx = value * (96 / 6); // 1pc = 1/6 inch, and 1 inch = 96px
        break;
      case "in":
        valueInPx = value * 96; // 1in = 96px by CSS standard
        break;
      case "cm":
        valueInPx = value * (96 / 2.54); // 1cm = 96px/2.54
        break;
      case "mm":
        valueInPx = value * (96 / 25.4); // 1mm = 96px/25.4
        break;
      case "q":
        valueInPx = value * (96 / 101.6); // 1q = 1/4mm = 96px/101.6
        break;
      case "ex":
        valueInPx = value * (parentFontSize * 0.5); // Approximation: ex ≈ 0.5em
        break;
      case "ch":
        valueInPx = value * (parentFontSize * 0.5); // Approximation: ch ≈ 0.5em
        break;
    }
    
    // Then convert from pixels to the target unit
    let convertedValue: number;
    
    switch (to) {
      case "px":
        convertedValue = valueInPx;
        break;
      case "em":
        convertedValue = valueInPx / parentFontSize;
        break;
      case "rem":
        convertedValue = valueInPx / rootFontSize;
        break;
      case "%":
        // Percentages are contextual
        if (context.propertyType === 'width' && context.targetElementWidth) {
          convertedValue = (valueInPx / context.targetElementWidth) * 100;
        } else if (context.propertyType === 'height' && context.targetElementHeight) {
          convertedValue = (valueInPx / context.targetElementHeight) * 100;
        } else if (context.propertyType === 'font-size') {
          convertedValue = (valueInPx / parentFontSize) * 100;
        } else {
          // Default behavior - assume it's relative to parent font size
          convertedValue = (valueInPx / parentFontSize) * 100;
        }
        break;
      case "vh":
        convertedValue = (valueInPx / viewportHeight) * 100;
        break;
      case "vw":
        convertedValue = (valueInPx / viewportWidth) * 100;
        break;
      case "vmin":
        convertedValue = (valueInPx / Math.min(viewportWidth, viewportHeight)) * 100;
        break;
      case "vmax":
        convertedValue = (valueInPx / Math.max(viewportWidth, viewportHeight)) * 100;
        break;
      case "pt":
        convertedValue = valueInPx / (96 / 72);
        break;
      case "pc":
        convertedValue = valueInPx / (96 / 6);
        break;
      case "in":
        convertedValue = valueInPx / 96;
        break;
      case "cm":
        convertedValue = valueInPx / (96 / 2.54);
        break;
      case "mm":
        convertedValue = valueInPx / (96 / 25.4);
        break;
      case "q":
        convertedValue = valueInPx / (96 / 101.6);
        break;
      case "ex":
        convertedValue = valueInPx / (parentFontSize * 0.5);
        break;
      case "ch":
        convertedValue = valueInPx / (parentFontSize * 0.5);
        break;
      default:
        convertedValue = valueInPx;
    }
    
    // Format the value with appropriate decimal places
    let precision = 2;
    if (to === "px" || to === "pt" || to === "pc") {
      precision = 0;
    } else if (to === "in" || to === "cm" || to === "mm" || to === "q") {
      precision = 3;
    }
    
    // Format the value and remove trailing zeros
    const formatted = convertedValue.toFixed(precision);
    return formatted.replace(/\.0+$/, "").replace(/(\.\d+?)0+$/, "$1");
  };
  
  
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
      className="flex-1 flex flex-col space-y-6 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch flex-1">
        <Card className="h-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-6 flex flex-col flex-1 h-full">
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
            <div className="flex-1">
              <CodeEditor
                value={cssCode}
                onChange={handleCssCodeChange}
                placeholder="Paste your CSS code here..."
                aria-label="CSS code to convert"
                height="h-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-6 flex flex-col flex-1 h-full">
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
            <div className="relative flex-1">
              <CodeEditor
                value={convertedCode}
                readOnly
                placeholder="Converted CSS will appear here..."
                aria-label="Converted CSS code"
                height="h-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

export default CssCodeConverter
