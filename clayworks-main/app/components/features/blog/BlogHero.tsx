// components/BlogHero.tsx
"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Types
export interface CategoryTag {
  label: string;
  value: string;
  active?: boolean;
}

export interface FeaturedPost {
  image: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readMoreLink: string;
  categories: string[];
}

export interface BlogHeroProps {
  title?: string;
  description?: string;
  categoryTags?: CategoryTag[][];
  featuredPost?: FeaturedPost;
  onCategoryChange?: (category: string) => void;
  className?: string;
  variant?: "full" | "image-only";
  heroImage?: string;
  heroImageAlt?: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({
  title,
  description,
  categoryTags = [],
  featuredPost,
  onCategoryChange,
  className = "",
  variant = "full",
  heroImage,
  heroImageAlt,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryTags.flat().find((tag) => tag.active)?.value || "",
  );

  const handleCategoryClick = (value: string) => {
    setActiveCategory(value);
    if (onCategoryChange) {
      onCategoryChange(value);
    } else {
      // TODO: Implement category filtering or analytics tracking

    }
  };

  // Image-only variant for blog detail pages
  if (variant === "image-only" && heroImage) {
    return (
      <div className={`bg-white pb-4 md:pb-14 lg:pb-16 ${className}`}>
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="relative h-[200px] sm:h-[280px] md:h-[340px] lg:h-[420px] rounded-2xl overflow-hidden">
            <Image
              src={heroImage}
              alt={heroImageAlt || title || "Blog hero image"}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  // Full variant for blog listing page
  return (
    <div className={`bg-white pb-4 md:pb-14 lg:pb-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-16 items-stretch">
          {/* Left Column - Title, Description, Categories */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10 max-w-xl h-full">
            {/* Title & Description */}
            {title && (
              <div>
                <h1 className="text-3xl md:!text-4xl lg:!text-5xl font-inter-semibold text-black mb-4 md:mb-5 lg:mb-6 leading-tight">
                  {title}
                </h1>
                {description && (
                  <p className="text-[#4A5568] font-inter-normal text-sm md:!text-base lg:!text-lg leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Category Filter Tags */}
            {categoryTags && categoryTags.length > 0 && (
              <div className="space-y-2 md:space-y-3">
                {categoryTags.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-wrap gap-2 md:!gap-2.5"
                  >
                    {row.map((tag) => (
                      <button
                        key={tag.value}
                        type="button"
                        onClick={() => handleCategoryClick(tag.value)}
                        className={`px-2.5 md:px-3 py-1 md:!py-1.5 rounded-full font-inter-medium text-xs transition-all duration-200 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${activeCategory === tag.value
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-[#E0E0E0] hover:border-black hover:bg-gray-50"
                          }`}
                        aria-pressed={activeCategory === tag.value}
                        aria-label={`Filter by ${tag.label} category`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Featured Post Card */}
          {featuredPost && (
            <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              {/* Featured Image */}
              <Link
                href={featuredPost.readMoreLink}
                className="block p-4 md:p-5 lg:p-6"
              >
                <div className="relative h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] overflow-hidden flex-shrink-0 rounded-xl md:rounded-2xl">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-300 rounded-xl md:rounded-2xl"
                  />
                </div>
              </Link>

              {/* Card Content */}
              <div className="px-5 md:!px-6 lg:!px-8 pb-8 space-y-3 md:space-y-4 flex flex-col grow">
                {/* Title */}
                <Link href={featuredPost.readMoreLink}>
                  <h2 className="text-lg md:!text-xl lg:!text-2xl font-inter-semibold text-black leading-tight hover:text-brand-primary transition-colors cursor-pointer">
                    {featuredPost.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 font-inter-normal text-sm md:!text-base leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  href={featuredPost.readMoreLink}
                  className="inline-block text-brand-primary font-inter-medium text-sm md:text-base hover:text-brand-primary-hover transition-colors cursor-pointer"
                >
                  Read More
                </Link>

                {/* Meta Info */}
                <div className="flex items-center gap-2 text-xs md:text-sm text-[#4C4C4C] font-inter-normal">
                  <span>By {featuredPost.author}</span>
                  <span>|</span>
                  <span>{featuredPost.date}</span>
                </div>

                {/* Category Tags */}
                {featuredPost.categories &&
                  featuredPost.categories.length > 0 && (
                    <div
                      className="flex flex-wrap gap-2 pt-2 mt-auto"
                      role="list"
                    >
                      {featuredPost.categories.map((category, index) => (
                        <button
                          key={`${category}-${index}`}
                          type="button"
                          onClick={() =>
                            handleCategoryClick(
                              category
                                .toLowerCase()
                                .replace(/ & /g, "-")
                                .replace(/ /g, "-"),
                            )
                          }
                          className="px-3 py-1.5 border border-[#E0E0E0] text-[#374151] rounded-full text-xs font-inter-medium hover:bg-[#E5E7EB] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2"
                          aria-label={`Filter by ${category} category`}
                          role="listitem"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
