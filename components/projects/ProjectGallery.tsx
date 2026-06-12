'use client';

import { useState } from 'react';
import Image from 'next/image';
import LightboxLib from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

type Props = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => { setIndex(i); setOpen(true); };

  const [cover, ...rest] = images;

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <div
          className="col-span-4 md:col-span-3 relative aspect-[16/9] cursor-zoom-in overflow-hidden rounded"
          onClick={() => openAt(0)}
        >
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 75vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        <div className="col-span-4 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-2">
          {rest.slice(0, 4).map((src, i) => (
            <div
              key={src}
              className="relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded"
              onClick={() => openAt(i + 1)}
            >
              <Image
                src={src}
                alt={`${title} ${i + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              {i === 3 && rest.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">
                  +{rest.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <LightboxLib
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom, Thumbnails]}
      />
    </>
  );
}
