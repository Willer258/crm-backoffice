'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function HeaderSearch() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      {/* Desktop search */}
      <div className="relative hidden md:block">
        <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search... (⌘K)"
          className="h-9 w-64 pl-8"
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>

      {/* Mobile search button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 md:hidden"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Search dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <Input
              placeholder="Search contacts, deals, companies..."
              className="pl-9"
              autoFocus
            />
          </div>
          <div className="text-muted-foreground py-6 text-center text-sm">
            Start typing to search...
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
