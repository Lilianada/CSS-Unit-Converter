export const metadata = {
  title: "CSS Code Converter | LilysLab",
  description: "Convert CSS code and units (px, em, rem, vw, %, etc.) instantly with LilysLab's advanced CSS code converter tool.",
  keywords: [
    "css code converter",
    "css unit converter",
    "convert css",
    "px to rem",
    "rem to em",
    "css code conversion",
    "responsive design"
  ],
  openGraph: {
    title: "CSS Code Converter | LilysLab",
    description: "Convert CSS code and units (px, em, rem, vw, %, etc.) instantly with LilysLab's advanced CSS code converter tool.",
    url: "https://lilyslab.xyz/css-code-converter",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 1200,
        alt: "LilysLab CSS Code Converter logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Code Converter | LilysLab",
    description: "Convert CSS code and units (px, em, rem, vw, %, etc.) instantly with LilysLab's advanced CSS code converter tool.",
    images: [
      {
        url: "/images/logo.png",
        alt: "LilysLab CSS Code Converter logo",
      },
    ],
  },
  alternates: {
    canonical: "https://lilyslab.xyz/css-code-converter",
  },
};

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import CodeEditor from "@/components/code-editor"

type CssUnit = "px" | "em" | "rem" | "%" | "vh" | "vw" | "vmin" | "vmax" | "pt" | "pc" | "in" | "cm" | "mm"

const DEFAULT_CSS_EXAMPLE = `/* Example CSS to demonstrate conversion */
.container {
  width: 1200px;
  padding: 24px;
  margin: 16px auto;
  font-size: 16px;
}

.card {
  width: 300px;
  height: 200px;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .container {
    width: 100vw;
    padding: 16px;
  }
  
  .card {
    width: 100%;
    height: 150px;
  }
}`

const CssCodeConverter = () => {
  const [cssCode, setCssCode] = useState<string>("")
  const [convertedCode, setConvertedCode] = useState<string>("")
  const [fromUnit, setFromUnit] = useState<CssUnit>("px")
  const [toUnit, setToUnit] = useState<CssUnit>("rem")
  const [copied, setCopied] = useState(false)
  const [tried, setTried] = useState(false)
  const [rootFontSize] = useState<number>(16)
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 })

  const units: CssUnit[] = ["px", "em", "rem", "%", "vh", "vw", "vmin", "vmax", "pt", "pc", "in", "cm", "mm"]

  useEffect(() => {
    // Update viewport size on client
    if (typeof window !== 'undefined') {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }, [])

  useEffect(() => {
    if (cssCode) {
      const converted = convertCssCode(cssCode, fromUnit, toUnit)
      setConvertedCode(converted)
    } else {
      setConvertedCode("")
    }
  }, [cssCode, fromUnit, toUnit, rootFontSize, viewportSize])

  const convertValue = (value: number, from: CssUnit, to: CssUnit): number => {
    // First convert to pixels as a base unit
    let valueInPx = value

    switch (from) {
      case "px": break
      case "em":
      case "rem": valueInPx = value * rootFontSize; break
      case "%":
        // Percentage conversion requires context - we'll assume it's relative to parent font size
        valueInPx = (value / 100) * rootFontSize
        break
      case "vh": valueInPx = (value / 100) * viewportSize.height; break
      case "vw": valueInPx = (value / 100) * viewportSize.width; break
      case "vmin": valueInPx = (value / 100) * Math.min(viewportSize.width, viewportSize.height); break
      case "vmax": valueInPx = (value / 100) * Math.max(viewportSize.width, viewportSize.height); break
      case "pt": valueInPx = value * (96 / 72); break // 1pt = 1/72in, 1in = 96px
      case "pc": valueInPx = value * 16; break // 1pc = 16px
      case "in": valueInPx = value * 96; break // 1in = 96px
      case "cm": valueInPx = value * (96 / 2.54); break // 1cm = 96px/2.54
      case "mm": valueInPx = value * (96 / 25.4); break // 1mm = 96px/25.4
    }

    // Then convert from pixels to target unit
    let convertedValue: number

    switch (to) {
      case "px": convertedValue = valueInPx; break
      case "em":
      case "rem": convertedValue = valueInPx / rootFontSize; break
      case "%":
        // Percentage conversion requires context - we'll assume it's relative to parent font size
        convertedValue = (valueInPx / rootFontSize) * 100
        break
      case "vh": convertedValue = (valueInPx / viewportSize.height) * 100; break
      case "vw": convertedValue = (valueInPx / viewportSize.width) * 100; break
      case "vmin": convertedValue = (valueInPx / Math.min(viewportSize.width, viewportSize.height)) * 100; break
      case "vmax": convertedValue = (valueInPx / Math.max(viewportSize.width, viewportSize.height)) * 100; break
      case "pt": convertedValue = valueInPx / (96 / 72); break
      case "pc": convertedValue = valueInPx / 16; break
      case "in": convertedValue = valueInPx / 96; break
      case "cm": convertedValue = valueInPx / (96 / 2.54); break
      case "mm": convertedValue = valueInPx / (96 / 25.4); break
    }

    return convertedValue
  }

  const convertCssCode = (code: string, from: CssUnit, to: CssUnit): string => {
    if (!code) return ""

    // Enhanced regex to match CSS values with units
    const regex = new RegExp(`([-+]?\\d*\\.?\\d+)${from}(?![a-zA-Z0-9_-])`, "g")

    return code.replace(regex, (match, value) => {
      const numericValue = parseFloat(value)
      const convertedValue = convertValue(numericValue, from, to)

      // Format the value with appropriate decimal places
      let precision = 4
      if (to === "px" || to === "pt" || to === "pc") {
        precision = 0
      }

      // Format and clean trailing zeros
      const formatted = convertedValue.toFixed(precision)
      return formatted.replace(/\.0+$/, "").replace(/(\.\d+?)0+$/, "$1") + to
    })
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      // fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = convertedCode
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  // Copies DEFAULT_CSS_EXAMPLE to clipboard
  const handleTryIt = async () => {
    try {
      await navigator.clipboard.writeText(DEFAULT_CSS_EXAMPLE)
      setTried(true)
      setTimeout(() => setTried(false), 1500)
    } catch (error) {
      // fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = DEFAULT_CSS_EXAMPLE
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setTried(true)
      setTimeout(() => setTried(false), 1500)
    }
  }

  const handleClearEditor = () => {
    setCssCode("")
  }

  return (
    <motion.div
      className="flex-1 flex flex-col space-y-6 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch flex-1">
        <Card className="h-full">
          <CardContent className="p-6 flex flex-col flex-1 h-full">
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <Label className="text-sm font-medium mb-2 block">
                  Convert From
                </Label>
                <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={`from-${unit}`} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="text-sm font-medium mb-2 block">
                  Convert To
                </Label>
                <Select value={toUnit} onValueChange={handleToUnitChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={`to-${unit}`} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex-1">
              <CodeEditor
                value={cssCode}
                readOnly={false}
                onChange={handleCssCodeChange}
                placeholder="Paste your CSS code here..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardContent className="p-6 flex flex-col flex-1 h-full">
            <div className="flex justify-between items-center mb-4 flex-wrap">
              <h3 className="text-sm font-medium">
                Converted CSS
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTryIt}
                  className="flex items-center gap-1"
                  disabled={tried}
                >
                  {tried ? "Copied!" : "Try Example"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearEditor}
                  disabled={!convertedCode}
                >
                  Clear Editor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!convertedCode}
                  className="flex items-center gap-1"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
                
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
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

      {/* <div className="text-sm text-muted-foreground">
        <p><strong>Note:</strong> Percentage and viewport unit conversions assume standard browser defaults.</p>
        <p>Root font size is set to 16px for rem calculations.</p>
      </div> */}
    </motion.div>
  )
}

export default CssCodeConverter
