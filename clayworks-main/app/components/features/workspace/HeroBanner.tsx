import React from "react";
import { HeroSection, getStrapiMediaUrl } from "@/app/lib/strapi";

interface HeroBannerProps {
  data?: HeroSection | null;
}

export default function HeroBanner({ data }: HeroBannerProps) {
  // Use data if available, otherwise fallback to hardcoded defaults (or handle empty state)
  // For now, we'll keep the structure but use dynamic values

  const videoUrl = data?.videoUrl || "/images/banner.mp4";
  const backgroundImage = data?.backgroundImage ? getStrapiMediaUrl(data.backgroundImage) : null;

  return (
    <section className="relative h-[60vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background Video or Image */}
      <div className="absolute inset-0">
        {data?.layout === 'video' || (!data?.layout && videoUrl) ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-label={data?.title || "ClayWorks co-working space showcase video"}
          >
            <source src={videoUrl} type="video/mp4" />
            <track kind="captions" srcLang="en" label="English captions" />
            {/* Fallback for browsers that don't support video */}
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <p>Video not supported</p>
              </div>
            </div>
          </video>
        ) : (
          // Image fallback/layout
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage || '/images/workspace.jpg'})` }}
            role="img"
            aria-label={data?.title || "Hero banner"}
          />
        )}

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {data?.title || "ClayWorks"}
          </h1>
          {data?.subtitle && (
            <p className="text-xl md:text-2xl mb-8">
              {data.subtitle}
            </p>
          )}
          {data?.ctaText && data?.ctaLink && (
            <a
              href={data.ctaLink}
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              {data.ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
