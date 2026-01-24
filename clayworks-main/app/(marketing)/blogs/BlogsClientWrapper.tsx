"use client";
import { useState } from "react";
import {
    BlogGrid,
    type BlogGridSection,
} from "../../components/features/blog/BlogGrid";
import type { BlogsCardProps } from "../../components/features/blog/BlogsCard";

interface BlogsClientWrapperProps {
    blogPosts: BlogsCardProps[];
    sections: BlogGridSection[];
    totalPages: number;
}

export function BlogsClientWrapper({
    blogPosts,
    sections,
    totalPages,
}: BlogsClientWrapperProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Safe browser API access
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleNewsletterSubscribe = (email: string) => {
        // TODO: Implement backend API integration for newsletter subscription

    };

    return (
        <BlogGrid
            posts={blogPosts}
            sections={sections}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onNewsletterSubscribe={handleNewsletterSubscribe}
        />
    );
}
