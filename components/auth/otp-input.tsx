'use client'

import { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  autoFocus?: boolean
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  className,
  autoFocus = true,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const handleChange = (index: number, inputValue: string) => {
    // Only allow digits
    const digit = inputValue.replace(/\D/g, '').slice(-1)

    const newValue = value.split('')
    newValue[index] = digit
    const result = newValue.join('').slice(0, length)
    onChange(result)

    // Move to next input if a digit was entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // If current input is empty, move to previous and clear it
        inputRefs.current[index - 1]?.focus()
        const newValue = value.split('')
        newValue[index - 1] = ''
        onChange(newValue.join(''))
      } else if (value[index]) {
        // Clear current input
        const newValue = value.split('')
        newValue[index] = ''
        onChange(newValue.join(''))
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length)
    onChange(pastedData)

    // Focus appropriate input
    const nextIndex = Math.min(pastedData.length, length - 1)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
    // Select the input content on focus
    inputRefs.current[index]?.select()
  }

  return (
    <div className={cn('flex gap-2 justify-center', className)}>
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          onBlur={() => setFocusedIndex(-1)}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          className={cn(
            'w-12 h-14 text-center text-2xl font-bold',
            'border-2 transition-all duration-200',
            focusedIndex === index
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-input',
            value[index] && 'border-primary/50 bg-primary/5'
          )}
          autoComplete="off"
        />
      ))}
    </div>
  )
}
