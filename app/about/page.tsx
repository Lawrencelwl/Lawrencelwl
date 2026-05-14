"use client";

import { useState } from "react";
import { PhotoCard } from "@/components/photo-card";
import { PhotoModal } from "@/components/photo-modal";

interface Photo {
  id: string;
  src: string;
  alt: string;
  description: string;
  date: string;
}

const photos: Photo[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt: "Mountain landscape",
    description:
      "Exploring the beautiful mountains during my summer vacation. The view from the top was absolutely breathtaking!",
    date: "August 15, 2024",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    alt: "Beach sunset",
    description:
      "Golden hour at the beach. Nothing beats watching the sunset over the ocean.",
    date: "July 22, 2024",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    alt: "Working on laptop",
    description:
      "Late night coding session. Building something amazing with the team!",
    date: "June 10, 2024",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&q=80",
    alt: "City at night",
    description:
      "City lights from the rooftop. Urban exploration is one of my favorite hobbies.",
    date: "May 5, 2024",
  },
];

export default function AboutPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">About</h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              description={photo.description}
              date={photo.date}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>

        {selectedPhoto && (
          <PhotoModal
            isOpen={!!selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            description={selectedPhoto.description}
            date={selectedPhoto.date}
          />
        )}
      </div>
    </div>
  );
}
