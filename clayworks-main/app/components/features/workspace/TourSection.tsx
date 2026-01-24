"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Dialog, DialogClose, DialogContent } from "../../ui/dialog";

interface TourSectionProps {
  sectionTitle?: string;
  heading?: string;
  description?: string;
  imageSrc: string;
  videoUrl: string;
  layout?: "left" | "right"; // Optional: lets you swap image and text sides
}

export function TourSection({
  sectionTitle = "TAKE A TOUR",
  heading = "What It Feels Like to Work Here",
  description = "Take a virtual walk through our spaces and feel what your next workday could look like.",
  imageSrc,
  videoUrl,
  layout = "right",
}: TourSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="bg-[#E5EEF8] py-16 lg:py-16">
      <div className="container mx-auto px-6">
        {/* Desktop Layout */}
        <div
          className={`hidden lg:grid lg:gap-8 lg:items-start ${
            layout === "left"
              ? "lg:grid-cols-[7fr_3fr]"
              : "lg:grid-cols-[3fr_7fr]"
          }`}
        >
          {/* Left/Right Text Block */}
          <div className={`${layout === "left" ? "order-2" : "order-1"}`}>
            <p className="text-base font-inter-normal text-black uppercase tracking-wider mb-1">
              {sectionTitle}
            </p>
            <h2 className="mb-6 text-3xl md:!text-3xl lg:!text-4xl font-inter-medium text-[#2B2B2B] leading-tight">
              {heading}
            </h2>
            <p className="text-black font-inter-normal text-lg">
              {description}
            </p>
          </div>

          {/* Video Image */}
          <div
            className={`relative group ${
              layout === "left" ? "order-1" : "order-2"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={heading}
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
              <div
                className="absolute inset-0 transition-colors"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 58.17%)",
                }}
              />
              <button
                type="button"
                className="absolute bottom-4 left-2 flex items-center gap-3 bg-transparent text-white px-6 py-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={`Play video: ${heading}`}
                onClick={() => setIsVideoOpen(true)}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <Icon
                    icon="octicon:play-16"
                    className="w-8 h-8 text-white"
                    aria-hidden="true"
                  />
                </div>
                <span className="uppercase tracking-wider font-inter-medium text-white md:!text-base text-sm">
                  Play Video
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden text-center">
          {/* Text Content */}
          <div className="mb-8 space-y-2">
            <p className="text-base font-inter-normal tracking-wider text-black">
              {sectionTitle}
            </p>
            <h2 className="text-3xl font-inter-medium text-[#2B2B2B] leading-tight mb-6">
              {heading}
            </h2>
            <p className="text-[#2B2B2B] text-lg font-inter-normal">
              {description}
            </p>
          </div>

          {/* Video Image */}
          <div
            className="relative group cursor-pointer"
            onClick={() => setIsVideoOpen(true)}
          >
            <div className="relative rounded-2xl overflow-hidden h-[500px]">
              <Image
                src={imageSrc}
                alt={heading}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
              <div
                className="absolute inset-0 transition-colors"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 58.17%)",
                }}
              />
              <button
                type="button"
                className="absolute bottom-4 left-2 flex items-center justify-start gap-2 bg-transparent text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={`Play video: ${heading}`}
                onClick={() => setIsVideoOpen(true)}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <Icon
                    icon="octicon:play-16"
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <span className="uppercase tracking-wider font-inter-medium text-white md:!text-base text-sm">
                  Play Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent
          className="max-w-5xl w-full p-0 bg-black border-0"
          aria-labelledby="video-dialog-title"
        >
          <DialogClose
            className="absolute top-4 right-4 z-50 rounded-full bg-black/50 hover:bg-black/70 p-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close video dialog"
          >
            <X className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <h2 id="video-dialog-title" className="sr-only">
            {heading}
          </h2>
          <div className="relative aspect-video w-full">
            <iframe
              src={videoUrl}
              title={heading}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              aria-label={`Video: ${heading}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
