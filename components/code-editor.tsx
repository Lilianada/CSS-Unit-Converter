"use client"

import { useEffect, useRef, type ChangeEvent } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-css"
import "prismjs/components/prism-scss"
import { Textarea } from "@/components/ui/textarea"

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  readOnly?: boolean
  className?: string
  height?: string
  "aria-label"?: string
}

export default function CodeEditor({
  value,
  onChange,
  placeholder = "Enter code...",
  readOnly = false,
  className = "",
  height = "h-64",
  "aria-label": ariaLabel,
}: CodeEditorProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Apply syntax highlighting when value changes
  useEffect(() => {
    try {
      if (preRef.current) {
        Prism.highlightElement(preRef.current)
      }
    } catch (error) {
      console.error("Error applying syntax highlighting:", error)
    }
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
  }

  // Focus the textarea when clicking on the container
  const handleContainerClick = () => {
    if (!readOnly && textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  return (
    <div 
      className={`relative focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary/50 rounded-lg ${height}`} 
      onClick={handleContainerClick}
    >
      <pre
        ref={preRef}
        className={`font-mono overflow-auto whitespace-pre ${height} p-3 rounded-lg ${className}`}
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        <code className="language-css">{value || " "}</code>
      </pre>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`v0-editor v0-scrollbar font-mono resize-none bg-transparent rounded-lg text-muted-foreground  absolute inset-0 ${height} p-3 ${className}`}
        style={{ caretColor: "white" }}
        aria-label={ariaLabel || "Code editor"}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  )
}