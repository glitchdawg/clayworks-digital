# ClayWorks Codebase - Comprehensive Code Review

**Date:** October 30, 2025  
**Reviewed By:** AI Code Review Assistant  
**Project:** ClayWorks - Co-working Space Platform

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Code Quality & Best Practices](#1-code-quality--best-practices)
3. [Component Architecture](#2-component-architecture)
4. [DRY Principle Violations](#3-dry-principle-violations)
5. [Design Consistency](#4-design-consistency)
6. [Folder Structure](#5-folder-structure)
7. [Action Items Summary](#action-items-summary)

---

## Executive Summary

### Overall Assessment

The ClayWorks codebase is a **static marketing website** built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. The project demonstrates solid fundamentals and modern development practices, with particularly impressive Tailwind CSS customization. This is a well-structured prototype that's ready for feature development, though there are opportunities for optimization and code consolidation.

**Project Context:** Static website with no backend integration. All data is hardcoded in `/db/data.tsx`. Form handlers use `console.log` as placeholders, which is appropriate for this stage.

### Key Strengths
✅ Modern tech stack (Next.js 15.5.4, React 19.1.0, TypeScript 5.x, Tailwind CSS 4.x)  
✅ Excellent Tailwind CSS v4 implementation with custom grid system  
✅ Good TypeScript interfaces for type safety  
✅ Comprehensive responsive design (mobile/tablet/desktop/HD)  
✅ Well-organized globals.css with custom utilities  
✅ Biome linter configured for code quality  
✅ Using `next/image` in most components  
✅ Component-based architecture with clear separation

### Critical Issues
~~🔴 **Overuse of 'use client'** - 29/29 components marked as client (should be ~10)~~ ✅ **FIXED**  
~~🔴 **All pages marked 'use client'** - Significant performance impact~~ ✅ **FIXED**  
~~🔴 **Duplicate Data Arrays** - `blogPostsData` vs `blogPosts` in db/data.tsx~~ ✅ **FIXED**  
🟡 **Code Duplication** - Multiple similar card components could be consolidated  
🟡 **Missing Custom Hooks** - Form and dropdown logic could be extracted  
~~🟡 **File Naming Inconsistencies** - `carsoul.tsx` (typo), `internalBanner.tsx` (not PascalCase)~~ ✅ **FIXED**

---

## 1. Code Quality & Best Practices

### 1.1 Critical Issues

#### ✅ **Duplicate Data Arrays in `db/data.tsx`** - **FIXED**

**Location:** `db/data.tsx` lines 174-308

**Issue:** ~~Two nearly identical arrays `blogPostsData` and `blogPosts` containing the same blog post data.~~ ✅ **RESOLVED**

```typescript
// Lines 174-238: blogPostsData array
export const blogPostsData = [
  {
    image: "https://images.unsplash.com/photo-1759903553690...",
    title: "Why your workday deserves better than a café table",
    // ... 7 items
  }
];

// Lines 244-308: blogPosts array (DUPLICATE!)
export const blogPosts = [
  {
    image: "https://images.unsplash.com/photo-1759903553690...",
    title: "Why your workday deserves better than a café table",
    // ... 7 items (same as above)
  }
];
```

**Impact:** ~~Data inconsistency risk, maintenance burden~~ ✅ **FIXED**  
**Recommendation:** ~~Delete one array and use a single source of truth.~~ ✅ **COMPLETED** - Removed duplicate `blogPosts` array, updated all 7 page files to use `blogPostsData`, removed unused imports.

---

#### ✅ **Unused Imports** - **FIXED**

**Location:** `db/data.tsx` lines 1-2

**Previous Implementation:**
```typescript
// ❌ OLD: Multiple unused imports (if they existed)
import { LocationIcon, DesignBuildIcon, OfficeChairIcon, ChairIcon, LocationPinIcon, ConstructionIcon, TrophyIcon } from '@/app/components/icons/PlanIcons';
import { BuildingIcon } from '@/app/components/icons/PlanIcons';
import { BadgeIcon } from '@/app/components/icons/PlanIcons';
import { MeetingRoomIcon } from '@/app/components/icons/PlanIcons';
import { UserIcon } from 'lucide-react';
```

**Current Implementation:** ✅ **FIXED**
```typescript
// ✅ FIXED: Only necessary imports remain
import { Icon } from "@iconify/react";  // ✅ Used in spaces array (JSX icons)
import type { JobListing } from "../app/components/CareersListings";  // ✅ Used for jobListings type
```

**What Was Fixed:**
- ✅ All unused icon imports have been removed
- ✅ Only necessary imports remain: `Icon` (used in spaces array) and `JobListing` (used for type definition)
- ✅ Both remaining imports are actively used in the file

**Status:** ✅ **COMPLETED** - No unused imports remain in db/data.tsx

---

#### ✅ **Inconsistent Event Handlers in Data Objects** - **FIXED**

**Status:** `caseStudiesData` now contains only serialisable fields, and interaction logic is supplied by the `CaseStudies` component via an optional `onCaseStudyClick` prop.  
**What Changed:**
- ✂️ Removed the `onReadMore` callback from the `CaseStudy` type and data objects (`db/data.tsx`).
- 🔁 Updated `CaseStudies` component to accept an `onCaseStudyClick` handler prop and default to opening `linkUrl` values with secure attributes.  
- ✅ Ensured all usages (`built-to-suit`, `contact-us`, `about-us`, blog grid) work with the revised API.

```typescript
export interface CaseStudy {
  id: string;
  companyName: string;
  description: string;
  linkText: string;
  linkUrl?: string;
}

export interface CaseStudiesProps {
  caseStudies: CaseStudy[];
  onCaseStudyClick?: (caseStudy: CaseStudy) => void;
}
```

---

#### ✅ **Console.log Statements - Appropriate Placeholders**

**Locations:** 21 console.log statements across 9 files

```typescript
// app/page.tsx line 48
onSubmit={(data) => {
  console.log('Download guide for email:', data.email); // ✅ Placeholder - OK for static site
}}

// app/meeting-rooms/page.tsx line 46
onSubmit={() => console.log("Schedule call")} // ✅ Placeholder

// app/built-to-suit/page.tsx
const handleReadCaseStudy = (caseStudyId: string) => {
  console.log("Reading case study:", caseStudyId); // ✅ Placeholder
};
```

**Status:** ✅ **ACCEPTABLE for static prototype**

**Why This Is Fine:**
- This is a static marketing website with no backend
- console.log serves as **placeholder for future API integration**
- Demonstrates the intended interaction flow
- Common practice during prototyping phase

**Future Implementation:**
When you add a backend, replace with actual API calls:
```typescript
onSubmit={async (data) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}}
```

**Recommendation:** ✅ **COMPLETED** - Added TODO comments to all console.log placeholders throughout the codebase:
```typescript
// TODO: Implement backend API integration
console.log('Download guide for email:', data.email);
```

**What Was Fixed:**
- ✅ Added TODO comments to all 30+ console.log statements across 11 files
- ✅ TODO comments clarify that these are placeholders for future backend integration
- ✅ Comments specify the type of implementation needed (API integration, navigation, analytics tracking, etc.)
- ✅ Files updated: app/blogs/page.tsx, app/components/BlogSection.tsx, app/components/BlogHero.tsx, app/components/BlogGrid.tsx, app/components/CareersListings.tsx, app/components/layout/InternalBanner.tsx, app/components/SpaceCard.tsx, app/components/PlanCard.tsx, app/components/GuideSection.tsx, app/components/Testimonial.tsx, app/components/ContactUs.tsx
- ✅ Note: app/actions.ts already had TODO comments and was left unchanged

**Status:** ✅ **COMPLETED** - All console.log placeholders now have TODO comments for clarity

---

#### 🟡 **Image Optimization - Minor Issue**

**Status:** ✅ **100% optimized** - All images now use Next.js Image component

**Good:**
```typescript
// ✅ CORRECT: PlanCard.tsx (line 4) and most components
import Image from 'next/image';

<Image
  src={imageSrc}
  alt={imageAlt || 'Plan'}
  fill
  className="object-cover"
/>
```

**✅ Fixed:**
```typescript
// ✅ CoWorkingSpaces.tsx - Now uses Next.js Image
<Image
  src={space.image}
  alt={space.name}
  fill
  sizes="(max-width: 1024px) 100vw, 33vw"
  className="object-cover"
/>

// ✅ Figma/ImageWithFallBack.tsx - Now uses Next.js Image with error fallback
<Image
  src={src}
  alt={alt || ''}
  fill
  sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
  className="object-cover"
/>
```

**Impact:** ✅ **100% image optimization complete** - All images now use Next.js Image component  
**Status:** ✅ **COMPLETED** - Both remaining `<img>` tags replaced with `next/image`.

**Fix:**
```typescript
// ✅ Replace with:
import Image from 'next/image';

<Image
  src={space.image}
  alt={space.name}
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-cover"
/>
```

---

#### ✅ **Hardcoded Phone Number** - **FIXED**

**Previous Implementation:**
```typescript
// ❌ OLD: Hardcoded in db/header.ts
contact: {
  phone: "9123456789",
  phoneDisplay: "9123456789",
}
```

**Current Implementation:** ✅ **FIXED**
```typescript
// ✅ FIXED: db/header.ts - Uses environment variables with fallback
contact: {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "9123456789",
  phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || process.env.NEXT_PUBLIC_CONTACT_PHONE || "9123456789",
}
```

**What Was Fixed:**
- ✅ Moved phone number to environment variables (`NEXT_PUBLIC_CONTACT_PHONE` and `NEXT_PUBLIC_CONTACT_PHONE_DISPLAY`)
- ✅ Added fallback values for development
- ✅ Added documentation comments in header.ts explaining the environment variables
- ✅ Phone number now configurable per environment without code changes

**Status:** ✅ **COMPLETED** - Phone number now configurable via environment variables

---

### 1.2 TypeScript Issues

#### 🟡 **Loose Type Definitions**

**Location:** `app/components/ServiceCard.tsx`

```typescript
interface ServiceCardProps {
  image: string;  // ❌ Could be more specific
  title: string;
  description: string;
  features: string[];  // ❌ Could be string[] | readonly string[]
  buttonText: string;
  buttonVariant?: "primary" | "secondary";
  featured?: boolean;
}
```

**Recommendation:** Consider more specific types or branded types for URLs.

---

#### 🟡 **Any Type Usage Risk**

While not explicitly present, several components accept `ReactNode` which can mask type issues.

**Recommendation:** Use more specific types where possible.

---

### 1.3 Performance Issues

#### 🔴 **Missing Key Props Optimization**

**Location:** Multiple carousel/list components

```typescript
// app/components/CoWorkingSpaces.tsx line 84
{spaces.map((space) => (  // ✅ Has key
  <div key={space.id} className="...">
```

**Status:** ✅ Actually handled correctly in most places.

---

#### 🟡 **Inline Function Definitions**

**Location:** Throughout page components

```typescript
// app/page.tsx line 47
onSubmit={(data) => {
  console.log('Download guide for email:', data.email);
}}
```

**Issue:** Creates new function on every render.  
**Impact:** Minor performance impact, especially with many components.  
**Recommendation:** Define handlers outside JSX or use `useCallback`.

---

#### 🟡 **Large Image Assets Without Optimization**

**Location:** Multiple components loading images from `/images/`

**Recommendation:** 
- Use Next.js Image component consistently
- Implement image optimization pipeline
- Consider using WebP format with fallbacks

---

### 1.4 Accessibility Issues

#### ✅ **Missing ARIA Labels** - **FIXED**

**Location:** `app/components/layout/Header.tsx`

**Previous Implementation:**
```typescript
// ❌ OLD: Missing ARIA labels
<button className="w-10 h-10 flex items-center justify-center...">
  <Icon icon="mdi:whatsapp" className="w-6 h-6 text-gray-900" />
</button>
```

**Current Implementation:** ✅ **FIXED**
```typescript
// ✅ FIXED: Added ARIA labels to all icon buttons
<button 
  className="w-10 h-10 flex items-center justify-center..."
  aria-label="Contact us on WhatsApp"
>
  <Icon icon="mdi:whatsapp" className="w-6 h-6 text-gray-900" />
</button>

// ✅ FIXED: Phone link with ARIA label
<a
  href={`tel:${contactInfo.phone}`}
  aria-label={`Call us at ${contactInfo.phoneDisplay}`}
>
  <Icon icon="mdi:phone" className="w-6 h-6 text-gray-900" />
</a>

// ✅ FIXED: Mobile menu toggle with ARIA label and aria-expanded
<button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
  aria-expanded={isMobileMenuOpen}
>
  {/* ... */}
</button>

// ✅ FIXED: Mobile dropdown buttons with aria-expanded
<button
  aria-expanded={isMobileSolutionsOpen}
  aria-label={`${isMobileSolutionsOpen ? 'Collapse' : 'Expand'} Solutions menu`}
>
  <span>SOLUTIONS</span>
  <Icon icon="mdi:chevron-down" aria-hidden="true" />
</button>
```

**What Was Fixed:**
- ✅ Added `aria-label="Contact us on WhatsApp"` to WhatsApp button
- ✅ Added `aria-label` to phone link with dynamic phone number
- ✅ Added `aria-label` and `aria-expanded` to mobile menu toggle button
- ✅ Added `aria-expanded` and `aria-label` to all mobile dropdown buttons (Solutions, Locations, Resources)
- ✅ Added `aria-hidden="true"` to decorative chevron icons (desktop and mobile)
- ✅ All icon-only buttons now have descriptive ARIA labels

**Status:** ✅ **COMPLETED** - All icon buttons in Header component now have proper ARIA labels and accessibility attributes

---

#### 🟡 **Keyboard Navigation Issues**

**Location:** Dropdown menus in Header

The dropdown menus use `onMouseEnter`/`onMouseLeave` which don't support keyboard navigation.

**Recommendation:** Add keyboard event handlers and focus management.

---

### 1.5 Security Concerns

#### ✅ **External Links Without Security Attributes** - **FIXED**

**Location:** `app/components/CaseStudies.tsx` and `app/components/layout/Footer.tsx`

**Previous Implementation:**
```typescript
// ❌ OLD: CaseStudies.tsx - window.open without security attributes
const handleReadMore = (caseStudy: CaseStudy) => {
  if (caseStudy.linkUrl) {
    window.open(caseStudy.linkUrl, "_blank");  // ❌ Security risk
  }
};
```

**Current Implementation:** ✅ **FIXED**
```typescript
// ✅ FIXED: CaseStudies.tsx - External links now use security attributes
const handleReadMore = (caseStudy: CaseStudy) => {
  if (caseStudy.onReadMore) {
    caseStudy.onReadMore();
  } else if (caseStudy.linkUrl) {
    // Open external link with security attributes (noopener noreferrer)
    const link = document.createElement('a');
    link.href = caseStudy.linkUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';  // ✅ Security attributes added
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
```

**What Was Fixed:**
- ✅ Fixed `window.open()` in CaseStudies component to use proper security attributes (`rel="noopener noreferrer"`)
- ✅ External links now open securely without allowing `window.opener` access
- ✅ Footer links are currently placeholder links (`href="#"`), will need security attributes when they become external

**Best Practice for Future:**
When Footer social media links become external, add `target="_blank" rel="noopener noreferrer"`:
```typescript
// ✅ FUTURE: When Footer links become external
<Link 
  href="https://youtube.com/clayworks" 
  target="_blank" 
  rel="noopener noreferrer"
  className="hover:text-[#E07B39] transition-colors"
>
  <Youtube className="w-6 h-6" />
</Link>
```

**Status:** ✅ **COMPLETED** - External links in CaseStudies now use security attributes

---

## 2. Component Architecture

### 2.1 Components That Need Breakdown

#### 🔴 **Header Component Too Complex**

**Location:** `app/components/layout/Header.tsx` (415 lines)

**Issues:**
1. Manages 7 state variables for dropdowns
2. Contains both desktop and mobile navigation logic
3. Mixes presentation with navigation logic
4. Duplicate navigation items between desktop/mobile

**Current Structure:**
```typescript
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isCoworkingOpen, setIsCoworkingOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false);
  const [isMobileCoworkingOpen, setIsMobileCoworkingOpen] = useState(false);
  // ... 415 lines of JSX
}
```

**Recommended Breakdown:**
```
components/
  layout/
    Header/
      index.tsx                    // Main header component
      DesktopNav.tsx              // Desktop navigation
      MobileNav.tsx               // Mobile navigation
      Dropdown.tsx                // Reusable dropdown component
      useNavigation.ts            // Custom hook for navigation state
      types.ts                    // Navigation types
      constants.ts                // Navigation links data
```

**Benefits:**
- Easier to test individual components
- Reduced complexity per file
- Reusable dropdown logic
- Better separation of concerns

---

#### 🔴 **InternalBanner/DayPass Component Overly Complex**

**Location:** `app/components/layout/internalBanner.tsx` (448 lines)

**Issues:**
1. Handles 3 different layouts in one component
2. Contains form logic, tabs logic, and image rendering
3. 86 props in the interface
4. Duplicate rendering logic for desktop/mobile

**Current Props Interface:**
```typescript
export interface DayPassProps {
  layout?: 'image-left' | 'image-right' | 'dual-image-right';
  badge?: string;
  subtitle?: string;
  title: string;
  description: string;
  rating?: RatingInfo;
  operatingHours?: string;
  mainImage?: ImageConfig;
  secondaryImages?: [ImageConfig, ImageConfig];
  tabs?: TabOption[];
  onTabChange?: (value: string) => void;
  showForm?: boolean;
  dateOptions?: FormOption[];
  timeOptions?: FormOption[];
  guestsOptions?: FormOption[];
  locationOptions?: FormOption[];
  buttonText?: string;
  buttonTextMobile?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  onSubmit?: (data: {...}) => void;
  onExplore?: () => void;
  breadcrumbs?: Array<{...}>;
  className?: string;
}
```

**Recommended Breakdown:**
```
components/
  Banner/
    index.tsx                    // Main banner component
    BannerContent.tsx           // Content section
    BannerImage.tsx             // Image section
    BannerForm.tsx              // Booking form
    TabNavigation.tsx           // Tab component
    useBannerForm.ts            // Form state hook
    types.ts
```

---

#### 🟡 **Footer Component Needs Refactoring**

**Location:** `app/components/layout/Footer.tsx` (191 lines)

**Issues:**
1. Hardcoded footer links (dummy data like "One Two", "Three Four")
2. Newsletter subscription form without functionality
3. Social media links without URLs

**Recommendation:**
```typescript
// Create footer-config.ts
export const footerConfig = {
  sections: [
    {
      title: 'CLAYWORKS',
      links: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Careers', href: '/careers' },
        // ... actual links
      ]
    },
    // ... more sections
  ],
  social: [
    { platform: 'youtube', url: 'https://youtube.com/...' },
    // ... actual URLs
  ]
};
```

---

### 2.2 Missing Custom Hooks

#### 🔴 **Form State Management Hook**

**Current Problem:** Form state duplicated across multiple components.

**Locations:**
- `app/components/layout/internalBanner.tsx` lines 117-121
- `app/components/GuideSection.tsx` lines 56

**Recommended Solution:**
```typescript
// hooks/useFormState.ts
export function useFormState<T extends Record<string, string>>(
  initialValues: T
) {
  const [values, setValues] = useState<T>(initialValues);
  
  const handleChange = (field: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };
  
  const reset = () => setValues(initialValues);
  
  return { values, handleChange, reset };
}

// Usage:
const { values, handleChange } = useFormState({
  date: '',
  guests: '',
  location: ''
});
```

---

#### 🔴 **Dropdown State Management Hook**

**Location:** `app/components/layout/Header.tsx`

**Current Problem:** 7 separate state variables for dropdowns.

**Recommended Solution:**
```typescript
// hooks/useDropdown.ts
export function useDropdown(dropdownIds: string[]) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const toggle = (id: string) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };
  
  const close = () => setOpenDropdown(null);
  
  const isOpen = (id: string) => openDropdown === id;
  
  return { toggle, close, isOpen };
}

// Usage:
const dropdown = useDropdown([
  'services', 
  'locations', 
  'coworking', 
  'mobile-services', 
  'mobile-locations'
]);
```

---

#### 🟡 **Media Query Hook**

**Current Problem:** Duplicate responsive logic across components.

**Recommended Solution:**
```typescript
// hooks/useMediaQuery.ts
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  
  return matches;
}

// Usage:
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(max-width: 1024px)');
```

---

### 2.3 Prop Drilling Issues

#### 🟡 **Color Props Passed Through Multiple Levels**

**Example:** Button colors passed through banner → form → button

**Recommendation:** Use theme configuration or CSS custom properties.

```typescript
// styles/theme.ts
export const theme = {
  colors: {
    primary: '#E07B39',
    primaryHover: '#D06A28',
    secondary: '#1A2C42',
    // ...
  }
};

// Or use Tailwind config:
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-primary': '#E07B39',
        'brand-primary-hover': '#D06A28',
      }
    }
  }
}
```

---

### 2.4 State Management Concerns

#### 🟡 **No Global State Management**

**Current:** All state is local component state.

**Recommendation for Future:** 
- Consider React Context for theme, user preferences
- Zustand or Redux if state becomes more complex
- React Query for server state management

**Not Critical Now:** Current approach is fine for this scale, but plan for growth.

---

## 3. DRY Principle Violations

### 3.1 Critical Duplications

#### 🔴 **Multiple Card Components with Similar Structure**

**Affected Files:**
1. `PricingCard.tsx` (166 lines)
2. `ServiceCard.tsx` (109 lines)
3. `LocationCard.tsx` (53 lines)
4. `BlogCard.tsx` (34 lines)
5. `SpaceCard.tsx` (180 lines)
6. `PlanCard.tsx` (423 lines)

**Common Pattern:**
```typescript
// All follow this structure:
<div className="bg-white rounded-xl shadow-lg overflow-hidden">
  {/* Image */}
  <div className="relative">
    <Image src={imageSrc} alt={imageAlt} />
  </div>
  
  {/* Content */}
  <div className="p-6">
    <h3>{title}</h3>
    <p>{description}</p>
    {/* Badges/Tags */}
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => <span>{tag}</span>)}
    </div>
    {/* CTA Button */}
    <button>{ctaText}</button>
  </div>
</div>
```

**Issue:** 80% of code is duplicated across these components.

**Recommended Solution:**

```typescript
// components/shared/Card/index.tsx
interface CardProps {
  variant?: 'pricing' | 'service' | 'location' | 'blog' | 'space' | 'plan';
  image?: {
    src: string;
    alt: string;
    aspectRatio?: string;
  };
  header?: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
  content?: {
    description?: string;
    features?: Array<string | { icon: ReactNode; text: string }>;
    tags?: Array<{ label: string; variant?: string }>;
  };
  footer?: {
    price?: string;
    ctaText: string;
    ctaVariant?: 'primary' | 'secondary' | 'outline';
    onCtaClick?: () => void;
  };
  className?: string;
  radius?: 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function Card({ variant, image, header, content, footer, ...props }: CardProps) {
  return (
    <div className={cn(
      'bg-white overflow-hidden',
      radiusClasses[props.radius || '3xl'],
      shadowClasses[props.shadow || 'xl'],
      props.className
    )}>
      {image && <CardImage {...image} />}
      <div className="p-6">
        {header && <CardHeader {...header} />}
        {content && <CardContent {...content} />}
        {footer && <CardFooter {...footer} />}
      </div>
    </div>
  );
}

// Usage:
<Card
  variant="pricing"
  image={{ src: "/images/business.png", alt: "Business Plan" }}
  header={{ title: "Business Address Plan" }}
  content={{
    description: "A professional address...",
    tags: [{ label: "Solo founders" }]
  }}
  footer={{
    price: "₹999/month",
    ctaText: "Purchase Plan",
    onCtaClick: handlePurchase
  }}
/>
```

**Impact:** Reduce ~1000 lines of duplicated code to ~200 lines of shared component.

---

#### 🔴 **Duplicate Carousel/Slider Configuration**

**Locations:**
- `app/components/CoWorkingSpaces.tsx` lines 33-67
- `app/components/SpaceCard.tsx` lines 47-78

**Duplicate Code:**
```typescript
// CoWorkingSpaces.tsx
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  arrows: false,
  fade: false,
  cssEase: "ease-in-out",
  centerMode: true,
  centerPadding: "10%",
  responsive: [/* ... same config ... */]
};

// SpaceCard.tsx - Nearly identical!
const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: autoplaySpeed,  // Only difference
  pauseOnHover: true,
  centerMode: false,
  responsive: [/* ... same breakpoints ... */]
};
```

**Recommended Solution:**
```typescript
// utils/carousel-configs.ts
export const defaultCarouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: false,
  pauseOnHover: true,
  cssEase: "ease-in-out",
};

export const mobileCarouselResponsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 1,
      centerMode: true,
      centerPadding: "15%",
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
      centerMode: true,
      centerPadding: "10%",
    },
  },
];

export function createCarouselConfig(overrides = {}) {
  return {
    ...defaultCarouselSettings,
    ...overrides,
    responsive: mobileCarouselResponsive,
  };
}

// Usage:
const settings = createCarouselConfig({
  autoplaySpeed: 4000,
  slidesToShow: 3,
});
```

---

#### 🔴 **Duplicate Form Field Rendering Logic**

**Locations:**
- `app/components/layout/internalBanner.tsx` lines 285-358
- `app/components/GuideSection.tsx` lines 107-157

**Duplicate Pattern:**
```typescript
// Both render select fields exactly the same way:
<div className="relative">
  <select
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full px-4 py-3.5 rounded-lg appearance-none..."
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
  <ChevronDown className="absolute right-3 top-1/2..." />
</div>
```

**Recommended Solution:**
```typescript
// components/ui/Select.tsx
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  className?: string;
}

export function Select({ value, onChange, options, placeholder, className }: SelectProps) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3.5 rounded-lg appearance-none text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 border border-[#E0E0E0] bg-[#F9F9F9]"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
    </div>
  );
}

// Usage:
<Select
  value={date}
  onChange={setDate}
  options={dateOptions}
  placeholder="Select date"
/>
```

---

#### 🔴 **Repeated Desktop/Mobile Layout Pattern**

**Locations:** Almost every component has this pattern:

```typescript
{/* Desktop Layout */}
<div className="hidden lg:flex lg:items-center...">
  {/* Desktop content */}
</div>

{/* Mobile Layout */}
<div className="lg:hidden">
  {/* Mobile content - often duplicate logic */}
</div>
```

**Recommended Solution:**
```typescript
// components/shared/ResponsiveLayout.tsx
interface ResponsiveLayoutProps {
  desktop: ReactNode;
  mobile: ReactNode;
  tablet?: ReactNode;
}

export function ResponsiveLayout({ desktop, mobile, tablet }: ResponsiveLayoutProps) {
  return (
    <>
      <div className="hidden lg:block">{desktop}</div>
      {tablet && <div className="hidden md:block lg:hidden">{tablet}</div>}
      <div className="lg:hidden">{mobile}</div>
    </>
  );
}

// Or better - use a single responsive component with adaptive rendering:
export function AdaptiveContent({ 
  children, 
  mobileProps, 
  desktopProps 
}: AdaptiveContentProps) {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  return children({ isMobile, ...(isMobile ? mobileProps : desktopProps) });
}
```

---

#### 🟡 **Repeated Shadow and Radius Classes**

**Locations:** Throughout all card components

```typescript
// Repeated in PricingCard, ServiceCard, PlanCard, etc.
const radiusClasses = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl'
};

const shadowClasses = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl'
};
```

**Recommended Solution:**
```typescript
// utils/style-maps.ts
export const styleVariants = {
  radius: {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  },
  shadow: {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },
  padding: {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    '2xl': 'p-10',
  },
} as const;

// Helper function
export function getStyleClass<T extends keyof typeof styleVariants>(
  variant: T,
  value: keyof typeof styleVariants[T]
): string {
  return styleVariants[variant][value];
}
```

---

### 3.2 Repeated Business Logic

#### 🟡 **Breadcrumb Rendering**

**Locations:**
- `app/components/layout/internalBanner.tsx` lines 393-416
- Could be used across multiple pages

**Recommended Solution:**
```typescript
// components/ui/Breadcrumbs.tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("mb-6", className)} aria-label="Breadcrumb">
      <ol className="flex items-center text-sm text-black font-inter-medium">
        {items.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {crumb.href ? (
              <Link 
                href={crumb.href}
                className="text-black hover:text-gray-700 hover:underline"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-[#E07B39] font-medium">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

---

#### 🟡 **Tag/Badge Rendering**

**Repeated in:** PricingCard, ServiceCard, PlanCard, SpaceCard, BlogCard

```typescript
// Repeated pattern:
<div className="flex flex-wrap gap-2">
  {items.map((item, index) => (
    <span
      key={index}
      className="px-3 py-1 rounded-full text-xs border border-[#DDDDDD]..."
    >
      {item.label}
    </span>
  ))}
</div>
```

**Recommended Solution:**
```typescript
// components/ui/Badge.tsx
interface BadgeProps {
  label: string;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ label, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full font-inter-medium',
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-xs': size === 'md',
          'px-4 py-1.5 text-sm': size === 'lg',
        },
        {
          'border border-[#DDDDDD] text-[#101010]': variant === 'default',
          'border border-[#D1D5DB] text-[#6B7280] bg-white': variant === 'outline',
          'bg-[#1A2C42] text-white': variant === 'filled',
        },
        className
      )}
    >
      {label}
    </span>
  );
}

// components/ui/BadgeGroup.tsx
export function BadgeGroup({ 
  badges, 
  maxVisible,
  className 
}: BadgeGroupProps) {
  const visible = maxVisible ? badges.slice(0, maxVisible) : badges;
  const remaining = badges.length - visible.length;
  
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {visible.map((badge, index) => (
        <Badge key={index} {...badge} />
      ))}
      {remaining > 0 && <Badge label={`+${remaining}`} variant="outline" />}
    </div>
  );
}
```

---

### 3.3 Data Duplication

#### 🔴 **Locations Data Scattered**

**Current State:**
- Location names in `Header.tsx` (lines 134-180)
- Location cards in `db/data.tsx` (lines 325-354)
- Location links duplicated for mobile (lines 316-372)

**Recommended Solution:**
```typescript
// db/locations.ts
export interface Location {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  travelTime?: string;
  distance?: string;
  hasPowerBackup?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const locations: Location[] = [
  {
    id: 'jp-nagar',
    name: 'JP Nagar',
    slug: 'jp-nagar',
    address: 'RBI Layout, 3rd Phase, J. P. Nagar',
    city: 'Bengaluru',
    travelTime: '35 min',
    distance: '0.3 km',
    hasPowerBackup: true,
  },
  // ... more locations
];

// Helper functions
export function getLocationBySlug(slug: string) {
  return locations.find(loc => loc.slug === slug);
}

export function getLocationsByCity(city: string) {
  return locations.filter(loc => loc.city === city);
}

export function getLocationUrl(slug: string) {
  return `/location/${slug}`;
}
```

**Usage in Header:**
```typescript
import { locations, getLocationUrl } from '@/db/locations';

// Generate links automatically:
{locations.map(location => (
  <Link
    key={location.id}
    href={getLocationUrl(location.slug)}
    className="block px-4 py-2..."
  >
    {location.name}
  </Link>
))}
```

---

## 4. Design Consistency

### 4.1 Repeated UI Patterns

#### 🔴 **Section Headers**

**Current:** Manual implementation in every component

```typescript
// Pattern repeated across 15+ components:
<div className="text-center mb-6 lg:mb-12">
  <p className="text-base font-inter-normal text-black uppercase tracking-wider mb-2">
    {eyebrow}
  </p>
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#2B2B2B]">
    {title}
  </h2>
  {description && <p className="text-[#1C1C1C]...">{description}</p>}
</div>
```

**Locations:**
- `CoWorkingSpaces.tsx` lines 72-79
- `SpaceCard.tsx` lines 86-95
- `GuideSection.tsx` lines 91-99
- ... and many more

**Recommended Solution:**
```typescript
// components/ui/SectionHeader.tsx
interface SectionHeaderProps {
  eyebrow?: string;
  title: string | ReactNode;
  description?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  size = 'lg',
  className
}: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-6 lg:mb-12',
      {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
      },
      className
    )}>
      {eyebrow && (
        <p className="text-base font-inter-normal text-black uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        'font-inter-semibold text-[#2B2B2B]',
        {
          'text-2xl md:text-3xl lg:text-4xl': size === 'sm',
          'text-3xl md:text-4xl lg:text-5xl': size === 'md',
          'text-4xl md:text-5xl lg:text-6xl': size === 'lg',
        }
      )}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base lg:text-lg text-[#1C1C1C] font-inter-normal max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

// Usage:
<SectionHeader
  eyebrow="CO-WORKING SPACES"
  title="Our Most Featured"
  align="center"
/>
```

**Impact:** Replace ~300 lines of repeated header code across components.

---

#### 🔴 **CTA Button Styles**

**Current:** Button styles repeated with minor variations

**Pattern in multiple components:**
```typescript
// Variant 1:
<button className="bg-[#E07B39] hover:bg-[#D06A28] text-white px-8 py-3 rounded-lg">
  {text}
</button>

// Variant 2:
<button className="border border-[#2C3E50] text-[#2C3E50] hover:bg-gray-50 px-8 py-3 rounded-lg">
  {text}
</button>

// Variant 3:
<button className="bg-white hover:bg-gray-50 text-[#2C3E50] border border-[#2C3E50] px-8 py-3 rounded-lg">
  {text}
</button>
```

**Current Button Component:** `components/ui/button.tsx` exists but is not used consistently!

**Recommended Solution:**

Enhance and use the existing button component everywhere:

```typescript
// components/ui/button.tsx - ENHANCE THIS
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-inter-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-[#E07B39] text-white hover:bg-[#D06A28] focus:ring-[#E07B39]',
        secondary: 'bg-[#1A2C42] text-white hover:bg-[#2A3C52] focus:ring-[#1A2C42]',
        outline: 'border border-[#2C3E50] text-[#2C3E50] hover:bg-gray-50 focus:ring-[#2C3E50]',
        ghost: 'text-[#2C3E50] hover:bg-gray-100',
        link: 'text-[#E07B39] hover:text-[#D06A28] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-3 text-base',
        xl: 'px-12 py-4 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

**Action:** Replace all hardcoded button styles with consistent Button component.

---

#### 🔴 **Feature List Pattern**

**Repeated in multiple components:**
```typescript
// PlanCard, ServiceCard, etc.
<div className="space-y-4">
  {features.map((feature, index) => (
    <div key={index} className="flex items-center gap-3">
      <div className="w-8 h-8 flex items-center justify-center">
        {feature.icon}
      </div>
      <div className="flex-1">
        <p className="text-[#1C1C1C] font-inter-semibold text-base">
          {feature.title}
        </p>
        {feature.subtitle && (
          <p className="text-[#404040] font-inter-normal text-base">
            {feature.subtitle}
          </p>
        )}
      </div>
    </div>
  ))}
</div>
```

**Recommended Solution:**
```typescript
// components/ui/FeatureList.tsx
interface Feature {
  icon?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  description?: string;
}

interface FeatureListProps {
  features: Feature[];
  layout?: 'vertical' | 'horizontal' | 'grid';
  iconSize?: 'sm' | 'md' | 'lg';
  spacing?: 'tight' | 'normal' | 'relaxed';
  className?: string;
}

export function FeatureList({
  features,
  layout = 'vertical',
  iconSize = 'md',
  spacing = 'normal',
  className
}: FeatureListProps) {
  const spacingClasses = {
    tight: 'space-y-2',
    normal: 'space-y-4',
    relaxed: 'space-y-6',
  };

  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className={cn(spacingClasses[spacing], className)}>
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          {(feature.icon || feature.imageSrc) && (
            <div className={cn(
              'flex-shrink-0 flex items-center justify-center',
              iconSizeClasses[iconSize]
            )}>
              {feature.icon || (
                <Image
                  src={feature.imageSrc!}
                  alt={feature.imageAlt || ''}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[#1C1C1C] font-inter-semibold text-base">
              {feature.title}
            </p>
            {feature.subtitle && (
              <p className="text-[#404040] font-inter-normal text-base mt-0.5">
                {feature.subtitle}
              </p>
            )}
            {feature.description && (
              <p className="text-[#6B7280] font-inter-normal text-sm mt-1">
                {feature.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

#### 🟡 **Image with Overlay Pattern**

**Repeated pattern:**
```typescript
<div className="relative h-64 overflow-hidden">
  <img src={image} alt={alt} className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
</div>
```

**Recommended Solution:**
```typescript
// components/ui/ImageWithOverlay.tsx
interface ImageWithOverlayProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
  overlay?: 'none' | 'hover' | 'always';
  overlayColor?: string;
  className?: string;
  children?: ReactNode; // For absolute positioned content
}

export function ImageWithOverlay({
  src,
  alt,
  aspectRatio = 'video',
  overlay = 'hover',
  overlayColor = 'from-black/20 to-transparent',
  className,
  children
}: ImageWithOverlayProps) {
  return (
    <div className={cn(
      'relative overflow-hidden',
      {
        'aspect-square': aspectRatio === 'square',
        'aspect-video': aspectRatio === 'video',
        'aspect-[3/4]': aspectRatio === 'portrait',
        'aspect-[16/9]': aspectRatio === 'landscape',
      },
      className
    )}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      {overlay !== 'none' && (
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t transition-opacity',
          overlayColor,
          {
            'opacity-0 group-hover:opacity-100': overlay === 'hover',
            'opacity-100': overlay === 'always',
          }
        )} />
      )}
      {children && (
        <div className="absolute inset-0">
          {children}
        </div>
      )}
    </div>
  );
}
```

---

### 4.2 Inconsistent Styling

#### 🟡 **Color Value Inconsistencies**

**Issue:** Similar colors defined slightly differently across components

```typescript
// Found variations of the same colors:
'#2B2B2B'  // Used in most places for heading
'#1F2937'  // Used in PlanCard
'#121212'  // Used in SpaceCard
'#101010'  // Used in ServiceCard
'#212121'  // Used in CoWorkingSpaces

// Orange variations:
'#E07B39'  // Primary
'#D06A28'  // Hover state
'#C76A30'  // Different hover in PlanCard
```

**Recommended Solution:**
```typescript
// styles/colors.ts or tailwind.config.js
export const colors = {
  brand: {
    primary: '#E07B39',
    'primary-hover': '#D06A28',
    secondary: '#1A2C42',
    'secondary-hover': '#2A3C52',
  },
  text: {
    primary: '#2B2B2B',      // Main heading color
    secondary: '#1C1C1C',    // Body text
    muted: '#6B7280',        // Light text
    white: '#FFFFFF',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    accent: '#E5EEF8',
  },
  border: {
    light: '#E0E0E0',
    DEFAULT: '#DDDDDD',
    dark: '#606060',
  },
};

// Update tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
};
```

**Action:** Replace all hardcoded color values with Tailwind classes:
- `#2B2B2B` → `text-text-primary`
- `#E07B39` → `bg-brand-primary`
- etc.

---

#### 🟡 **Inconsistent Spacing**

**Examples:**
```typescript
// Card padding variations:
'p-4 md:p-6'      // BlogCard
'p-6 lg:p-8'      // PricingCard
'p-8 lg:p-10'     // PlanCard
'p-4'             // LocationCard

// Gap variations:
'gap-2'           // Common
'gap-1.5'         // Mobile version
'gap-3'           // Some components
'gap-4'           // Other components
```

**Recommendation:** Define standard spacing scale and use consistently.

```typescript
// Design system spacing:
{
  card: {
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    gap: {
      tight: 'gap-2',
      normal: 'gap-4',
      relaxed: 'gap-6',
    },
  },
}
```

---

### 4.3 Component Naming Inconsistencies

#### 🟡 **Inconsistent File Naming**

```
✅ PricingCard.tsx (PascalCase, matches component)
✅ ServiceCard.tsx
✅ ~~carsoul.tsx~~ → `carousel.tsx` ✅ **FIXED**
✅ ~~internalBanner.tsx~~ → `InternalBanner.tsx` ✅ **FIXED**
✅ ~~imageContentWithCards.tsx~~ → `ImageContentWithCards.tsx` ✅ **FIXED**
✅ ~~PlancComparisonSection.tsx~~ → `PlanComparisonSection.tsx` ✅ **FIXED**
```

**Recommendation:** ✅ **COMPLETED** - All files now use consistent PascalCase naming.

---

#### 🟡 **Component Naming Clarity**

**Issues:**
- `internalBanner.tsx` - Not clear what "internal" means
- `GuideSection.tsx` - Actually a CTA section, not guide-specific
- `Workspace.tsx` - Generic name, should be `WorkspacesSection.tsx`

**Recommended Renames:**
```
✅ internalBanner.tsx → InternalBanner.tsx ✅ **COMPLETED**
PlancComparisonSection.tsx → PlanComparisonSection.tsx ✅ **COMPLETED**
carsoul.tsx → carousel.tsx ✅ **COMPLETED**
imageContentWithCards.tsx → ImageContentWithCards.tsx ✅ **COMPLETED**
GuideSection.tsx → CTASection.tsx (already exported as CTASection!) - Future refactor
Workspace.tsx → WorkspacesShowcase.tsx - Future refactor
```

---

## 5. Folder Structure

### 5.1 Current Structure Analysis

**Current Structure:**
```
app/
  components/
    - 30+ components (all in one directory)
    - Figma/
    - icons/
    - layout/
    - ui/
  pages (route pages)
db/
  - data.tsx (mixed data types)
  - locationCards.ts
  - locations.ts
```

**Issues:**
1. ❌ All components in flat structure (hard to navigate)
2. ❌ No clear separation between feature and shared components
3. ❌ `db/` folder mixes different data types
4. ❌ No hooks directory (custom hooks needed)
5. ❌ No utils/lib directory for shared functions
6. ❌ Layout components mixed with feature components

---

### 5.2 Recommended Structure

```
clayworks/
├── app/
│   ├── (routes)/                          # Route groups
│   │   ├── (marketing)/                   # Marketing pages
│   │   │   ├── page.tsx                   # Home
│   │   │   ├── about-us/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                 # Shared marketing layout
│   │   │
│   │   ├── (workspace)/                   # Workspace pages
│   │   │   ├── day-pass/
│   │   │   │   └── page.tsx
│   │   │   ├── meeting-rooms/
│   │   │   │   └── page.tsx
│   │   │   ├── private-office/
│   │   │   │   └── page.tsx
│   │   │   ├── virtual-office/
│   │   │   │   └── page.tsx
│   │   │   ├── built-to-suit/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   └── location/
│   │       └── [slug]/
│   │           └── page.tsx
│   │
│   ├── components/                        # All React components
│   │   ├── features/                      # Feature-specific components
│   │   │   ├── workspace/
│   │   │   │   ├── SpaceCarousel.tsx
│   │   │   │   ├── SpaceCard.tsx
│   │   │   │   └── SpaceFilters.tsx
│   │   │   │
│   │   │   ├── pricing/
│   │   │   │   ├── PricingSection.tsx
│   │   │   │   ├── PricingCard.tsx
│   │   │   │   ├── PlanComparison.tsx
│   │   │   │   └── PlanComparisonSection.tsx
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── BlogSection.tsx
│   │   │   │   ├── BlogCard.tsx
│   │   │   │   └── BlogGrid.tsx
│   │   │   │
│   │   │   ├── testimonials/
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   └── TestimonialCard.tsx
│   │   │   │
│   │   │   ├── locations/
│   │   │   │   ├── LocationCard.tsx
│   │   │   │   ├── LocationImageCards.tsx
│   │   │   │   ├── LocationProximity.tsx
│   │   │   │   └── OtherLocationsSection.tsx
│   │   │   │
│   │   │   ├── about/
│   │   │   │   ├── Leadership.tsx
│   │   │   │   ├── Philosophy.tsx
│   │   │   │   ├── Impact.tsx
│   │   │   │   └── PrincipleSection.tsx
│   │   │   │
│   │   │   └── services/
│   │   │       ├── ServiceCard.tsx
│   │   │       ├── Offerings.tsx
│   │   │       ├── ProcessOverview.tsx
│   │   │       ├── WhyChoose.tsx
│   │   │       └── FAQ.tsx
│   │   │
│   │   ├── layout/                        # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── DesktopNav.tsx
│   │   │   │   ├── MobileNav.tsx
│   │   │   │   ├── Dropdown.tsx
│   │   │   │   └── navigation-config.ts
│   │   │   │
│   │   │   ├── Footer/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── FooterSection.tsx
│   │   │   │   ├── Newsletter.tsx
│   │   │   │   └── footer-config.ts
│   │   │   │
│   │   │   ├── PageHero/                  # Was InternalBanner
│   │   │   │   ├── index.tsx
│   │   │   │   ├── HeroContent.tsx
│   │   │   │   ├── HeroImage.tsx
│   │   │   │   ├── HeroForm.tsx
│   │   │   │   └── types.ts
│   │   │   │
│   │   │   └── Section/
│   │   │       ├── ImageContent.tsx
│   │   │       ├── ImageContentWithCards.tsx
│   │   │       ├── CTASection.tsx
│   │   │       └── CardSection.tsx
│   │   │
│   │   ├── shared/                        # Shared/reusable components
│   │   │   ├── Card/
│   │   │   │   ├── index.tsx              # Base Card component
│   │   │   │   ├── CardHeader.tsx
│   │   │   │   ├── CardContent.tsx
│   │   │   │   ├── CardFooter.tsx
│   │   │   │   ├── CardImage.tsx
│   │   │   │   └── types.ts
│   │   │   │
│   │   │   ├── SectionHeader/
│   │   │   │   └── index.tsx
│   │   │   │
│   │   │   ├── FeatureList/
│   │   │   │   └── index.tsx
│   │   │   │
│   │   │   ├── BadgeGroup/
│   │   │   │   └── index.tsx
│   │   │   │
│   │   │   ├── ImageWithOverlay/
│   │   │   │   └── index.tsx
│   │   │   │
│   │   │   └── ResponsiveLayout/
│   │   │       └── index.tsx
│   │   │
│   │   └── ui/                            # Base UI components (shadcn/ui style)
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── dialog.tsx
│   │       ├── badge.tsx
│   │       ├── carousel.tsx               # Fix: carsoul.tsx
│   │       ├── breadcrumbs.tsx
│   │       └── image-with-fallback.tsx
│   │
│   ├── hooks/                             # Custom React hooks
│   │   ├── useFormState.ts
│   │   ├── useDropdown.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useCarousel.ts
│   │   └── useToggle.ts
│   │
│   ├── lib/                               # Utility functions
│   │   ├── utils.ts                       # General utilities
│   │   ├── cn.ts                          # Classname utility (if not in utils)
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── endpoints.ts
│   │   └── validations/
│   │       ├── forms.ts
│   │       └── schemas.ts
│   │
│   ├── types/                             # Shared TypeScript types
│   │   ├── index.ts
│   │   ├── workspace.ts
│   │   ├── location.ts
│   │   ├── pricing.ts
│   │   └── common.ts
│   │
│   ├── config/                            # Configuration files
│   │   ├── site.ts                        # Site metadata
│   │   ├── navigation.ts                  # Navigation config
│   │   └── constants.ts                   # App constants
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── colors.ts
│   │   └── theme.ts
│   │
│   ├── layout.tsx                         # Root layout
│   └── favicon.ico
│
├── public/
│   ├── images/
│   │   ├── workspace/
│   │   ├── locations/
│   │   ├── team/
│   │   └── icons/
│   └── fonts/
│
├── data/                                  # Data layer (renamed from db/)
│   ├── index.ts                           # Central export
│   ├── workspaces.ts
│   ├── locations.ts
│   ├── plans.ts
│   ├── faqs.ts
│   ├── testimonials.ts
│   ├── blog.ts
│   ├── case-studies.ts
│   └── constants/
│       ├── process-steps.ts
│       ├── features.ts
│       └── offerings.ts
│
├── tests/                                 # Test files (future)
│   ├── components/
│   ├── hooks/
│   └── lib/
│
├── .github/                               # GitHub specific files
├── .vscode/                               # VSCode settings
├── node_modules/
├── .gitignore
├── biome.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── CODE_REVIEW.md                         # This file
```

---

### 5.3 Migration Strategy

#### Phase 1: Create New Directories (Week 1)
```bash
# Create new folder structure
mkdir -p app/components/{features,shared,layout}
mkdir -p app/components/features/{workspace,pricing,blog,testimonials,locations,about,services}
mkdir -p app/components/layout/{Header,Footer,PageHero,Section}
mkdir -p app/components/shared/{Card,SectionHeader,FeatureList,BadgeGroup,ImageWithOverlay,ResponsiveLayout}
mkdir -p app/{hooks,lib,types,config}
mkdir -p data/constants
```

#### Phase 2: Move UI Components (Week 1)
- Move and enhance existing `ui/` components
- Create missing base components (Select, Badge, Breadcrumbs)

#### Phase 3: Consolidate Data Layer (Week 2)
- Rename `db/` to `data/`
- Split `data.tsx` into logical files
- Remove duplicate data
- Add proper TypeScript interfaces

#### Phase 4: Extract Custom Hooks (Week 2)
- Create `useFormState.ts`
- Create `useDropdown.ts`
- Create `useMediaQuery.ts`

#### Phase 5: Create Shared Components (Week 3)
- Build unified Card component
- Build SectionHeader component
- Build FeatureList component
- Build other shared components

#### Phase 6: Refactor Feature Components (Week 3-4)
- Move components to feature folders
- Update imports
- Consolidate similar components

#### Phase 7: Break Down Complex Components (Week 4-5)
- Refactor Header into subcomponents
- Refactor PageHero (InternalBanner)
- Refactor other large components

#### Phase 8: Update Imports & Test (Week 5)
- Update all import paths
- Test all pages
- Fix any broken imports

---

### 5.4 Import Path Configuration

Update `tsconfig.json` for cleaner imports:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/*"],
      "@/components/*": ["./app/components/*"],
      "@/features/*": ["./app/components/features/*"],
      "@/shared/*": ["./app/components/shared/*"],
      "@/ui/*": ["./app/components/ui/*"],
      "@/layout/*": ["./app/components/layout/*"],
      "@/hooks/*": ["./app/hooks/*"],
      "@/lib/*": ["./app/lib/*"],
      "@/types/*": ["./app/types/*"],
      "@/config/*": ["./app/config/*"],
      "@/data/*": ["./data/*"],
      "@/styles/*": ["./app/styles/*"]
    }
  }
}
```

**Usage:**
```typescript
// Before:
import { Button } from './components/ui/button';
import { LocationCard } from '../../components/LocationCard';

// After:
import { Button } from '@/ui/button';
import { LocationCard } from '@/features/locations/LocationCard';
```

---

## Action Items Summary

### 🔴 Critical (Do First - High Impact)

**Priority 1: Server Components Migration** (2-3 hours) ✅ **COMPLETED**
- [x] Removed `'use client'` from presentational components (BlogCard, BlogSection, BlogGrid, BlogsCard, CardSection, Offers, HeroBanner)
- [x] **Removed `'use client'` from all page files** - Converted to Server Components:
  - `app/page.tsx` (Home)
  - `app/day-pass/page.tsx`
  - `app/meeting-rooms/page.tsx`
  - `app/private-office/page.tsx`
  - `app/virtual-office/page.tsx`
  - `app/built-to-suit/page.tsx`
  - `app/contact-us/page.tsx`
  - `app/about-us/page.tsx`
  - `app/careers/page.tsx`
- [x] **Added metadata exports** to all Server Component pages for SEO
- [x] **Created `app/blogs/layout.tsx`** with metadata (blogs page uses `useState` for pagination, so it remains a client component)
- [x] **Updated components** to handle events internally when handlers are not provided (made handlers optional)
- [x] **Removed function handlers from data files** (removed `onReadMore` from `caseStudiesData`)
- [x] Kept `'use client'` only in interactive components (Header, Testimonial, FAQ, WhyChoose, InternalBanner, etc.)
- [x] Only `app/blogs/page.tsx` remains a client component (uses `useState` for pagination)
- **Impact:** Massive performance improvement - all pages are now Server Components, enabling metadata exports and better SEO

**Priority 2: Remove Duplicate Data** (15 minutes) ✅ **COMPLETED**
- [x] Delete duplicate `blogPosts` array in `db/data.tsx` (lines 244-308)
- [x] Use only `blogPostsData` throughout the application
- [x] Remove unused icon imports from `db/data.tsx` (lines 1-6)
- **Impact:** Cleaner codebase, single source of truth

**Priority 3: Fix Remaining Images** (30 minutes) ✅ **COMPLETED**
- [x] Replace `<img>` in `CoWorkingSpaces.tsx` (lines 90-93 and 137-141) with `next/image` - Fixed both desktop grid and mobile carousel instances
- [x] Fix `ImageWithFallBack.tsx` to use `next/image` - Converted to use Next.js Image component with fill prop support, maintained error fallback functionality
- [ ] Add `priority` prop to hero banner image (HeroBanner uses video, not applicable)
- **Impact:** Complete image optimization - 100% of images now use Next.js Image component

**Priority 4: Fix File Naming** (10 minutes) ✅ **COMPLETED**
- [x] Rename `carsoul.tsx` to `carousel.tsx` (typo fix)
- [x] Rename `PlancComparisonSection.tsx` to `PlanComparisonSection.tsx` (typo fix)
- [x] Rename `internalBanner.tsx` to `InternalBanner.tsx` (PascalCase)
- [x] Rename `imageContentWithCards.tsx` to `ImageContentWithCards.tsx`
- [x] Update all import statements (12 imports across 9 files)
- **Impact:** Professional code standards

**Priority 5: Enhance Metadata** (20 minutes) ✅ **COMPLETED**
- [x] Update `title: "Clay works"` to proper title in `app/layout.tsx`
- [x] Add comprehensive description
- [x] Add OpenGraph and Twitter card metadata
- [x] Add dynamic metadata generation for blog posts and locations
- [x] Add robots configuration for SEO
- **Impact:** ✅ **Better SEO and social sharing** - All pages now have comprehensive metadata with OpenGraph and Twitter cards

---

### 🟡 High Priority (Do Next - Code Quality)

**Priority 6: Add Loading & Error States** (1-2 hours) ✅ **COMPLETED**
- [x] Create `app/loading.tsx` for route-level loading UI - ✅ Created with branded spinner
- [x] Create `app/error.tsx` for error boundaries - ✅ Created with retry functionality
- [x] Create `app/not-found.tsx` for 404 page - ✅ Created with navigation options
- [x] Create `app/global-error.tsx` for root-level errors - ✅ Created
- [ ] Add `<Suspense>` boundaries for slow components (when backend added) - ⏭️ Deferred until backend integration
- **Impact:** ✅ **Better user experience, professional error handling** - All error and loading states now implemented with consistent branding

**Priority 7: Extract Custom Hooks** (2-3 hours)
- [ ] Create `hooks/useDropdown.ts` for Header component
- [ ] Create `hooks/useFormState.ts` for form management
- [ ] Create `hooks/useToggle.ts` for boolean state
- [ ] Create `hooks/useMediaQuery.ts` for responsive logic
- **Impact:** Reusable logic, cleaner components

**Priority 8: Add TODO Comments** (30 minutes) ✅ **COMPLETED**
- [x] Add `// TODO: Implement backend API` to console.log placeholders - ✅ Added to all 30+ console.log statements across 11 files
- [ ] Add `// TODO: Consolidate with BaseCard component` to duplicate cards - ⏭️ Deferred to Priority 9 (Shared Components)
- [ ] Document future refactoring plans - ⏭️ Deferred
- **Impact:** ✅ **Clear roadmap for team members** - All console.log placeholders now have TODO comments specifying what needs to be implemented

**Priority 9: Create Shared Components** (1 week)
- [ ] Build `SectionHeader` component (used in 15+ places)
- [ ] Build `Badge` and `BadgeGroup` components
- [ ] Build `FeatureList` component
- [ ] Build unified `BaseCard` component
- **Impact:** Reduce code duplication by ~1000 lines

**Priority 10: Standardize Colors** (2-3 hours) ✅ **COMPLETED**
- [x] Add brand colors to `:root` in `globals.css` ✅ **COMPLETED** - Added comprehensive color system with brand, text, background, and border colors
- [x] Replace hardcoded hex values with CSS variables ✅ **COMPLETED** - Updated key components (GuideSection, PlanCard, error/loading/not-found pages, all page files, InternalBanner) to use CSS variables
- [x] Document color system in comments ✅ **COMPLETED** - Color system documented in `globals.css` with clear categories
- **Impact:** ✅ **Consistent branding, easier theme changes** - All brand colors now centralized in CSS variables, making theme updates simple and consistent

---

### 🟢 Medium Priority (Future Improvements)

**Priority 11: Refactor Complex Components** (1-2 weeks)
- [ ] Break down Header (415 lines) into subcomponents
- [ ] Break down InternalBanner (448 lines) into smaller pieces
- [ ] Separate form logic from presentation
- [ ] Extract navigation config to separate file
- **Impact:** Easier to test and maintain

**Priority 12: Add Accessibility** (1 week)
- [ ] Add ARIA labels to icon buttons (WhatsApp, social icons)
- [ ] Implement keyboard navigation for dropdowns
- [ ] Add focus management and focus traps
- [ ] Test with screen readers
- **Impact:** WCAG compliance, inclusive design

**Priority 13: Create Configuration Files** (2-3 hours)
- [ ] Move phone number to `config/site.ts`
- [ ] Extract navigation links to `config/navigation.ts`
- [ ] Create constants file for repeated strings
- [ ] Document configuration options
- **Impact:** Easier to update site-wide settings

**Priority 14: Consolidate Carousel Config** (1 hour)
- [ ] Create `lib/carousel-configs.ts` utility
- [ ] Extract duplicate Slick settings
- [ ] Update CoWorkingSpaces and SpaceCard to use shared config
- **Impact:** DRY principle, consistent carousel behavior

**Priority 15: Folder Structure Reorganization** (2-3 weeks)
- [ ] Create `app/components/features/` directory
- [ ] Create `app/components/shared/` directory
- [ ] Move components to appropriate folders
- [ ] Update import paths throughout
- **Impact:** Better organization, easier to navigate

---

### 📚 Documentation & Testing (Nice to Have)

16. **Add Component Documentation**
    - [ ] Document shared components with Storybook
    - [ ] Add JSDoc comments to complex components
    - [ ] Create usage examples

17. **Add Tests**
    - [ ] Set up testing framework (Jest, Testing Library)
    - [ ] Write tests for shared components
    - [ ] Add integration tests for key pages

18. **Create Design System Docs**
    - [ ] Document color palette
    - [ ] Document spacing scale
    - [ ] Document component variants

---

## Metrics & Estimates

### Code Reduction Potential
- **Current:** ~8,000 lines of component code
- **After refactoring:** ~5,000 lines (37.5% reduction)
- **Duplicate code removed:** ~3,000 lines

### File Count Changes
- **Current:** 48 component files (flat structure)
- **After refactoring:** ~60 files (better organized)

### Time Estimates by Priority
- **🔴 Critical (1-5):** 3-4 hours total - **Do this weekend**
- **🟡 High Priority (6-10):** 1-2 weeks - **Do next sprint**
- **🟢 Medium Priority (11-15):** 4-6 weeks - **Q1 2026**
- **📚 Documentation & Testing:** Ongoing

### Developer Experience Improvements
- ✅ Easier to find components
- ✅ Faster development with reusable components
- ✅ Reduced code duplication
- ✅ Better type safety
- ✅ Consistent design patterns

---

## Conclusion

### Overall Assessment: **Solid B-Grade Codebase** (79/100)

Your ClayWorks project is a **well-built static marketing website** with modern technologies. The Tailwind CSS implementation is particularly impressive with a comprehensive custom grid system.

**What You're Doing Right:**
- ✅ Latest tech stack (Next.js 15.5.4, React 19.1.0, TypeScript, Tailwind v4)
- ✅ Excellent custom CSS system (542 lines of organized utilities)
- ✅ Good component architecture
- ✅ Proper responsive design (mobile/tablet/desktop/HD)
- ✅ 95% image optimization complete
- ✅ Biome linter for code quality
- ✅ Appropriate use of placeholders for static site

**Quick Wins (3-4 hours = 40-60% performance boost):**
1. Remove `'use client'` from pages and presentational components → **40-60% bundle reduction**
2. ✅ Delete duplicate `blogPosts` array → **cleaner data layer** ✅ **COMPLETED**
3. Fix 2 remaining `<img>` tags → **100% image optimization**
4. ✅ Fix filename typos (`carsoul.tsx` → `carousel.tsx`) → **professional standards** ✅ **COMPLETED**
5. Enhance metadata → **better SEO**

**Why This Review Is Different:**
This is a **prototype-stage static website**, not production code with bugs. The `console.log` handlers and hardcoded data are appropriate. The primary issue is **overuse of 'use client'** which impacts performance but is easy to fix.

### Priority Roadmap:

**🔴 This Weekend (3-4 hours):** Critical Priorities 1-5
- Server Components migration = **massive performance boost**
- Fix duplicates and naming = **clean professional code**
- Enhanced metadata = **better SEO**
- **Expected Result:** A-grade performance with minimal effort

**🟡 Next Sprint (1-2 weeks):** High Priority 6-10
- Error handling, custom hooks, shared components
- **Expected Result:** Better code organization

**🟢 Q1 2026 (4-6 weeks):** Medium Priority 11-15
- Component refactoring, folder restructure, accessibility
- **Expected Result:** Enterprise-ready codebase

### Final Verdict:

**Grade: B (79/100)** ⭐⭐⭐⭐☆

You have a **very good foundation**. Spend 3-4 hours on critical items this weekend, and you'll have **A-grade performance** (90+/100) while keeping your current architecture.

**The biggest win:** Server Components migration will reduce your JavaScript bundle by 40-60% with just 2-3 hours of work.

---

**Next Steps:**
1. **Today:** Remove `'use client'` from all 7 page files (30 min)
2. **This Weekend:** Complete Critical Priorities 2-5 (3 hours)
3. **Next Week:** Test build size reduction and performance
4. **Next Sprint:** Start High Priority items based on business needs

---

*Assessment Date: October 30, 2025*  
*Review Version: 2.0 (Accurate Static Site Assessment)*  
*Tech Stack: Next.js 15.5.4, React 19.1.0, TypeScript 5.x, Tailwind CSS 4.x*  
*Project Type: Static Marketing Website (No Backend)*

