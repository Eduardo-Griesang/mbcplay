'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MediaItem } from '@/context/MediaContext';
import Button from '../Button';

interface HeroCarouselProps {
  items: MediaItem[];
  loading?: boolean;
}

export default function HeroCarousel({ items, loading = false }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading || !items || items.length === 0) {
    return (
      <div className="w-full h-96 bg-secondaryBackground rounded-4xl animate-pulse mb-12" />
    );
  }

  const currentItem = items[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === items.length - 1;
  const canShowNext = !isLast;
  const canShowPrev = !isFirst;

  const gapPercentage = 5;
  const itemWidthPercentage = 65;
  const itemCount = items.length;

  return (
    <div className="w-full mb-12">
      <div className="relative h-96 overflow-hidden rounded-4xl">
        {/* Carousel container */}
        <div 
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(calc(-${currentIndex} * (${itemWidthPercentage}% + ${gapPercentage}%)))`,
            width: `calc(${itemCount} * ${itemWidthPercentage}% + ${(itemCount - 1) * gapPercentage}%)`
          }}
        >
          {items.map((item, index) => {
            const backdropUrl = item.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
              : 'https://via.placeholder.com/1280x720?text=No+Image';

            return (
              <div 
                key={item.id}
                className="relative h-full rounded-4xl overflow-hidden flex-shrink-0"
                style={{ width: `${itemWidthPercentage}%`, marginRight: index < itemCount - 1 ? `${gapPercentage}%` : '0' }}
              >
                <Image
                  src={backdropUrl}
                  alt={item.title || item.name}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay gradient - only on current */}
                {index === currentIndex && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-70" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex justify-end p-8 items-end">
                      <div className="flex gap-4 items-center">
                        <div className="w-40">
                          <Button play={true} />
                        </div>
                        <div className="w-40">
                          <Button details={true} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        {canShowPrev && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-opacity duration-300"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {canShowNext && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-opacity duration-300"
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
