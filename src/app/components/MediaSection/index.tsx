'use client';

import { MediaItem } from '@/context/MediaContext';
import MediaCard from '../MediaCard';

interface MediaSectionProps {
  title: string;
  items: MediaItem[];
  loading: boolean;
  error: string | null;
  imageSize?: 'small' | 'medium' | 'large';
}

export default function MediaSection({
  title,
  items,
  loading,
  error,
  imageSize = 'medium',
}: MediaSectionProps) {
  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="text-mainText text-2xl font-semibold mb-6">{title}</h2>
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-40 h-56 bg-secondaryBackground rounded-lg animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-mainText text-2xl font-semibold mb-6">{title}</h2>
        <p className="text-thirdText">Error: {error}</p>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-mainText text-2xl font-semibold mb-6">{title}</h2>
        <p className="text-thirdText">No items found</p>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-mainText text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 overflow-x-auto pb-4">
        {items.map((item) => (
          <MediaCard key={item.id} media={item} imageSize={imageSize} />
        ))}
      </div>
    </section>
  );
}
