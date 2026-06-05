"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { PhotoCard } from "@/components/photo-card";
import { PhotoModal } from "@/components/photo-modal";
import { Spinner } from "@/components/ui/spinner";
import { ChevronDown } from "lucide-react";

interface Photo {
  id: string;
  src: string;
}

const PAGE_SIZE = 8;
const LOAD_DELAY_MS = 800;

const photos: Photo[] = [
  {
    id: "1",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780666223/HomePage/20231201_191238_l3vi8h.jpg",
  },
  {
    id: "2",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780666223/HomePage/20240120_121408_g3x5rr.jpg",
  },
  {
    id: "3",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780666224/HomePage/20240430_ddkyzz.png",
  },
  {
    id: "4",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780666223/HomePage/20240619_155942_euxote.jpg",
  },
  {
    id: "5",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667993/HomePage/20240620_190058_zie447.jpg",
  },
  {
    id: "6",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667994/HomePage/20240625_154922_p1lwwj.jpg",
  },
  {
    id: "7",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667994/HomePage/20240625_182232_bqrcun.jpg",
  },
  {
    id: "8",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780666223/HomePage/20240627_150705_jyodvx.jpg",
  },
  {
    id: "9",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780666223/HomePage/20240901_185647_nzs4gj.jpg",
  },
  {
    id: "10",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780666224/HomePage/20241115_091904_v4zzul.jpg",
  },
  {
    id: "11",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780666224/HomePage/20241231_185900_v7the9.jpg",
  },
  {
    id: "12",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667994/HomePage/20241231_231302_vnut2x.jpg",
  },
  {
    id: "13",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780666225/HomePage/20250220_112054_hiovww.jpg",
  },
  {
    id: "14",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780668004/HomePage/IMG_20251117_162006_vmszyh.jpg",
  },
  {
    id: "15",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667994/HomePage/IMG_20251225_190552_edh9zb.jpg",
  },
  {
    id: "16",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667995/HomePage/IMG_20260109_083215_sitgvr.jpg",
  },
  {
    id: "17",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667995/HomePage/IMG_20260110_140837_meei9s.jpg",
  },
  {
    id: "18",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667995/HomePage/IMG_20260112_203624_di9tbz.jpg",
  },
  {
    id: "19",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667995/HomePage/IMG_20260201_115244_f8jle8.jpg",
  },
  {
    id: "20",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667995/HomePage/IMG_20260204_171636_uza4sw.jpg",
  },
  {
    id: "21",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667996/HomePage/IMG_20260205_154131_k3dijl.jpg",
  },
  {
    id: "22",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667996/HomePage/IMG_20260208_184318_himryq.jpg",
  },
  {
    id: "23",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780667996/HomePage/IMG_20260220_172820_mfkoel.jpg",
  },
  {
    id: "24",
    src: "https://res.cloudinary.com/dy3mkzbam/image/upload/v1780668995/HomePage/IMG_20260319_183711_d2dyja.jpg",
  },
  // { id: "25", src: "" },
  // { id: "26", src: "" },
  // { id: "27", src: "" },
];

const displayPhotos = [...photos].reverse();

export default function AboutPage() {
  const pathname = usePathname();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [visibleCount, setVisibleCount] = useState(
    Math.min(PAGE_SIZE, photos.length),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const hasMore = visibleCount < photos.length;
  const visiblePhotos = displayPhotos.slice(0, visibleCount);

  // Always start with 8 images when entering the About page
  useEffect(() => {
    setVisibleCount(Math.min(PAGE_SIZE, photos.length));
    setIsLoading(false);
    setHasScrolled(false);
  }, [pathname]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  // Load more only after the user scrolls near the bottom
  useEffect(() => {
    if (!hasMore) return;

    const onScroll = () => {
      setHasScrolled(true);

      if (isLoadingRef.current) return;

      const sentinel = loadMoreRef.current;
      if (!sentinel) return;

      const rect = sentinel.getBoundingClientRect();
      if (rect.top <= globalThis.innerHeight + 120) {
        setIsLoading(true);
      }
    };

    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, [hasMore, visibleCount]);

  useEffect(() => {
    if (!isLoading || !hasMore) return;

    const timer = setTimeout(() => {
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, photos.length));
      setIsLoading(false);
    }, LOAD_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isLoading, hasMore]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">About</h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visiblePhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              src={photo.src}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>

        {hasMore && (
          <div
            ref={loadMoreRef}
            className="flex justify-center py-8 min-h-12"
            aria-live="polite"
          >
            {isLoading ? (
              <Spinner className="size-6 text-muted-foreground" />
            ) : (
              !hasScrolled && (
                <ChevronDown
                  className="size-6 text-muted-foreground animate-bounce"
                  aria-hidden
                />
              )
            )}
          </div>
        )}

        {selectedPhoto && (
          <PhotoModal
            isOpen={!!selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            src={selectedPhoto.src}
          />
        )}
      </div>
    </div>
  );
}
