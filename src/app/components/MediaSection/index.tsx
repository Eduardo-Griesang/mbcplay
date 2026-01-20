'use client';

import { MediaItem } from '@/context/MediaContext';
import MediaCard from '../MediaCard';
import Link from 'next/link';

interface MediaSectionProps {
  title: string;
  items: MediaItem[];
  loading: boolean;
  error: string | null;
  mediaType: 'movie' | 'tv';
  imageSize?: 'small' | 'medium' | 'large';
  main?: boolean
}

export default function MediaSection({
  title,
  items,
  loading,
  error,
  mediaType,
  imageSize = 'medium',
  main = false
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
        <p className="text-thirdText">Ocorreu um erro: {error}</p>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-mainText text-2xl font-semibold mb-6">{title}</h2>
        <p className="text-thirdText">Nenhum item encontrado</p>
      </section>
    );
  }

  let link = '';
  let width = '';
  let pad = '';
  if (mediaType === 'movie') {
    link = '/Films'
  } else if (mediaType === 'tv') {
    link = '/Series'
  }

  if (main) {
    width = 'md:w-4/5 '
  } else {
    pad = 'pr-7'
  }

  return (
    <section className={`mb-12 pr-7 md:pr-0 ${width} ${pad}`}>
      <div className='mb-6 flex justify-between'>
        <h2 className="text-mainText text-2xl font-semibold">{title}</h2>
        {main && 
          <Link href={link} className='font-semibold text-lg text-fourthText'>Veja tudo</Link>
        }
      </div>
      <section className="flex justify-between items-center flex-wrap gap-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <MediaCard key={item.id} media={item} mediaType={mediaType} imageSize={imageSize} />
        ))}
      </section>
    </section>
  );
}
