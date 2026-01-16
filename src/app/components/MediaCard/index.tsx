'use client';

import Image from 'next/image';
import { MediaItem } from '@/context/MediaContext';

interface MediaCardProps {
  media: MediaItem;
  imageSize?: 'small' | 'medium' | 'large';
}

export default function MediaCard({ media, imageSize = 'medium' }: MediaCardProps) {
  const imageUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const sizeClasses = {
    small: 'w-32 h-48',
    medium: 'w-40 h-56',
    large: 'w-48 h-64',
  };

  const title = media.title || media.name || 'Untitled';

  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      <div className={`${sizeClasses[imageSize]} relative overflow-hidden rounded-lg`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-mainText font-semibold text-sm truncate">{title}</h3>
        <p className="text-fourthText text-xs">
          {media.release_date || media.first_air_date || 'N/A'}
        </p>
        <div className="flex items-center gap-1">
          <span className="text-thirdText text-xs">★ {media.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
