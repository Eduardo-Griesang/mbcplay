'use client';

import { useState } from 'react';
import { MediaItem } from '@/context/MediaContext';
import MediaCard from '../MediaCard';

interface MediaCarouselProps {
  items: MediaItem[];
  mediaType: 'movie' | 'tv';
  loading?: boolean;
}

export default function MediaCarousel({ items, mediaType, loading = false }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;
  const cardWidth = 160;
  const gap = 20;
  const visibleWidth = itemsPerView * (cardWidth + gap) - gap;

  if (loading || !items || items.length === 0) {
    return (
      <div className="w-full h-64 bg-secondaryBackground rounded-4xl animate-pulse mb-12" />
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerView));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - itemsPerView, prev + itemsPerView));
  };

  const canShowPrev = currentIndex > 0;
  const canShowNext = currentIndex < items.length - itemsPerView;

  return (
    <div className="w-full mb-12">
      <h2 className="text-mainText text-2xl font-semibold mb-6 w-3/4">Filmes Populares</h2>
      <div className="relative w-full flex items-center">
        {canShowPrev && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-opacity duration-300"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="flex-1 overflow-hidden">
          <div 
            className="flex gap-10 transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
              width: 'fit-content'
            }}
          >
            {items.map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <MediaCard
                  media={item}
                  mediaType={mediaType}
                  imageSize="medium"
                />
              </div>
            ))}
          </div>
        </div>

        {canShowNext && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-opacity duration-300"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
