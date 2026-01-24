# Next.js 15 Best Practices - Official Documentation Analysis

**Date:** December 2024  
**Source:** Next.js 15.1.8 Official Documentation (Context7 Verified)  
**Topic:** 'use client' in pages & Browser API usage

---

## ❌ Is Using 'use client' in page.tsx Good Practice?

### **Answer: NO - Pages should be Server Components by default**

According to Next.js 15.1.8 official documentation:

### Key Points:

1. **Pages are Server Components by default:**
   > "Pages in Next.js are Server Components by default"  
   > Source: `/docs/app/building-your-application/rendering/composition-patterns`

2. **Recommended pattern for pages:**
   ```tsx
   // ✅ RECOMMENDED: Server Component page
   export default async function Page() {
     // Fetch data directly in a Server Component
     const recentPosts = await getPosts()
     // Forward fetched data to your Client Component
     return <HomePage recentPosts={recentPosts} />
   }
   ```

3. **Production Checklist Guidance:**
   > "Leverage Server Components in the Next.js App Router to fetch data on the server, improving performance and reducing client-side bundle size."  
   > Source: `/docs/app/building-your-application/deploying/production-checklist`

4. **Composition Patterns:**
   > "Adhering to recommended composition patterns for Server and Client Components, particularly regarding the placement of 'use client' directives, is crucial for optimizing client-side JavaScript bundle sizes."  
   > Source: `/docs/app/building-your-application/deploying/production-checklist`

### When You CAN Use 'use client' in Pages:

You can make a page a Client Component, but it's **not the recommended default**:

```tsx
'use client'

// This is a Client Component (same as components in the `pages` directory)
// It receives data as props, has access to state and effects, and is
// prerendered on the server during the initial page load.
export default function HomePage({ recentPosts }) {
  return (
    <div>
      {recentPosts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

**However, the documentation recommends:**
- Keep pages as Server Components by default
- Fetch data in Server Components
- Pass data as props to Client Components
- Only use Client Component pages when you need client-side state/effects at the page level

---

## ✅ Is Using Browser APIs Good Practice?

### **Answer: YES - But only in Client Components with proper safeguards**

### Key Points:

1. **Browser APIs must be in Client Components:**
   ```tsx
   'use client';
   
   import { useEffect } from 'react';
   
   export default function ClientComponent() {
     useEffect(() => {
       // You now have access to `window`
       console.log(window.innerHeight);
       // Access localStorage
       const value = localStorage.getItem('key');
     }, [])
   
     return ...;
   }
   ```

2. **Always use `useEffect` for Browser APIs:**
   - Prevents server-side errors during pre-rendering
   - Ensures code only runs in the browser environment
   - Prevents hydration mismatches

3. **Common Browser APIs:**
   - `window` - Available in Client Components via `useEffect`
   - `localStorage` - Available in Client Components via `useEffect`
   - `document` - Available in Client Components via `useEffect`
   - `navigator` - Available in Client Components via `useEffect`
   - `requestAnimationFrame` - Available in Client Components

### ❌ Don't Access Browser APIs Directly:

```tsx
// ❌ WRONG: Direct access in Server Component
export default function Page() {
  const height = window.innerHeight; // Error: window is not defined
  return <div>Height: {height}</div>
}

// ❌ WRONG: Direct access in Client Component (outside useEffect)
'use client'
export default function Component() {
  const height = window.innerHeight; // May cause hydration issues
  return <div>Height: {height}</div>
}
```

### ✅ Correct Pattern:

```tsx
// ✅ CORRECT: Client Component with useEffect
'use client'
import { useEffect, useState } from 'react'

export default function Component() {
  const [height, setHeight] = useState(0)
  
  useEffect(() => {
    // Safe browser API access
    setHeight(window.innerHeight)
    
    // Safe localStorage access
    const stored = localStorage.getItem('key')
    
    // Cleanup if needed
    return () => {
      // Cleanup code
    }
  }, [])
  
  return <div>Height: {height}</div>
}
```

---

## 📋 Best Practices Summary

### For Pages (`page.tsx`):

1. **Default to Server Components:**
   - ✅ Fetch data with `async/await` directly in the page
   - ✅ Use Server Components for SEO and performance
   - ✅ Pass data as props to Client Components

2. **Only use Client Component pages when:**
   - You need page-level state management
   - You need page-level effects
   - You're migrating from Pages Router and need compatibility

3. **Recommended Pattern:**
   ```tsx
   // ✅ BEST: Server Component page
   import ClientInteractiveComponent from './client-component'
   
   export default async function Page() {
     const data = await fetchData()
     return <ClientInteractiveComponent data={data} />
   }
   ```

### For Browser APIs:

1. **Always use Client Components:**
   - ✅ Mark component with `'use client'`
   - ✅ Use `useEffect` to access browser APIs
   - ✅ Check if browser APIs exist before using them

2. **Safe Browser API Access Pattern:**
   ```tsx
   'use client'
   import { useEffect, useState } from 'react'
   
   export default function Component() {
     const [mounted, setMounted] = useState(false)
     
     useEffect(() => {
       setMounted(true)
       // Now safe to access browser APIs
       if (typeof window !== 'undefined') {
         // Browser API code
       }
     }, [])
     
     if (!mounted) return null // Prevent hydration mismatch
     
     return <div>Browser-specific content</div>
   }
   ```

---

## 🎯 Your Current Implementation

### Current Status:

✅ **Correctly using 'use client' in pages that:**
- Pass function handlers (required in Next.js 15)
- Need page-level state (`useState` for pagination, filters)
- Have event handlers at page level

✅ **Correctly using Browser APIs:**
- `Partner.tsx` - Uses `useEffect`, `useRef`, `requestAnimationFrame` ✅
- `ImageWithFallBack.tsx` - Uses `useState` for error handling ✅
- `CaseStudies.tsx` - Uses `window.open()` in click handler ✅

### Recommendations:

1. **Keep pages as Client Components when necessary:**
   - Your pages that pass function handlers (`onSubmit`, `onCtaClick`) **must** be client components
   - This is a Next.js 15 limitation, not a bad practice in your case

2. **Consider refactoring for better performance:**
   - Instead of passing function handlers from pages, use Server Actions:
   ```tsx
   // ✅ BETTER: Use Server Actions
   'use server'
   export async function handleSubmit(formData: FormData) {
     // Server-side logic
   }
   
   // In Client Component:
   'use client'
   import { handleSubmit } from './actions'
   
   <form action={handleSubmit}>
     {/* form fields */}
   </form>
   ```

3. **Browser API usage is correct:**
   - All your Browser API usage is in Client Components
   - All use `useEffect` or are inside event handlers
   - This is the correct pattern ✅

---

## 📚 Official Documentation References

1. **Server Components for Pages:**
   - Source: `/docs/app/building-your-application/rendering/composition-patterns`
   - Quote: "Pages in Next.js are Server Components by default"

2. **Production Checklist:**
   - Source: `/docs/app/building-your-application/deploying/production-checklist`
   - Quote: "Leverage Server Components in the Next.js App Router to fetch data on the server, improving performance and reducing client-side bundle size"

3. **Browser API Access:**
   - Source: `/docs/app/building-your-application/deploying/static-exports`
   - Quote: "Use `useEffect` hook to ensure that the code accessing these APIs only runs in the browser environment"

---

## ✅ Conclusion

1. **'use client' in pages:** Not ideal, but acceptable when necessary (like passing function handlers)
2. **Browser APIs:** ✅ Good practice when used correctly in Client Components with `useEffect`
3. **Your current implementation:** Mostly correct, but consider Server Actions for better performance

---

**Next Steps:**
1. Consider migrating function handlers to Server Actions
2. Keep Browser API usage as-is (it's correct)
3. Continue using Server Components for pages when possible

