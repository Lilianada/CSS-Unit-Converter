"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check } from "lucide-react"
import CssCodeConverter from "./css-code-converter"
import Footer from "./footer"
import Header from "./header"
import { motion, AnimatePresence } from "framer-motion"

type CssUnit = "px" | "em" | "rem" | "%" | "vh" | "vw" | "vmin" | "vmax" | "pt" | "pc" | "in" | "cm" | "mm"

type ConversionResult = {
  unit: CssUnit
  value: string
  copied: boolean
}

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState<string>("16")
  const [selectedUnit, setSelectedUnit] = useState<CssUnit>("px")
  const [rootFontSize, setRootFontSize] = useState<number>(16)
  const [parentElementSize, setParentElementSize] = useState<number>(100)
  const [viewportWidth, setViewportWidth] = useState<number>(1440)
  const [viewportHeight, setViewportHeight] = useState<number>(900)
  const [conversionResults, setConversionResults] = useState<ConversionResult[]>([])
  const [activeTab, setActiveTab] = useState<string>("unit-converter")
  const [targetUnit, setTargetUnit] = useState<CssUnit>("rem")
  const [isFromOpen, setIsFromOpen] = useState<boolean>(false)
  const [isToOpen, setIsToOpen] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  // Units that will be displayed in the converter
  const units: CssUnit[] = ["px", "em", "rem", "%", "vh", "vw", "vmin", "vmax", "pt", "pc", "in", "cm", "mm"]

  useEffect(() => {
    // Ensure component is mounted to prevent hydration issues with theme
    setMounted(true)

    // Update viewport dimensions on window resize
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
    }

    // Set initial viewport dimensions
    if (typeof window !== "undefined") {
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  useEffect(() => {
    // Convert the input value to the target unit
    if (inputValue && !isNaN(Number.parseFloat(inputValue))) {
      const result = convertToUnit(Number.parseFloat(inputValue), selectedUnit, targetUnit)
      setConversionResults([result])
    } else {
      setConversionResults([])
    }
  }, [inputValue, selectedUnit, targetUnit, rootFontSize, parentElementSize, viewportWidth, viewportHeight])

  const convertToUnit = (value: number, fromUnit: CssUnit, toUnit: CssUnit): ConversionResult => {
    // First convert to pixels as a base unit
    let valueInPx = value

    switch (fromUnit) {
      case "em":
        valueInPx = value * parentElementSize
        break
      case "rem":
        valueInPx = value * rootFontSize
        break
      case "%":
        valueInPx = (value / 100) * parentElementSize
        break
      case "vh":
        valueInPx = (value / 100) * viewportHeight
        break
      case "vw":
        valueInPx = (value / 100) * viewportWidth
        break
      case "vmin":
        valueInPx = (value / 100) * Math.min(viewportWidth, viewportHeight)
        break
      case "vmax":
        valueInPx = (value / 100) * Math.max(viewportWidth, viewportHeight)
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

    switch (toUnit) {
      case "px":
        convertedValue = valueInPx
        break
      case "em":
        convertedValue = valueInPx / parentElementSize
        break
      case "rem":
        convertedValue = valueInPx / rootFontSize
        break
      case "%":
        convertedValue = (valueInPx / parentElementSize) * 100
        break
      case "vh":
        convertedValue = (valueInPx / viewportHeight) * 100
        break
      case "vw":
        convertedValue = (valueInPx / viewportWidth) * 100
        break
      case "vmin":
        convertedValue = (valueInPx / Math.min(viewportWidth, viewportHeight)) * 100
        break
      case "vmax":
        convertedValue = (valueInPx / Math.max(viewportWidth, viewportHeight)) * 100
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
        convertedValue = 0
    }

    // Format the value to a reasonable number of decimal places and remove trailing zeros
    const formattedValue = convertedValue.toFixed(toUnit === "px" || toUnit === "pt" || toUnit === "pc" ? 0 : 2)
    const cleanedValue = formattedValue.replace(/\.0+$/, "").replace(/(\.\d+?)0+$/, "$1")

    return {
      unit: toUnit,
      value: cleanedValue,
      copied: false,
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleUnitChange = (unit: CssUnit) => {
    setSelectedUnit(unit)
    setIsFromOpen(false)
  }

  const handleTargetUnitChange = (unit: CssUnit) => {
    setTargetUnit(unit)
    setIsToOpen(false)
  }

  const handleCopy = (index: number) => {
    const result = conversionResults[index]
    navigator.clipboard.writeText(`${result.value}${result.unit}`)

    // Update the copied state
    const updatedResults = [...conversionResults]
    updatedResults[index] = { ...updatedResults[index], copied: true }
    setConversionResults(updatedResults)

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      const resetResults = [...conversionResults]
      resetResults[index] = { ...resetResults[index], copied: false }
      setConversionResults(resetResults)
    }, 2000)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  if (!mounted) {
    return null // Prevent hydration issues
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col h-full">
        <Tabs defaultValue="unit-converter" onValueChange={handleTabChange} className="w-full flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2 mb-6 bg-zinc-100 dark:bg-zinc-800">
            <TabsTrigger
              value="unit-converter"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100"
            >
              Unit Converter
            </TabsTrigger>
            <TabsTrigger
              value="code-converter"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100"
            >
              CSS Code Converter
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {activeTab === "unit-converter" && (
              <TabsContent value="unit-converter" className="mt-0 flex-1 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col space-y-6"
                >
                  <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="value-input"
                            className="text-sm font-medium mb-2 block text-zinc-600 dark:text-zinc-400"
                          >
                            Enter value
                          </Label>
                          <div className="flex space-x-2">
                            <Input
                              id="value-input"
                              type="number"
                              value={inputValue}
                              onChange={handleInputChange}
                              className="font-mono bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                              placeholder="Enter value"
                              aria-label="Value to convert"
                            />
                            <div className="relative">
                              <Button
                                type="button"
                                variant="outline"
                                className="w-24 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                                onClick={() => setIsFromOpen(!isFromOpen)}
                              >
                                {selectedUnit}
                              </Button>
                              {isFromOpen && (
                                <Card className="absolute mt-1 z-10 w-48 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                                  <CardContent className="p-2">
                                    <div className="grid grid-cols-3 gap-1">
                                      {units.map((unit) => (
                                        <Button
                                          key={unit}
                                          variant={unit === selectedUnit ? "default" : "outline"}
                                          size="sm"
                                          onClick={() => handleUnitChange(unit)}
                                          className="w-full"
                                        >
                                          {unit}
                                        </Button>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="target-unit"
                            className="text-sm font-medium mb-2 block text-zinc-600 dark:text-zinc-400"
                          >
                            Convert to
                          </Label>
                          <div className="relative">
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                              onClick={() => setIsToOpen(!isToOpen)}
                            >
                              {targetUnit}
                            </Button>
                            {isToOpen && (
                              <Card className="absolute mt-1 z-10 w-full bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                                <CardContent className="p-2">
                                  <div className="grid grid-cols-3 gap-1">
                                    {units.map((unit) => (
                                      <Button
                                        key={unit}
                                        variant={unit === targetUnit ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleTargetUnitChange(unit)}
                                        className="w-full"
                                      >
                                        {unit}
                                      </Button>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4 text-zinc-800 dark:text-zinc-200">Conversion Result</h3>
                      {conversionResults.length > 0 ? (
                        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-md">
                          <div>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 block">
                              {conversionResults[0].unit}
                            </span>
                            <span className="font-mono text-2xl font-medium text-zinc-800 dark:text-zinc-200">
                              {conversionResults[0].value}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopy(0)}
                            aria-label={`Copy ${conversionResults[0].value}${conversionResults[0].unit}`}
                            className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                          >
                            {conversionResults[0].copied ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      ) : (
                        <p className="text-zinc-500 dark:text-zinc-400 text-center py-4">
                          Enter a valid number to see conversion
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "code-converter" && (
              <TabsContent value="code-converter" className="mt-0 flex-1 flex flex-col">
                <CssCodeConverter />
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}

export default UnitConverter
