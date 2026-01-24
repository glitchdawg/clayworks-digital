/**
 * Strapi API Client for ClayWorks
 * 
 * This module provides typed API access to the Strapi CMS through the Go middleware.
 * It includes caching, error handling, and fallback to static data.
 */

// Types for Strapi content
export interface StrapiResponse<T> {
    data: T;
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface HeroSection {
    id: number;
    title: string;
    subtitle?: string;
    badge?: string;
    description?: string;
    videoUrl?: string;
    backgroundImage?: StrapiMedia;
    ctaText?: string;
    ctaLink?: string;
    page: string;
    layout: 'video' | 'image-left' | 'image-right' | 'centered';
    showForm: boolean;
    order: number;
}

export interface Location {
    id: number;
    slug: string;
    name: string;
    title: string;
    subtitle?: string;
    address: string;
    travelTime?: string;
    distance?: string;
    hasPowerBackup: boolean;
    seats?: number;
    metroDistance?: string;
    latitude?: number;
    longitude?: number;
    featuredImage?: StrapiMedia;
    gallery?: StrapiMedia[];
    amenities?: string[];
    tags?: string[];
    featured: boolean;
    order: number;
}

export interface Testimonial {
    id: number;
    name: string;
    position: string;
    company: string;
    content: string;
    avatar?: StrapiMedia;
    rating?: number;
    featured: boolean;
    order: number;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    featuredImage?: StrapiMedia;
    author?: string;
    publishedAt?: string;
    categories?: string[];
    tags?: string[];
    featured: boolean;
}

export interface CaseStudy {
    id: number;
    companyName: string;
    slug: string;
    description: string;
    fullContent?: string;
    linkText: string;
    featuredImage?: StrapiMedia;
    industryTags?: string[];
    featured: boolean;
    order: number;
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
    category?: FAQCategory;
    order: number;
}

export interface FAQCategory {
    id: number;
    name: string;
    slug: string;
    order: number;
    faqs?: FAQ[];
}

export interface JobListing {
    id: number;
    title: string;
    slug: string;
    department: string;
    location: string;
    locationType: 'on-site' | 'remote' | 'hybrid';
    description: string;
    fullDescription?: string;
    category?: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    isActive: boolean;
}

export interface TeamMember {
    id: number;
    name: string;
    title: string;
    bio?: string;
    image?: StrapiMedia;
    linkedIn?: string;
    twitter?: string;
    order: number;
    featured: boolean;
}

export interface Partner {
    id: number;
    name: string;
    logo?: StrapiMedia;
    website?: string;
    featured: boolean;
    order: number;
}

export interface SiteSettings {
    siteName: string;
    tagline?: string;
    contactPhone?: string;
    contactPhoneDisplay?: string;
    contactEmail?: string;
    logo?: StrapiMedia;
    favicon?: StrapiMedia;
    socialLinks?: Record<string, string>;
    footerText?: string;
    googleAnalyticsId?: string;
}

export interface StrapiMedia {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
}

// Configuration
const MIDDLEWARE_URL = process.env.NEXT_PUBLIC_MIDDLEWARE_URL || 'http://localhost:8080';
const API_KEY = process.env.STRAPI_API_KEY || process.env.NEXT_PUBLIC_API_KEY || '';
const CACHE_REVALIDATE = parseInt(process.env.CACHE_REVALIDATE || '60', 10);

// Helper to build headers
function getHeaders(): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (API_KEY) {
        headers['X-API-Key'] = API_KEY;
    }

    return headers;
}

// Fetch wrapper with error handling
async function fetchFromMiddleware<T>(
    endpoint: string,
    options: { revalidate?: number; preview?: boolean } = {}
): Promise<T | null> {
    const { revalidate = CACHE_REVALIDATE, preview = false } = options;

    try {
        const url = preview
            ? `${MIDDLEWARE_URL}/api/v1/preview${endpoint}`
            : `${MIDDLEWARE_URL}/api/v1/content${endpoint}`;

        const response = await fetch(url, {
            headers: getHeaders(),
            next: preview ? { revalidate: 0 } : { revalidate },
        });

        if (!response.ok) {
            console.error(`Strapi fetch error: ${response.status} for ${endpoint}`);
            return null;
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        console.error(`Failed to fetch from Strapi: ${endpoint}`, error);
        return null;
    }
}

// ============================================================================
// Content Fetchers
// ============================================================================

export async function getHeroSection(
    page: string,
    preview = false
): Promise<HeroSection | null> {
    const data = await fetchFromMiddleware<StrapiResponse<HeroSection[]>>(
        `/hero-sections?filters[page][$eq]=${page}&populate=*`,
        { preview }
    );

    return data?.data?.[0] || null;
}

export async function getLocations(
    options: { featured?: boolean; limit?: number; preview?: boolean } = {}
): Promise<Location[]> {
    const { featured, limit = 100, preview = false } = options;

    let endpoint = `/locations?populate=*&pagination[pageSize]=${limit}&sort=order:asc`;
    if (featured !== undefined) {
        endpoint += `&filters[featured][$eq]=${featured}`;
    }

    const data = await fetchFromMiddleware<StrapiResponse<Location[]>>(endpoint, { preview });
    return data?.data || [];
}

export async function getLocationBySlug(
    slug: string,
    preview = false
): Promise<Location | null> {
    const data = await fetchFromMiddleware<StrapiResponse<Location[]>>(
        `/locations?filters[slug][$eq]=${slug}&populate=*`,
        { preview }
    );

    return data?.data?.[0] || null;
}

export async function getTestimonials(
    options: { featured?: boolean; limit?: number; preview?: boolean } = {}
): Promise<Testimonial[]> {
    const { featured, limit = 20, preview = false } = options;

    let endpoint = `/testimonials?populate=*&pagination[pageSize]=${limit}&sort=order:asc`;
    if (featured !== undefined) {
        endpoint += `&filters[featured][$eq]=${featured}`;
    }

    const data = await fetchFromMiddleware<StrapiResponse<Testimonial[]>>(endpoint, { preview });
    return data?.data || [];
}

export async function getBlogPosts(
    options: { featured?: boolean; limit?: number; preview?: boolean } = {}
): Promise<BlogPost[]> {
    const { featured, limit = 10, preview = false } = options;

    let endpoint = `/blog-posts?populate=*&pagination[pageSize]=${limit}&sort=publishedAt:desc`;
    if (featured !== undefined) {
        endpoint += `&filters[featured][$eq]=${featured}`;
    }

    const data = await fetchFromMiddleware<StrapiResponse<BlogPost[]>>(endpoint, { preview });
    return data?.data || [];
}

export async function getBlogPostBySlug(
    slug: string,
    preview = false
): Promise<BlogPost | null> {
    const data = await fetchFromMiddleware<StrapiResponse<BlogPost[]>>(
        `/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
        { preview }
    );

    return data?.data?.[0] || null;
}

export async function getCaseStudies(
    options: { featured?: boolean; limit?: number; preview?: boolean } = {}
): Promise<CaseStudy[]> {
    const { featured, limit = 10, preview = false } = options;

    let endpoint = `/case-studies?populate=*&pagination[pageSize]=${limit}&sort=order:asc`;
    if (featured !== undefined) {
        endpoint += `&filters[featured][$eq]=${featured}`;
    }

    const data = await fetchFromMiddleware<StrapiResponse<CaseStudy[]>>(endpoint, { preview });
    return data?.data || [];
}

export async function getFAQs(
    categorySlug?: string,
    preview = false
): Promise<FAQ[]> {
    let endpoint = '/faqs?populate=*&sort=order:asc';
    if (categorySlug) {
        endpoint += `&filters[category][slug][$eq]=${categorySlug}`;
    }

    const data = await fetchFromMiddleware<StrapiResponse<FAQ[]>>(endpoint, { preview });
    return data?.data || [];
}

export async function getFAQCategories(preview = false): Promise<FAQCategory[]> {
    const data = await fetchFromMiddleware<StrapiResponse<FAQCategory[]>>(
        '/faq-categories?populate=faqs&sort=order:asc',
        { preview }
    );

    return data?.data || [];
}

export async function getJobListings(
    options: { department?: string; active?: boolean; preview?: boolean } = {}
): Promise<JobListing[]> {
    const { department, active = true, preview = false } = options;

    let endpoint = '/job-listings?populate=*';
    if (active !== undefined) {
        endpoint += `&filters[isActive][$eq]=${active}`;
    }
    if (department) {
        endpoint += `&filters[department][$eq]=${department}`;
    }

    const data = await fetchFromMiddleware<StrapiResponse<JobListing[]>>(endpoint, { preview });
    return data?.data || [];
}

export async function getTeamMembers(
    options: { featured?: boolean; preview?: boolean } = {}
): Promise<TeamMember[]> {
    const { featured, preview = false } = options;

    let endpoint = '/team-members?populate=*&sort=order:asc';
    if (featured !== undefined) {
        endpoint += `&filters[featured][$eq]=${featured}`;
    }

    const data = await fetchFromMiddleware<StrapiResponse<TeamMember[]>>(endpoint, { preview });
    return data?.data || [];
}

export async function getPartners(
    options: { featured?: boolean; preview?: boolean } = {}
): Promise<Partner[]> {
    const { featured, preview = false } = options;

    let endpoint = '/partners?populate=*&sort=order:asc';
    if (featured !== undefined) {
        endpoint += `&filters[featured][$eq]=${featured}`;
    }

    const data = await fetchFromMiddleware<StrapiResponse<Partner[]>>(endpoint, { preview });
    return data?.data || [];
}

export async function getSiteSettings(preview = false): Promise<SiteSettings | null> {
    const data = await fetchFromMiddleware<StrapiResponse<SiteSettings>>(
        '/site-setting?populate=*',
        { preview }
    );

    return data?.data || null;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the full URL for a Strapi media file
 */
export function getStrapiMediaUrl(media?: StrapiMedia): string {
    if (!media?.url) return '';

    // If URL is already absolute, return it
    if (media.url.startsWith('http')) {
        return media.url;
    }

    // Otherwise, prepend Strapi URL
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    return `${strapiUrl}${media.url}`;
}

/**
 * Get responsive image URL (thumbnail, small, medium, large)
 */
export function getStrapiImageUrl(
    media?: StrapiMedia,
    size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'
): string {
    if (!media) return '';

    if (size === 'original') {
        return getStrapiMediaUrl(media);
    }

    const format = media.formats?.[size];
    return format ? getStrapiMediaUrl({ url: format.url }) : getStrapiMediaUrl(media);
}
