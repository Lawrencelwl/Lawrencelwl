"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PhotoModalProps {
  isOpen: boolean
  onClose: () => void
  src: string
}

const MIN_SCALE = 1
const ZOOM_SCALE = 3
const DRAG_THRESHOLD = 4

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value))
}

export function PhotoModal({ isOpen, onClose, src }: PhotoModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [scale, setScale] = useState(MIN_SCALE)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 })
  const hasDraggedRef = useRef(false)

  const resetView = () => {
    setScale(MIN_SCALE)
    setPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      resetView()
      setIsDragging(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (scale > MIN_SCALE) {
          resetView()
        } else {
          onClose()
        }
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose, scale])

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e: globalThis.MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.mouseX
      const dy = e.clientY - dragStartRef.current.mouseY

      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        hasDraggedRef.current = true
      }

      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const maxX = (rect.width * (scale - 1)) / 2
      const maxY = (rect.height * (scale - 1)) / 2

      setPosition({
        x: clamp(dragStartRef.current.posX + dx, maxX),
        y: clamp(dragStartRef.current.posY + dy, maxY),
      })
    }

    const onMouseUp = () => setIsDragging(false)

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [isDragging, scale])

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (scale <= MIN_SCALE) return

    e.preventDefault()
    e.stopPropagation()
    hasDraggedRef.current = false
    setIsDragging(true)
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position.x,
      posY: position.y,
    }
  }

  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if (hasDraggedRef.current) {
      hasDraggedRef.current = false
      return
    }

    if (scale > MIN_SCALE) {
      resetView()
      return
    }

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    setPosition({
      x: -offsetX * (ZOOM_SCALE - 1),
      y: -offsetY * (ZOOM_SCALE - 1),
    })
    setScale(ZOOM_SCALE)
  }

  if (!shouldRender) return null

  const isZoomed = scale > MIN_SCALE

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm transition-opacity duration-200",
        isAnimating ? "opacity-100" : "opacity-0"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-card rounded-xl border border-border shadow-2xl overflow-hidden transition-all duration-200",
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-10 bg-background/50 backdrop-blur-sm hover:bg-background/80"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </Button>

        <div
          ref={containerRef}
          className={cn(
            "relative flex-1 min-h-0 w-full aspect-square sm:aspect-video overflow-hidden",
            isDragging
              ? "cursor-grabbing"
              : isZoomed
                ? "cursor-grab"
                : "cursor-zoom-in",
          )}
          onClick={handleImageClick}
          onMouseDown={handleMouseDown}
          role="button"
          tabIndex={0}
          aria-label={
            isZoomed ? "Drag to pan, click to zoom out" : "Click to zoom in"
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              if (isZoomed) {
                resetView()
              } else {
                setScale(ZOOM_SCALE)
              }
            }
          }}
        >
          <div
            className={cn(
              "relative w-full h-full",
              !isDragging && "transition-transform duration-200 ease-out",
            )}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-contain pointer-events-none select-none"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
