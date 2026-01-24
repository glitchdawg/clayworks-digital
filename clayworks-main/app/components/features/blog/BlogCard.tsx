import Image from "next/image";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export function BlogCard({
  image,
  title,
  description,
  author,
  date,
}: BlogCardProps) {
  return (
    <article className="bg-white p-4 rounded-2xl border border-gray-100 overflow-hidden shadow-lg cursor-pointer h-[450px] flex flex-col">
      <div className="relative flex-shrink-0 w-full h-[200px] rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={`${title} blog post image`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow mt-4">
        <h3 className="mb-2 text-xl font-inter-bold text-brand-secondary">
          {title}
        </h3>
        <p className="text-gray-700 font-inter-normal text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center gap-2 font-inter-medium text-xs text-gray-700 mt-auto">
          <span className="text-gray-600">
            By <span className="text-purple-600 font-inter-bold">{author}</span>
          </span>
          <span>|</span>
          <span className="text-gray-600">{date}</span>
        </div>
      </div>
    </article>
  );
}
