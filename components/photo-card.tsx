"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface PhotoCardProps {
  src: string
  alt: string
  description: string
  date?: string
  onClick?: () => void
}

export function PhotoCard({ src, alt, description, date, onClick }: PhotoCardProps) {
  return (
    <Card 
      className="overflow-hidden bg-card/50 backdrop-blur-sm border-border cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-foreground line-clamp-2">{description}</p>
        {date && (
          <p className="text-xs text-muted-foreground mt-2">{date}</p>
        )}
      </CardContent>
    </Card>
  )
}
