"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type AboutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
}

export default function AboutDialog({ open, onOpenChange, trigger }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-zinc-800 dark:text-zinc-200">About CSS Unit Converter</DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400 pt-4 space-y-3 text-left">
            <p>
              <strong>CSS Unit Converter</strong> is a powerful and intuitive tool for web developers, UI/UX designers, and anyone working with CSS who needs to quickly and accurately convert between different <strong>CSS units</strong> such as <strong>pixels (px)</strong>, <strong>ems (em)</strong>, <strong>rems (rem)</strong>, <strong>percentages (%)</strong>, <strong>viewport units (vw, vh, vmin, vmax)</strong>, <strong>points (pt)</strong>, <strong>picas (pc)</strong>, <strong>inches (in)</strong>, <strong>centimeters (cm)</strong>, and <strong>millimeters (mm)</strong>.
            </p>
            <p>
              This tool eliminates the hassle of manual calculations and helps you maintain precision and consistency in your CSS code. Whether you’re converting <strong>px to rem</strong> for scalable typography, <strong>rem to em</strong> for modular components, or working with <strong>responsive design</strong> using <strong>viewport units</strong>, CSS Unit Converter streamlines your workflow.
            </p>
            <p>
              <strong>Why use CSS Unit Converter?</strong>
              <ul className="list-disc ml-5 mt-2">
                <li>Instantly convert between all major CSS units with real-time results.</li>
                <li>Improve accessibility by using relative units like <strong>rem</strong> and <strong>em</strong> for font sizes.</li>
                <li>Optimize responsive layouts by converting to <strong>vw</strong>, <strong>vh</strong>, and <strong>%</strong> units.</li>
                <li>Learn best practices for CSS unit usage and responsive web design.</li>
                <li>Copy and use converted CSS code directly in your projects.</li>
              </ul>
            </p>
            <p>
              <strong>Use Cases:</strong> <br />
              - Building scalable and accessible web interfaces<br />
              - Migrating legacy CSS to modern best practices<br />
              - Designing responsive layouts for all devices<br />
              - Teaching and learning CSS unit conversions
            </p>
            <p>
              CSS Unit Converter is part of <a href="https://lilyslab.xyz" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100">Lily's Lab</a>, a hub for innovative web development tools and resources.
            </p>
            <p>
              To make a contribution, fork the <a href="https://github.com/lilianada/css-unit-converter/fork" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100">GitHub repository</a>.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}