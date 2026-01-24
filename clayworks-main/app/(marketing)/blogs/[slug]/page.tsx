import React from "react";
import type { Metadata } from "next";
import Breadcrumb from "../../../components/ui/breadcrumb";
import BlogHero from "../../../components/features/blog/BlogHero";
import { NewsletterSection } from "../../../components/layout/Newsletter";
import { getAllBlogPosts, getBlogDetails } from "../data";
import { BlogSection } from "../../../components/features/blog/BlogSection";
import { BlogArticle } from "../../../components/features/blog/BlogArticle";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const details = getBlogDetails(slug);

  if (!details) {
    return {
      title: "Blog Post Not Found",
      description:
        "The blog post you're looking for doesn't exist or has been removed.",
    };
  }

  return {
    title: details.title,
    description: details.description,
    openGraph: {
      title: `${details.title} | ClayWorks`,
      description: details.listMeta.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"}/blogs/${slug}`,
      siteName: "ClayWorks",
      images: [
        {
          url: details.listMeta.image,
          width: 1200,
          height: 630,
          alt: details.listMeta.imageAlt,
        },
      ],
      locale: "en_IN",
      type: "article",
      authors: [details.author.name],
      publishedTime: details.author.date,
    },
    twitter: {
      card: "summary_large_image",
      title: details.title,
      description: details.listMeta.excerpt,
      images: [details.listMeta.image],
    },
  };
}

const allPosts = getAllBlogPosts(12);

const BlogDetailsPage: React.FC<PageProps> = ({ params }) => {
  const { slug } = React.use(params);

  // Get blog details from data.ts
  const details = getBlogDetails(slug);

  // If blog not found, show not found message
  if (!details) {
    return (
      <div>
        <div className="pt-16 md:!pt-16 lg:!pt-20">
          <div className="container mx-auto">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blogs" },
                { label: "Article" },
              ]}
            />
          </div>
        </div>
        <div className="container mx-auto min-h-screen flex items-center justify-center px-4 md:px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-inter-semibold text-black mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-[#6B7280] mb-8">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <a
              href="/blogs"
              className="inline-block px-6 py-3 bg-[#E07B39] text-white rounded-lg hover:bg-[#D06A28] transition-colors"
            >
              Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Read next: remaining posts excluding current
  const readNext = allPosts.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="bg-white">
      <div className="pt-24 md:!pt-16 lg:!pt-20">
        <div className="container mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blogs" },
              { label: "Article" },
            ]}
          />
        </div>
        <BlogHero
          variant="image-only"
          heroImage={details.heroImage}
          heroImageAlt={details.title}
        />
      </div>

      {/* Blog Article Component */}
      <BlogArticle details={details} />

      {/* Read Next */}
      {/* <h1 className=' mt-10 mx-10 md:mx-0 md:px-20 px-4 text-2xl md:text-3xl lg:text-4xl md:text-left text-center font-inter-semibold text-black'>Read Next</h1> */}
      <BlogSection
        blogPosts={readNext.map((p) => ({
          image: p.image,
          title: p.title,
          description: p.excerpt,
          author: p.author,
          date: p.date,
          link: p.link,
        }))}
      />

      {/* Newsletter */}
      <div className="pb-10">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default BlogDetailsPage;
