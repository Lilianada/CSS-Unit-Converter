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
      <DialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-800 dark:text-zinc-200">About CSS Unit Converter</DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400 pt-4 space-y-3 text-left">
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
              To make a contribution, fork the <a href="https://github.com/lilianada/css-unit-converter/fork" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100">github repository</a>.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}