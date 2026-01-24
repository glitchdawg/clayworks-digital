// components/blog/BlogCard.tsx
import type React from "react";
import Image from "next/image";
import Link from "next/link";

export interface BlogsCardProps {
  image: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  categories: string[];
  link: string;
  variant?: "horizontal" | "vertical";
}

export const BlogsCard: React.FC<BlogsCardProps> = ({
  image,
  imageAlt,
  title,
  excerpt,
  author,
  date,
  categories,
  link,
  variant = "horizontal",
}) => {
  return (
    <Link href={link}>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
        {variant === "vertical" ? (
          <div className="flex flex-col h-full">
            {/* Image on top */}
            <div className="px-4 md:px-5 lg:px-6 pt-4 md:pt-5 lg:pt-6">
              <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] rounded-xl md:rounded-2xl overflow-hidden">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 flex flex-col gap-3">
              <h3 className="text-lg md:text-xl font-inter-semibold text-black leading-tight group-hover:text-[#E07B39] transition-colors">
                {title}
              </h3>
              <p className="text-[#6B7280] font-inter-normal text-sm md:text-base leading-relaxed">
                {excerpt}
              </p>
              <span className="inline-block text-[#E07B39] font-inter-medium text-sm md:text-base hover:text-[#D06A28] transition-colors cursor-pointer">
                Read More
              </span>

              <div className="flex items-center gap-2 pt-1 text-xs md:text-sm text-[#6B7280] font-inter-normal">
                <span>By {author}</span>
                <span>|</span>
                <span>{date}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-0 md:gap-6 h-full">
            {/* Image */}
            <div className="px-4 md:px-5 pt-4 md:pt-5 pb-4 md:pb-5 flex-shrink-0 flex items-center">
              <div className="relative w-full md:w-[180px] lg:w-[200px] h-[200px] rounded-xl overflow-hidden">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 md:p-6 md:py-5 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-inter-semibold text-black leading-tight mb-3 group-hover:text-[#E07B39] transition-colors line-clamp-2">
                  {title}
                </h3>
                <p className="text-[#6B7280] font-inter-normal text-sm leading-relaxed mb-1 line-clamp-2">
                  {excerpt}
                </p>
                <span className="inline-block text-[#E07B39] font-inter-medium text-sm hover:text-[#D06A28] transition-colors cursor-pointer mb-4">
                  Read More
                </span>
              </div>

              <div className="space-y-3">
                {/* Meta Info */}
                <div className="flex items-center gap-2 text-xs text-[#6B7280] font-inter-normal">
                  <span>By {author}</span>
                  <span>|</span>
                  <span>{date}</span>
                </div>

                {/* Category Tags */}
                {categories && categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 border border-[#E0E0E0] text-[#374151] rounded-full text-xs font-inter-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
