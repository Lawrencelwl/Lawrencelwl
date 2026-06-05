"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"

interface PhotoCardProps {
  src: string
  onClick?: () => void
}

export function PhotoCard({ src, onClick }: PhotoCardProps) {
  return (
    <Card 
      className="overflow-hidden bg-card/50 backdrop-blur-sm border-border cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </Card>
  )
}
