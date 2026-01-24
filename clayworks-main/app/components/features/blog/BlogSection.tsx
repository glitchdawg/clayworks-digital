// components/BlogSection.tsx
import { BlogCard } from "./BlogCard";
import Link from "next/link";
import { CardSection } from "../../layout/Section/CardSection";

interface BlogPost {
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
  link?: string;
}

interface BlogSectionProps {
  blogPosts: BlogPost[];
}

export function BlogSection({ blogPosts }: BlogSectionProps) {
  return (
    <CardSection
      cards={blogPosts}
      renderCard={(post) =>
        post.link ? (
          <Link href={post.link}>
            <BlogCard {...post} />
          </Link>
        ) : (
          <BlogCard {...post} />
        )
      }
      desktopGridColumns={4}
      mobileCardWidth="85%"
      ctaText="View All"
      onCtaClick={() => {
        // TODO: Implement navigation to blog listing page

      }}
    />
  );
}
