"use client";

import { useState, useRef, useEffect } from "react";
import { PhotoCard } from "@/components/photo-card";
import { PhotoModal } from "@/components/photo-modal";
import { useAuth } from "@/contexts/auth-context";
import { lifePageEvents } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface Photo {
  id: string;
  src: string;
  alt: string;
  description: string;
  date: string;
}

const initialPhotos: Photo[] = [
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

export default function LifePage() {
  const { isAuthenticated } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Subscribe to navbar "Add Photo" button clicks
  useEffect(() => {
    const unsubscribe = lifePageEvents.subscribe((show) => {
      setShowUploadForm(show);
    });
    return unsubscribe;
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (previewImage && description) {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        src: previewImage,
        alt: "User uploaded photo",
        description: description,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      setPhotos([newPhoto, ...photos]);
      setPreviewImage(null);
      setDescription("");
      setShowUploadForm(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const cancelUpload = () => {
    setPreviewImage(null);
    setDescription("");
    setShowUploadForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Life</h1>
        </div>

        {/* Upload Form - Only shown when authenticated and toggled */}
        {isAuthenticated && showUploadForm && (
          <Card className="max-w-lg mx-auto bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Upload Photo</CardTitle>
              <Button variant="ghost" size="icon" onClick={cancelUpload}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Input */}
              <div className="space-y-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
              </div>

              {/* Preview */}
              {previewImage && (
                <div className="relative aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Write a description for your photo..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!previewImage || !description}
                className="w-full gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Photo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Photos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              description={photo.description}
              date={photo.date}
              onClick={() => openPhotoModal(photo)}
            />
          ))}
        </div>

        {/* Photo Modal */}
        {selectedPhoto && (
          <PhotoModal
            isOpen={!!selectedPhoto}
            onClose={closePhotoModal}
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
