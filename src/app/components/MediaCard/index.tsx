'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MediaItem } from '@/context/MediaContext';
import Star from "../../icons/Star.svg"

interface MediaCardProps {
  media: MediaItem;
  mediaType: 'movie' | 'tv';
  imageSize?: 'small' | 'medium' | 'large';
}

export default function MediaCard({ media, mediaType, imageSize = 'medium' }: MediaCardProps) {
  const imageUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const sizeClasses = {
    small: 'w-40 h-56',
    medium: 'w-40 h-56',
    large: 'w-48 h-64',
  };

  const title = media.title || media.name || 'Untitled';
  const detailsHref = { pathname: '/Details', query: { id: media.id, type: mediaType } };

  return (
    <Link
      href={detailsHref}
      className={`${sizeClasses[imageSize]} relative flex flex-col gap-1 cursor-pointer group`}
      aria-label={`Open details for ${title}`}
    >
      <div className={`${sizeClasses[imageSize]} relative overflow-hidden rounded-2xl`}>
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
      <div className="absolute flex items-center bg-secondaryBackground/50 px-2 right-0 rounded-tr-2xl rounded-bl-2xl gap-1 z-10">
        <Image src={Star} alt={'Star'} />
        <span className="text-mainText font-medium text-lg"> {media.vote_average.toFixed(1)}</span>
      </div>
    </Link>
  );
}
