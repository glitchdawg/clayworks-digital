// components/blog/BlogGrid.tsx
import type React from "react";

import {
  NewsletterSection,
  type NewsletterSectionProps,
} from "../../layout/Newsletter";
import { BlogsCard, type BlogsCardProps } from "./BlogsCard";
import { Pagination } from "../../ui/pagination";
import { PlanCard } from "../pricing/PlanCard";
import CaseStudies, { type CaseStudy } from "../services/CaseStudies";
export interface FeaturedCardProps {
  image: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  tags: string[];
  link: string;
  ctaText?: string;
}
export interface CompactCardProps {
  title: string;
  description: string;
  link: string;
  ctaText?: string;
}

export interface BlogGridSection {
  type: "featured" | "compact-trio" | "newsletter";
  position: number; // After which blog post to insert this section
  data?: FeaturedCardProps | CompactCardProps[] | NewsletterSectionProps;
}

export interface BlogGridProps {
  posts: BlogsCardProps[];
  sections?: BlogGridSection[];
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void; // Optional - component handles internally if not provided
  onNewsletterSubscribe?: (email: string) => void;
}

export const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  sections = [],
  currentPage,
  totalPages,
  onPageChange,
  onNewsletterSubscribe,
}) => {
  const renderContent = () => {
    const gridContent: React.ReactNode[] = [];
    const fullWidthSections: Array<{
      element: React.ReactNode;
      position: number;
      index: number;
    }> = [];
    let postIndex = 0;

    // Sort sections by position
    const sortedSections = [...sections].sort(
      (a, b) => a.position - b.position,
    );

    // Track the last position we've processed
    let lastPosition = 0;

    sortedSections.forEach((section, sectionIdx) => {
      // Only add blog posts if the position has actually advanced
      if (section.position > lastPosition) {
        // Add blog posts from last position to current section position
        while (postIndex < section.position && postIndex < posts.length) {
          gridContent.push(
            <BlogsCard key={`post-${postIndex}`} {...posts[postIndex]} />,
          );
          postIndex++;
        }
        lastPosition = section.position;
      }

      // Add the section - separate newsletters for full-width rendering
      if (section.type === "newsletter") {
        fullWidthSections.push({
          element: (
            <NewsletterSection
              key={`newsletter-${sectionIdx}`}
              {...(section.data as NewsletterSectionProps)}
              onSubscribe={onNewsletterSubscribe}
            />
          ),
          position: section.position,
          index: sectionIdx,
        });
      } else if (section.type === "featured" && section.data) {
        const f = section.data as FeaturedCardProps;
        gridContent.push(
          <div
            key={`section-${sectionIdx}`}
            className="hidden md:block md:col-span-2 lg:col-span-1 lg:mt-12"
          >
            <PlanCard
              imageSrc={f.image}
              imageAlt={f.imageAlt}
              heading={f.title}
              description={f.excerpt}
              tags={f.tags?.map((t) => ({ label: t }))}
              ctaText={f.ctaText || "Read This Case Study"}
              ctaVariant="link"
              imagePosition="left"
            />
          </div>,
        );
      } else if (
        section.type === "compact-trio" &&
        Array.isArray(section.data)
      ) {
        const studies: CaseStudy[] = (section.data as CompactCardProps[]).map(
          (card) => ({
            id: card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            companyName: card.title,
            description: card.description,
            linkText: card.ctaText || "Read This Case Study",
            linkUrl: card.link,
          }),
        );
        gridContent.push(
          <div
            key={`section-${sectionIdx}`}
            className="hidden md:block md:col-span-2 lg:col-span-1 lg:mb-12"
          >
            <CaseStudies caseStudies={studies} className="bg-white py-0" />
          </div>,
        );
      }
    });

    // Add remaining blog posts
    while (postIndex < posts.length) {
      gridContent.push(
        <BlogsCard key={`post-${postIndex}`} {...posts[postIndex]} />,
      );
      postIndex++;
    }

    return { gridContent, fullWidthSections };
  };

  const { gridContent, fullWidthSections } = renderContent();

  // Build rendered sections with newsletters interleaved
  const sortedNewsletters = [...fullWidthSections].sort(
    (a, b) => a.position - b.position,
  );
  type RenderedSection = {
    type: "grid" | "newsletter";
    items?: React.ReactNode[];
    element?: React.ReactNode;
    key: string;
  };
  const renderedSections: RenderedSection[] = [];

  if (sortedNewsletters.length === 0) {
    // No newsletters, just render all grid content
    if (gridContent.length > 0) {
      renderedSections.push({
        type: "grid",
        items: gridContent,
        key: "grid-all",
      });
    }
  } else {
    let gridIdx = 0;
    sortedNewsletters.forEach((newsletter) => {
      // Add grid batch before newsletter
      if (gridIdx < newsletter.position) {
        const batch = gridContent.slice(gridIdx, newsletter.position);
        if (batch.length > 0) {
          renderedSections.push({
            type: "grid",
            items: batch,
            key: `grid-batch-${renderedSections.length}`,
          });
        }
        gridIdx = newsletter.position;
      }

      // Add newsletter
      renderedSections.push({
        type: "newsletter",
        element: newsletter.element,
        key: `newsletter-${newsletter.index}`,
      });
    });

    // Add remaining grid items
    if (gridIdx < gridContent.length) {
      renderedSections.push({
        type: "grid",
        items: gridContent.slice(gridIdx),
        key: `grid-batch-final`,
      });
    }
  }

  return (
    <div className="pt-4 pb-8 md:py-12 lg:py-16">
      {renderedSections.map((section) => {
        if (section.type === "newsletter") {
          return (
            <div key={section.key} className="w-full my-8 md:my-12 lg:my-16">
              {section.element}
            </div>
          );
        }

        return (
          <div key={section.key} className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
              {section.items}
            </div>
          </div>
        );
      })}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="container mx-auto px-4 md:px-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={
              onPageChange ||
              ((page) => {
                // TODO: Implement pagination state management or analytics tracking

                // Default behavior: scroll to top
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              })
            }
          />
        </div>
      )}
    </div>
  );
};
