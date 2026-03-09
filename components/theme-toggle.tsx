'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { toggleMode, mode } = useTheme()

  return (
    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleMode}>
      {mode === 'light' ? (
        <Sun className="h-4 w-4 scale-100 rotate-0 transition-all" />
      ) : (
        <Moon className="h-4 w-4 scale-100 rotate-0 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
