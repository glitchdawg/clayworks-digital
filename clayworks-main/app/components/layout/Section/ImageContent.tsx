// components/ImageContentSection.tsx
import Image from "next/image";

interface ImageContentSectionProps {
  imagePosition?: "left" | "right";
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  eyebrow?: string;
  title: string;
  description: string;
  imageClassName?: string;
  contentClassName?: string;
}

export function ImageContentSection({
  imagePosition = "left",
  imageSrc,
  imageAlt,
  imageWidth = 800,
  imageHeight = 600,
  eyebrow,
  title,
  description,
  imageClassName = "",
  contentClassName = "",
}: ImageContentSectionProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="grid grid-cols-12 gap-12 mb-12">
      {/* Image Section */}
      <div
        className={`relative col-span-7 ${isImageLeft ? "order-1" : "order-2"}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className={`w-full h-auto object-cover ${imageClassName}`}
        />
      </div>

      {/* Text Section */}
      <div
        className={`flex flex-col justify-start col-span-5 ${isImageLeft ? "order-2" : "order-1"} ${contentClassName}`}
      >
        {eyebrow && (
          <p className="text-base tracking-wider text-black uppercase mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="mb-6 text-4xl font-inter-medium text-[#1A2C42] max-w-80 leading-tight">
          {title}
        </h2>
        <p className="text-[#1A2C42] font-inter-normal max-w-md leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
