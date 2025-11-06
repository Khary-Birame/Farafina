"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

interface FormFieldProps {
  label: string
  name: string
  required?: boolean
  error?: string
  hint?: string
  className?: string
}

interface InputFieldProps extends FormFieldProps {
  type?: "text" | "email" | "tel" | "number" | "password" | "url"
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  autoComplete?: string
}

interface TextareaFieldProps extends FormFieldProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  rows?: number
}

interface SelectFieldProps extends FormFieldProps {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  options: { value: string; label: string }[]
  disabled?: boolean
}

// Composant Input harmonisé
export function InputField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  hint,
  value,
  onChange,
  disabled = false,
  autoComplete,
  className,
}: InputFieldProps) {
  const fieldId = `field-${name}`
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={fieldId} 
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-[#16A34A] ml-1">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={fieldId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          className={cn(
            "h-12 transition-all duration-200",
            "focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]",
            error && "border-destructive focus:ring-destructive/20 focus:border-destructive",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
      {error && (
        <div id={`${fieldId}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {hint && !error && (
        <p id={`${fieldId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}

// Composant Textarea harmonisé
export function TextareaField({
  label,
  name,
  placeholder,
  required = false,
  error,
  hint,
  value,
  onChange,
  disabled = false,
  rows = 4,
  className,
}: TextareaFieldProps) {
  const fieldId = `field-${name}`
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={fieldId} 
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-[#16A34A] ml-1">*</span>}
      </Label>
      <div className="relative">
        <Textarea
          id={fieldId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          className={cn(
            "min-h-[100px] resize-none transition-all duration-200",
            "focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]",
            error && "border-destructive focus:ring-destructive/20 focus:border-destructive",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
      {error && (
        <div id={`${fieldId}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {hint && !error && (
        <p id={`${fieldId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}

// Composant Select harmonisé
export function SelectField({
  label,
  name,
  placeholder = "Sélectionnez une option",
  required = false,
  error,
  hint,
  value,
  onValueChange,
  options,
  disabled = false,
  className,
}: SelectFieldProps) {
  const fieldId = `field-${name}`
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label 
        htmlFor={fieldId} 
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-[#16A34A] ml-1">*</span>}
      </Label>
      <div className="relative">
        <Select
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          required={required}
        >
          <SelectTrigger
            id={fieldId}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
            className={cn(
              "h-12 transition-all duration-200",
              "focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]",
              error && "border-destructive focus:ring-destructive/20 focus:border-destructive",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && (
        <div id={`${fieldId}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {hint && !error && (
        <p id={`${fieldId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}

