import type React from "react";
import Image from "next/image";
import type { BlogDetails } from "../../../(marketing)/blogs/data";

interface BlogArticleProps {
  details: BlogDetails;
}

export const BlogArticle: React.FC<BlogArticleProps> = ({ details }) => {
  const { title, sections, midImage, tailSections, author } = details;

  if (!author) {
    return null;
  }

  return (
    <>
      {/* Article Body */}
      <div className="container px-4 md:px-6 py-10 md:py-14 md:mt-20 lg:mt-20 mt-10">
        <div className="max-w-4xl mx-auto">
          {/* Blog Title */}
          {title && (
            <h1 className="text-2xl md:text-4xl lg:text-5xl max-w-3xl mx-auto font-inter-semibold text-black mb-6 md:mb-8 leading-tight">
              {title}
            </h1>
          )}

          <div className="space-y-6 md:space-y-7 lg:space-y-8 text-[#1A2C42] font-inter-normal leading-relaxed text-sm md:!text-base">
            {sections.map((paragraph) => (
              <div
                className="max-w-3xl mx-auto"
                key={`section-${paragraph.slice(0, 20)}-${paragraph.length}`}
              >
                <p>{paragraph}</p>
              </div>
            ))}

            {/* Mid Image */}
            {midImage && (
              <figure className="my-6 md:my-8 lg:my-10">
                <div className="relative w-full h-[200px] sm:h-[260px] md:h-[320px] rounded-xl overflow-hidden">
                  <Image
                    src={midImage}
                    alt={`Illustration for ${title}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            )}

            {tailSections.map((paragraph) => (
              <div
                className="max-w-3xl mx-auto"
                key={`tail-${paragraph.slice(0, 20)}-${paragraph.length}`}
              >
                <p>{paragraph}</p>
              </div>
            ))}
          </div>

          {/* Author */}
          <div className="mt-8 md:mt-10 lg:mt-12 max-w-3xl mx-auto bg-white rounded-2xl flex items-center gap-4">
            <div
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0"
              aria-hidden="true"
            >
              <Image
                src={author.avatar}
                alt={`${author.name}, ${author.role}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base font-inter-semibold text-black">
                {author.name}
              </p>
              <p className="text-xs md:text-sm text-[#6B7280]">
                {author.role} • {author.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
