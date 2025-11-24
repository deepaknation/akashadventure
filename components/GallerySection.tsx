'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    '/gallery/DSC_0020.JPG',
    '/gallery/DSC_0166.JPG',
    '/gallery/DSCN0570.JPG',
    '/gallery/IMG_20200419_094708.jpg',
    '/gallery/IMG_20230519_155709_702.jpg',
    '/gallery/IMG_20251012_145411587_HDR.jpg',
    '/gallery/IMG_20251017_151505215_HDR.jpg',
    '/gallery/IMG_20251017_151509319_HDR.jpg',
    '/gallery/IMG-20251120-WA0002.jpg',
    '/gallery/IMG-20251120-WA0003.jpg',
    '/gallery/IMG-20251120-WA0004.jpg',
    '/gallery/IMG-20251120-WA0005.jpg',
    '/gallery/IMG-20251120-WA0007.jpg',
    '/gallery/20230513_050740.jpg',
    '/gallery/FB_IMG_1763828187409.jpg',
    '/gallery/FB_IMG_1763828388267.jpg',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Adventure <span className="text-orange-500">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Witness the breathtaking moments captured during our adventures
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {images.slice(0, 6).map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg font-semibold">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </section>
  );
}
