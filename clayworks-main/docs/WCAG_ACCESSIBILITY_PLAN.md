# Web Accessibility Plan and Implementation Guideline

## Table of Contents

1. [Accessibility Goals & Principles](#1-accessibility-goals--principles)
2. [Design Guidelines](#2-design-guidelines)
3. [Content Accessibility](#3-content-accessibility)
4. [Keyboard Navigation & Focus Management](#4-keyboard-navigation--focus-management)
5. [Forms & Interactive Elements](#5-forms--interactive-elements)
6. [Testing & Validation](#6-testing--validation)
7. [Developer Best Practices](#7-developer-best-practices)
8. [Ongoing Maintenance](#8-ongoing-maintenance)
9. [Quick Reference Checklists](#9-quick-reference-checklists)

---

## 1. Accessibility Goals & Principles

### 1.1 Purpose and Scope

This document provides comprehensive guidelines for implementing and maintaining web accessibility across all pages of the Clayworks website. Our goal is to ensure that all users, regardless of their abilities or disabilities, can access, understand, and interact with our digital content.

### 1.2 Target Compliance Level

**WCAG 2.2 Level AA Compliance**

We are committed to meeting the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. This standard ensures:
- Compliance with international accessibility standards (ISO 40500)
- Legal compliance with ADA, Section 508, and similar regulations
- Best-in-class user experience for all visitors

### 1.3 Legal and Ethical Considerations

**Legal Requirements:**
- Americans with Disabilities Act (ADA) Title III
- Section 508 of the Rehabilitation Act
- European Accessibility Act (EAA)
- UK Equality Act 2010

**Ethical Commitment:**
- Equal access to information and services
- Digital inclusion for all users
- Social responsibility as a business

### 1.4 User Benefits

**Who Benefits from Accessibility:**

- **People with visual impairments**: Screen reader users, low vision users, color blind users
- **People with motor disabilities**: Keyboard-only users, voice control users
- **People with cognitive disabilities**: Users who benefit from clear content structure
- **People with hearing impairments**: Users requiring captions and transcripts
- **Situational disabilities**: Users on mobile devices, slow connections, bright sunlight
- **Aging population**: Users with age-related limitations
- **All users**: Better UX, faster navigation, improved SEO

### 1.5 Business Value

- **Expanded market reach**: 15% of global population has disabilities
- **SEO benefits**: Accessible sites rank better
- **Legal risk mitigation**: Reduced liability
- **Brand reputation**: Demonstrates social responsibility
- **Better code quality**: Clean, semantic, maintainable code

---

## 2. Design Guidelines

### 2.1 Color Contrast Requirements

**WCAG 2.2 AA Standards:**

- **Normal text** (< 24px or < 19px bold): Minimum contrast ratio of **4.5:1**
- **Large text** (≥ 24px or ≥ 19px bold): Minimum contrast ratio of **3:1**
- **UI components and graphics**: Minimum contrast ratio of **3:1**

**Current Codebase Issues to Address:**

```tsx
// ❌ AVOID: Low contrast text
<p className="text-gray-400">Important information</p>

// ✅ CORRECT: High contrast text
<p className="text-gray-700">Important information</p>
```

**Testing Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools Color Picker (built-in contrast checker)
- Stark plugin for Figma/design tools

**Color Palette Recommendations:**

```css
/* Ensure these combinations meet 4.5:1 minimum */
--text-primary: #171717; /* On white background: 15.3:1 ✅ */
--text-secondary: #404040; /* On white background: 10.5:1 ✅ */
--text-tertiary: #6B7280; /* On white background: 5.7:1 ✅ */
--primary-orange: #E07B39; /* Check on light backgrounds */
--focus-indicator: #2563EB; /* High visibility blue */
```

### 2.2 Typography and Readability

**Font Size Standards:**

```css
/* Minimum font sizes */
--text-base: 16px; /* Body text minimum */
--text-sm: 14px; /* Small text (use sparingly) */
--text-lg: 18px; /* Comfortable reading */

/* Line height for readability */
--line-height-normal: 1.5; /* Body text */
--line-height-relaxed: 1.625; /* Long-form content */
```

**Implementation Example:**

```tsx
// ✅ CORRECT: Readable typography
<p className="text-base leading-relaxed text-gray-900">
  Your co-working space content here
</p>
```

**Best Practices:**
- Use relative units (rem, em) instead of fixed pixels
- Maintain line length between 50-75 characters for optimal readability
- Use adequate line-height (1.5 minimum for body text)
- Allow text zoom up to 200% without loss of functionality

### 2.3 Focus Indicators

**Visible Focus Requirements:**

All interactive elements MUST have a visible focus indicator that is:
- **Clearly visible**: High contrast against background
- **Consistent**: Same style across the site
- **Not removed**: Never use `outline: none` without a replacement

**Current Implementation (Button Component):**

```tsx
// ✅ GOOD: Existing focus-visible styles in button.tsx
const buttonVariants = cva(
  "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
)
```

**Recommended Focus Styles:**

```css
/* Global focus style */
*:focus-visible {
  outline: 3px solid #2563EB;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Skip to main content link */
.skip-link:focus {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 9999;
  padding: 12px 20px;
  background: #2563EB;
  color: white;
  text-decoration: none;
}
```

**Issues to Fix in Header Component:**

```tsx
// ❌ CURRENT: Dropdown lacks keyboard focus management
<div 
  onMouseEnter={() => setIsServicesOpen(true)}
  onMouseLeave={() => setIsServicesOpen(false)}
>
  <span>SERVICES</span>
  <ChevronDown />
</div>

// ✅ IMPROVED: Add keyboard support and focus
<button
  aria-expanded={isServicesOpen}
  aria-haspopup="true"
  onMouseEnter={() => setIsServicesOpen(true)}
  onMouseLeave={() => setIsServicesOpen(false)}
  onClick={() => setIsServicesOpen(!isServicesOpen)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsServicesOpen(!isServicesOpen);
    }
  }}
>
  <span>SERVICES</span>
  <ChevronDown />
</button>
```

### 2.4 Responsive and Adaptive Layouts

**Mobile Accessibility:**
- Maintain readability at all viewport sizes
- Ensure proper content reflow (no horizontal scrolling)
- Test zoom levels up to 400%

**Touch Target Sizing:**

```css
/* WCAG 2.2 AA Requirement: Minimum 24x24px touch targets */
.touch-target {
  min-width: 44px; /* iOS recommendation */
  min-height: 44px;
  padding: 12px; /* Comfortable spacing */
}
```

**Current Issue in Header:**

```tsx
// ❌ Current mobile menu button might be too small
<button className="w-10 h-10"> {/* 40x40 - borderline */}
  <Menu className="w-6 h-6" />
</button>

// ✅ Recommended size
<button 
  className="w-11 h-11 flex items-center justify-center"
  aria-label="Open mobile menu"
  aria-expanded={isMobileMenuOpen}
>
  <Menu className="w-6 h-6" aria-hidden="true" />
</button>
```

### 2.5 Motion and Animation

**Respect User Preferences:**

```css
/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Implementation in Components:**

```tsx
// Respect prefers-reduced-motion
<div className="transition-all duration-300 motion-reduce:transition-none">
  Content
</div>
```

---

## 3. Content Accessibility

### 3.1 Alt Text Guidelines

**Principles:**
- **Informative images**: Describe the content/function
- **Decorative images**: Use empty alt (`alt=""`) or `aria-hidden="true"`
- **Complex images**: Provide detailed description nearby or in `longdesc`
- **Text in images**: Include the text in alt attribute

**Current Issues in Codebase:**

```tsx
// ❌ CURRENT: Generic alt text in Header
<Image
  src="/images/logo.png"
  alt="Clayworks Logo"
  width={120}
  height={32}
/>

// ✅ IMPROVED: More descriptive for screen readers
<Image
  src="/images/logo.png"
  alt="Clayworks - Premium Co-working Spaces"
  width={120}
  height={32}
/>

// ❌ CURRENT: Decorative icon without proper handling
<button className="w-10 h-10">
  <svg width="24" height="24">...</svg>
</button>

// ✅ IMPROVED: Icon with accessible label
<button 
  className="w-10 h-10"
  aria-label="Contact us on WhatsApp"
>
  <svg width="24" height="24" aria-hidden="true">...</svg>
</button>
```

**Alt Text Decision Tree:**

```
Is the image decorative only?
├─ YES → alt="" or aria-hidden="true"
└─ NO → Does it contain text?
    ├─ YES → Include text in alt
    └─ NO → Describe content and context
```

**Examples by Context:**

```tsx
// Hero images
<Image 
  src="/images/banner.mp4"
  alt="Modern co-working space with natural light and collaborative areas"
/>

// Team photos
<Image 
  src="/images/abhijit.png"
  alt="Abhijit Kumar, CEO of Clayworks"
/>

// Icons with adjacent text (decorative)
<div>
  <Phone aria-hidden="true" />
  <span>+1 (555) 123-4567</span>
</div>

// Standalone functional icons
<button aria-label="Close modal">
  <X aria-hidden="true" />
</button>

// Background images (use CSS, no alt needed)
<div 
  style={{ backgroundImage: 'url(/images/texture.png)' }}
  role="presentation"
>
  Content
</div>
```

### 3.2 Heading Hierarchy

**Structure Requirements:**

- One `<h1>` per page (main page title)
- No skipped levels (don't jump from h2 to h4)
- Logical content outline
- Use headings for structure, not styling

**Current Page Structure to Verify:**

```tsx
// Page structure example
<main>
  <h1>Premium Co-working Spaces in Bangalore</h1>
  
  <section>
    <h2>Our Services</h2>
    <h3>Day Pass</h3>
    <h3>Meeting Rooms</h3>
  </section>
  
  <section>
    <h2>Locations</h2>
    <h3>JP Nagar</h3>
    <h3>Kormangala</h3>
  </section>
</main>
```

**Anti-Patterns to Avoid:**

```tsx
// ❌ WRONG: Using headings for styling
<h3 className="text-sm">Small text</h3>

// ✅ CORRECT: Style with CSS, use proper heading
<h3 className="text-2xl font-bold">Proper Heading</h3>

// ❌ WRONG: Skipping levels
<h2>Section</h2>
<h4>Subsection</h4> {/* Skipped h3 */}

// ✅ CORRECT: Sequential levels
<h2>Section</h2>
<h3>Subsection</h3>
```

**Testing Tools:**
- HeadingsMap browser extension
- WAVE toolbar heading structure view
- Screen reader navigation (H key in NVDA/JAWS)

### 3.3 Meaningful Link Text

**Principles:**
- Link text should make sense out of context
- Avoid generic phrases like "click here", "read more", "learn more"
- Describe the destination or action

**Current Issues:**

```tsx
// ❌ AVOID: Generic link text
<Link href="/about-us">Click here</Link>
<Link href="/services">Learn more</Link>

// ✅ CORRECT: Descriptive link text
<Link href="/about-us">About Clayworks</Link>
<Link href="/services">View all co-working services</Link>

// ✅ CORRECT: Context with aria-label
<Link href="/location/jp-nagar" aria-label="Explore JP Nagar location">
  Explore →
</Link>

// ✅ CORRECT: Using visually hidden text
<Link href="/blogs">
  Read more
  <span className="sr-only"> about co-working trends</span>
</Link>
```

**Screen Reader Only Utility Class:**

```css
/* Add to globals.css */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 3.4 ARIA Labels and Descriptions

**When to Use ARIA:**

1. **aria-label**: When visible text isn't sufficient
2. **aria-labelledby**: To reference existing text element(s)
3. **aria-describedby**: For additional context/instructions
4. **aria-hidden**: To hide decorative elements from screen readers

**Examples from Codebase:**

```tsx
// Navigation dropdowns
<button
  aria-label="Services menu"
  aria-expanded={isServicesOpen}
  aria-haspopup="true"
>
  SERVICES
</button>

// Search input
<input
  type="search"
  aria-label="Search co-working locations"
  placeholder="Search..."
/>

// Decorative icons
<ChevronDown aria-hidden="true" />

// Loading states
<button disabled aria-busy="true">
  Sending...
</button>

// Form field with help text
<div>
  <label htmlFor="phone" id="phone-label">Phone Number</label>
  <input
    id="phone"
    type="tel"
    aria-labelledby="phone-label"
    aria-describedby="phone-help"
  />
  <p id="phone-help">Include country code</p>
</div>
```

**ARIA Landmark Roles:**

```tsx
// Main layout structure (app/layout.tsx)
<body>
  <Header /> {/* Should contain <header> or role="banner" */}
  <main role="main"> {/* Or just <main> */}
    {children}
  </main>
  <Footer /> {/* Should contain <footer> or role="contentinfo" */}
</body>
```

### 3.5 Language Attributes

**HTML Lang Attribute:**

```tsx
// Current in layout.tsx
<html lang="en">

// For multilingual content
<html lang="en">
  <body>
    <p>English content</p>
    <p lang="hi">हिन्दी सामग्री</p>
  </body>
</html>
```

---

## 4. Keyboard Navigation & Focus Management

### 4.1 Full Keyboard Operability

**Requirements:**

All functionality must be operable through keyboard alone:
- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward
- **Enter**: Activate buttons and links
- **Space**: Toggle checkboxes, buttons
- **Arrow keys**: Navigate within components (dropdowns, tabs)
- **Escape**: Close modals and dropdowns

### 4.2 Skip Navigation Links

**Implementation:**

```tsx
// Add to app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

```css
/* Add to globals.css */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #2563EB;
  color: white;
  padding: 12px 20px;
  text-decoration: none;
  z-index: 9999;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
}
```

### 4.3 Logical Tab Order

**Natural Tab Order:**

Use proper HTML structure to create logical tab order. Avoid using `tabindex` values greater than 0.

```tsx
// ✅ CORRECT: Natural DOM order
<nav>
  <Link href="/">Home</Link>
  <Link href="/services">Services</Link>
  <Link href="/locations">Locations</Link>
</nav>

// ❌ AVOID: Manipulating tab order with positive tabindex
<Link href="/services" tabIndex={3}>Services</Link>
<Link href="/" tabIndex={1}>Home</Link>
<Link href="/locations" tabIndex={2}>Locations</Link>
```

**TabIndex Values:**

- `tabindex="0"`: Add to natural tab order
- `tabindex="-1"`: Remove from tab order, but focusable programmatically
- `tabindex="1+"`: **Avoid** - creates confusing tab order

### 4.4 Focus Management for Dropdowns

**Current Header Implementation Issues:**

```tsx
// ❌ CURRENT: Mouse-only dropdown
<div 
  onMouseEnter={() => setIsServicesOpen(true)}
  onMouseLeave={() => setIsServicesOpen(false)}
>

// ✅ IMPROVED: Keyboard-accessible dropdown
const ServiceDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // Focus first menu item
          const firstItem = menuRef.current?.querySelector('a');
          firstItem?.focus();
        }
        break;
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        SERVICES
        <ChevronDown aria-hidden="true" />
      </button>
      
      {isOpen && (
        <div 
          ref={menuRef}
          role="menu"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              buttonRef.current?.focus();
            }
          }}
        >
          <Link 
            href="/day-pass" 
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Day Pass
          </Link>
          {/* More menu items */}
        </div>
      )}
    </div>
  );
};
```

### 4.5 Modal Focus Management

**Best Practices:**

```tsx
// Modal component with proper focus management
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus modal
      modalRef.current?.focus();
      
      // Trap focus within modal
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements?.length) return;
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      };
      
      document.addEventListener('keydown', handleTab);
      
      return () => {
        document.removeEventListener('keydown', handleTab);
        // Restore focus
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
```

### 4.6 No Keyboard Traps

**Testing:**

Ensure users can navigate to and away from all interactive elements using only the keyboard. Common traps:
- Modals without close mechanism
- Infinite carousels
- Custom select dropdowns

---

## 5. Forms & Interactive Elements

### 5.1 Proper Label Associations

**Current ContactUs Form Issues:**

```tsx
// ✅ GOOD: Proper label association
<label htmlFor="fullName">Full Name *</label>
<input
  type="text"
  id="fullName"
  name="fullName"
  required
/>

// ❌ AVOID: Label without htmlFor
<label>Full Name</label>
<input type="text" name="fullName" />

// ❌ AVOID: Placeholder as label
<input type="text" placeholder="Full Name" />
```

**Best Practices:**
- Always use `<label>` elements with `htmlFor` attribute
- Never rely solely on placeholders
- Keep labels visible (not floating/animated away)
- Mark required fields clearly

### 5.2 Error Identification and Suggestions

**Implementation Pattern:**

```tsx
const ContactForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address (e.g., name@example.com)';
    }
    return '';
  };

  return (
    <div>
      <label htmlFor="email" id="email-label">
        Email Address *
      </label>
      <input
        type="email"
        id="email"
        name="email"
        aria-labelledby="email-label"
        aria-describedby={errors.email ? "email-error" : undefined}
        aria-invalid={!!errors.email}
        aria-required="true"
        onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
      />
      {errors.email && touched.email && (
        <p 
          id="email-error" 
          className="text-red-600 text-sm mt-1"
          role="alert"
        >
          {errors.email}
        </p>
      )}
    </div>
  );
};
```

**Error Message Guidelines:**

- Be specific about the error
- Suggest how to fix it
- Use `role="alert"` for dynamic errors
- Provide error summary at top of form

**Form-Level Error Summary:**

```tsx
{Object.keys(errors).length > 0 && (
  <div 
    role="alert" 
    className="bg-red-50 border border-red-200 rounded p-4 mb-6"
    aria-labelledby="error-summary-title"
  >
    <h3 id="error-summary-title" className="font-semibold text-red-800 mb-2">
      Please correct the following errors:
    </h3>
    <ul className="list-disc list-inside text-red-700">
      {Object.entries(errors).map(([field, message]) => (
        <li key={field}>
          <a href={`#${field}`} className="underline hover:no-underline">
            {message}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
```

### 5.3 Field Validation Patterns

**Real-Time vs On-Submit:**

```tsx
// Real-time validation (use sparingly, can be annoying)
<input
  onChange={(e) => {
    const error = validateField(e.target.value);
    setErrors(prev => ({ ...prev, [field]: error }));
  }}
/>

// ✅ RECOMMENDED: Validate on blur and submit
<input
  onBlur={(e) => {
    const error = validateField(e.target.value);
    if (error) setErrors(prev => ({ ...prev, [field]: error }));
  }}
/>
```

### 5.4 ARIA States for Forms

**Common ARIA Attributes:**

```tsx
// Required field
<input
  aria-required="true"
  required
/>

// Invalid field
<input
  aria-invalid={hasError}
  aria-errormessage="field-error"
/>

// Field with description
<input
  aria-describedby="field-help field-error"
/>

// Disabled field
<input
  disabled
  aria-disabled="true"
/>

// Loading/busy state
<button
  disabled={isSubmitting}
  aria-busy={isSubmitting}
>
  {isSubmitting ? 'Sending...' : 'Send'}
</button>
```

### 5.5 Form Submission Feedback

**Success/Failure Notifications:**

```tsx
const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm();
      setSubmitStatus('success');
      // Announce to screen readers
      announceToScreenReader('Form submitted successfully');
    } catch (error) {
      setSubmitStatus('error');
      announceToScreenReader('Form submission failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
      {submitStatus === 'success' && (
        <div 
          role="status" 
          aria-live="polite"
          className="bg-green-50 border border-green-200 rounded p-4 mt-4"
        >
          <p className="text-green-800">
            ✓ Thank you! Your message has been sent successfully.
          </p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="bg-red-50 border border-red-200 rounded p-4 mt-4"
        >
          <p className="text-red-800">
            ✗ Something went wrong. Please try again or contact support.
          </p>
        </div>
      )}
      
      <button type="submit">Submit</button>
    </form>
  );
};

// Screen reader announcement utility
const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};
```

### 5.6 Checkbox and Radio Button Groups

**Accessible Checkbox:**

```tsx
// Current implementation in ContactUs
<label className="flex items-start gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={formData.agreeToPolicy}
    onChange={handleCheckboxChange}
    className="mt-1 w-4 h-4"
  />
  <span>I agree to the privacy policy</span>
</label>

// ✅ IMPROVED: Add ARIA and proper association
<div className="flex items-start gap-3">
  <input
    type="checkbox"
    id="agree-policy"
    checked={formData.agreeToPolicy}
    onChange={handleCheckboxChange}
    aria-required="true"
    aria-describedby="policy-description"
    className="mt-1 w-4 h-4"
  />
  <label htmlFor="agree-policy" className="cursor-pointer">
    I agree to the{' '}
    <a href="/privacy-policy" className="underline">
      privacy policy
    </a>
    <span id="policy-description" className="sr-only">
      Required. You must agree to continue.
    </span>
  </label>
</div>
```

**Radio Button Group:**

```tsx
<fieldset>
  <legend className="text-base font-medium mb-3">
    Select your workspace preference
  </legend>
  
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id="day-pass"
        name="workspace"
        value="day-pass"
        checked={selected === 'day-pass'}
        onChange={handleChange}
      />
      <label htmlFor="day-pass">Day Pass</label>
    </div>
    
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id="private-office"
        name="workspace"
        value="private-office"
        checked={selected === 'private-office'}
        onChange={handleChange}
      />
      <label htmlFor="private-office">Private Office</label>
    </div>
  </div>
</fieldset>
```

### 5.7 Select Dropdowns

**Native vs Custom:**

```tsx
// ✅ PREFERRED: Native select (better accessibility)
<div>
  <label htmlFor="requirement">Requirement</label>
  <select
    id="requirement"
    name="requirement"
    aria-label="Select your requirement type"
  >
    <option value="">Select an option</option>
    <option value="day-pass">Day Pass</option>
    <option value="meeting-room">Meeting Room</option>
  </select>
</div>

// Custom select (use Radix UI Select for built-in accessibility)
import * as Select from '@radix-ui/react-select';

<Select.Root value={value} onValueChange={setValue}>
  <Select.Trigger aria-label="Select requirement">
    <Select.Value placeholder="Select an option" />
    <Select.Icon>
      <ChevronDown />
    </Select.Icon>
  </Select.Trigger>
  
  <Select.Portal>
    <Select.Content>
      <Select.Viewport>
        <Select.Item value="day-pass">
          <Select.ItemText>Day Pass</Select.ItemText>
        </Select.Item>
        {/* More items */}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
```

---

## 6. Testing & Validation

### 6.1 Automated Testing Tools

**Essential Tools:**

1. **axe DevTools (Browser Extension)**
   - Install: https://www.deque.com/axe/devtools/
   - Run on every page during development
   - Provides detailed violation reports with remediation guidance

2. **Lighthouse (Chrome DevTools)**
   ```bash
   # Run from command line
   lighthouse https://your-site.com --only-categories=accessibility --view
   ```
   - Built into Chrome DevTools
   - Generates accessibility score and recommendations
   - Run in CI/CD pipeline

3. **WAVE (WebAIM)**
   - Browser extension: https://wave.webaim.org/extension/
   - Visual feedback on accessibility issues
   - Great for color contrast checking

4. **Pa11y**
   ```bash
   # Install
   npm install -g pa11y
   
   # Run test
   pa11y https://your-site.com
   
   # CI integration
   pa11y-ci --sitemap https://your-site.com/sitemap.xml
   ```

5. **eslint-plugin-jsx-a11y**
   ```bash
   npm install --save-dev eslint-plugin-jsx-a11y
   ```
   ```json
   // Add to .eslintrc or biome.json
   {
     "extends": ["plugin:jsx-a11y/recommended"]
   }
   ```

**Automated Testing Script:**

```json
// Add to package.json
{
  "scripts": {
    "a11y:test": "pa11y-ci --sitemap http://localhost:3000/sitemap.xml",
    "a11y:lighthouse": "lighthouse http://localhost:3000 --only-categories=accessibility --output html --output-path ./accessibility-report.html"
  }
}
```

### 6.2 Manual Testing Procedures

**Keyboard Navigation Test:**

1. Unplug your mouse
2. Use only keyboard to navigate entire site:
   - Tab through all interactive elements
   - Verify focus indicators are visible
   - Test dropdown menus (Arrow keys, Enter, Escape)
   - Submit forms
   - Open/close modals
   - Use all interactive components

**Expected Keyboard Shortcuts:**
- `Tab` - Next interactive element
- `Shift + Tab` - Previous element
- `Enter` - Activate links and buttons
- `Space` - Toggle checkboxes, buttons
- `Arrow keys` - Navigate within components
- `Escape` - Close dialogs, dropdowns
- `Home/End` - First/last item in lists

### 6.3 Screen Reader Testing

**Screen Readers to Test:**

1. **NVDA (Windows)** - Free
   - Download: https://www.nvaccess.org/download/
   - Most popular free screen reader
   
2. **JAWS (Windows)** - Commercial
   - Industry standard for Windows
   - Free trial available

3. **VoiceOver (macOS/iOS)** - Built-in
   - Enable: System Preferences → Accessibility → VoiceOver
   - Shortcut: `Cmd + F5`

4. **TalkBack (Android)** - Built-in
   - Enable: Settings → Accessibility → TalkBack

**VoiceOver Basic Commands (macOS):**

```
Cmd + F5          - Toggle VoiceOver on/off
VO (Control + Option) + A  - Start reading
VO + Right Arrow  - Next item
VO + Left Arrow   - Previous item
VO + Space        - Activate item
VO + H            - Next heading
VO + L            - Next link
VO + U            - Open rotor (navigation menu)
```

**NVDA Basic Commands (Windows):**

```
Ctrl + Alt + N    - Start NVDA
Insert + Down     - Start reading
Down Arrow        - Next item
Up Arrow          - Previous item
Enter             - Activate item
H                 - Next heading
K                 - Next link
F                 - Next form field
Insert + F7       - Elements list
```

**What to Test:**

- [ ] Page title announced correctly
- [ ] Landmark regions identified
- [ ] Headings structure makes sense
- [ ] Links have descriptive text
- [ ] Images have appropriate alt text
- [ ] Form labels are read correctly
- [ ] Error messages announced
- [ ] Dynamic content changes announced
- [ ] All content is reachable
- [ ] No unexpected navigation jumps

### 6.4 Color Contrast Testing

**Tools:**

1. **Chrome DevTools**
   - Inspect element → Color picker → View contrast ratio

2. **WebAIM Contrast Checker**
   - https://webaim.org/resources/contrastchecker/
   - Enter foreground and background colors
   - Shows AA and AAA compliance

3. **Contrast Checker Extensions**
   - Colour Contrast Checker (Chrome)
   - WCAG Color Contrast Checker (Firefox)

**Test Scenarios:**
- Body text on backgrounds
- Link text (both default and hover states)
- Button text on button backgrounds
- Icon colors
- Placeholder text
- Disabled state text
- Focus indicators

### 6.5 Mobile Testing

**Test on Real Devices:**

- iOS Safari with VoiceOver
- Android Chrome with TalkBack
- Various screen sizes
- Portrait and landscape orientations

**Mobile-Specific Checks:**

- [ ] Touch targets minimum 44x44px
- [ ] Text readable without zoom
- [ ] No horizontal scrolling
- [ ] Form fields easy to tap
- [ ] Dropdowns work properly
- [ ] Gestures have alternatives
- [ ] Screen rotation supported

### 6.6 Accessibility Audit Checklist

**Perceivable:**

- [ ] All images have appropriate alt text
- [ ] Color is not the only means of conveying information
- [ ] Text contrast meets WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] Content is structured with proper headings
- [ ] Video has captions and transcripts
- [ ] Audio has transcripts

**Operable:**

- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Skip navigation link present
- [ ] Focus indicators visible
- [ ] No time limits (or user can extend)
- [ ] No flashing content (< 3 flashes per second)
- [ ] Descriptive page titles
- [ ] Clear focus order
- [ ] Link purpose clear from text

**Understandable:**

- [ ] Language of page identified (lang attribute)
- [ ] Navigation is consistent across pages
- [ ] Forms have clear labels
- [ ] Error messages are clear and helpful
- [ ] Instructions provided where needed
- [ ] No automatic page refreshes
- [ ] Predictable behavior (no unexpected context changes)

**Robust:**

- [ ] Valid HTML (no major errors)
- [ ] ARIA used correctly
- [ ] Compatible with assistive technologies
- [ ] Works in multiple browsers
- [ ] Graceful degradation for older browsers

---

## 7. Developer Best Practices

### 7.1 Semantic HTML Usage

**Use the Right Element:**

```tsx
// ❌ WRONG: div soup
<div onClick={handleClick}>Click me</div>
<div className="heading">Title</div>
<div className="list">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ✅ CORRECT: Semantic HTML
<button onClick={handleClick}>Click me</button>
<h2>Title</h2>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

**HTML5 Semantic Elements:**

```tsx
// Page structure
<body>
  <header>
    <nav aria-label="Main navigation">
      {/* Navigation links */}
    </nav>
  </header>
  
  <main>
    <article>
      <h1>Article Title</h1>
      <section>
        <h2>Section Title</h2>
        {/* Content */}
      </section>
    </article>
    
    <aside aria-label="Related content">
      {/* Sidebar */}
    </aside>
  </main>
  
  <footer>
    {/* Footer content */}
  </footer>
</body>
```

**When to Use Each Element:**

- `<button>` - For actions (submit, toggle, trigger)
- `<a>` - For navigation (links to pages)
- `<nav>` - For navigation sections
- `<main>` - Primary page content (one per page)
- `<article>` - Self-contained content (blog post, card)
- `<section>` - Thematic grouping of content
- `<aside>` - Tangentially related content
- `<header>` - Introductory content or navigation
- `<footer>` - Footer information
- `<figure>` - Self-contained media with caption
- `<time>` - Date/time values

### 7.2 Component-Level Accessibility Patterns

**Accessible Button Component:**

```tsx
// components/ui/AccessibleButton.tsx
import { forwardRef } from 'react';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ variant = 'primary', loading = false, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        aria-busy={loading}
        aria-disabled={loading || props.disabled}
        className={`btn btn-${variant}`}
        {...props}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        <span>{loading ? 'Loading...' : children}</span>
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
```

**Accessible Card Component:**

```tsx
// components/AccessibleCard.tsx
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  linkUrl: string;
  linkText?: string;
}

export const AccessibleCard = ({
  title,
  description,
  imageUrl,
  imageAlt,
  linkUrl,
  linkText = 'Learn more'
}: CardProps) => {
  return (
    <article className="card">
      <div className="card-image">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={400}
          height={300}
        />
      </div>
      
      <div className="card-content">
        <h3 className="card-title">
          <Link href={linkUrl}>
            {title}
          </Link>
        </h3>
        
        <p className="card-description">
          {description}
        </p>
        
        <Link 
          href={linkUrl}
          className="card-link"
          aria-label={`${linkText} about ${title}`}
        >
          {linkText} →
        </Link>
      </div>
    </article>
  );
};
```

**Accessible Accordion:**

```tsx
// components/Accordion.tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  id: string;
  title: string;
  content: string;
}

export const AccordionItem = ({ id, title, content }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `accordion-content-${id}`;
  const buttonId = `accordion-button-${id}`;

  return (
    <div className="accordion-item">
      <h3>
        <button
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen(!isOpen)}
          className="accordion-trigger"
        >
          <span>{title}</span>
          <ChevronDown
            aria-hidden="true"
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="accordion-content"
      >
        <p>{content}</p>
      </div>
    </div>
  );
};
```

**Accessible Tabs:**

```tsx
// components/Tabs.tsx
import { useState, useRef, KeyboardEvent } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export const AccessibleTabs = ({ tabs, defaultTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    setActiveTab(tabs[newIndex].id);
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <div className="tabs">
      <div role="tablist" aria-label="Workspace options">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={el => tabRefs.current[index] = el}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map(tab => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
          className="tab-panel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
```

### 7.3 React/Next.js Specific Considerations

**Next.js Image Component:**

```tsx
import Image from 'next/image';

// ✅ Always provide meaningful alt text
<Image
  src="/images/coworking-space.jpg"
  alt="Modern co-working space with natural light and collaborative seating"
  width={800}
  height={600}
  priority // For above-fold images
/>

// Decorative images
<Image
  src="/images/pattern.svg"
  alt=""
  aria-hidden="true"
  width={100}
  height={100}
/>
```

**Next.js Link Component:**

```tsx
import Link from 'next/link';

// ✅ Descriptive link text
<Link href="/services" className="link">
  View all co-working services
</Link>

// With additional context
<Link 
  href="/location/jp-nagar"
  aria-label="Explore our JP Nagar co-working location"
>
  JP Nagar <span aria-hidden="true">→</span>
</Link>
```

**Dynamic Route Announcements:**

```tsx
// app/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const pathname = usePathname();

  // Announce route changes to screen readers
  useEffect(() => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    
    const pageName = document.title;
    announcement.textContent = `Navigated to ${pageName}`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [pathname]);

  return <>{children}</>;
}
```

**Client vs Server Components:**

```tsx
// Server components (default in App Router)
// Great for static content, better performance

// Use 'use client' only when needed
'use client';

import { useState } from 'react';

// Interactive component with state
export function InteractiveComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <button
      aria-expanded={isOpen}
      onClick={() => setIsOpen(!isOpen)}
    >
      Toggle
    </button>
  );
}
```

### 7.4 Radix UI Accessibility Features

**Why Use Radix UI:**

- Built-in ARIA attributes
- Keyboard navigation included
- Focus management handled
- Screen reader announcements
- WAI-ARIA compliant

**Dialog/Modal:**

```tsx
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>Open Modal</button>
  </Dialog.Trigger>
  
  <Dialog.Portal>
    <Dialog.Overlay className="dialog-overlay" />
    <Dialog.Content className="dialog-content">
      <Dialog.Title>Modal Title</Dialog.Title>
      <Dialog.Description>
        Modal description text
      </Dialog.Description>
      
      {/* Content */}
      
      <Dialog.Close asChild>
        <button aria-label="Close modal">
          <X aria-hidden="true" />
        </button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**Dropdown Menu:**

```tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <button aria-label="Services menu">
      Services <ChevronDown aria-hidden="true" />
    </button>
  </DropdownMenu.Trigger>
  
  <DropdownMenu.Portal>
    <DropdownMenu.Content className="dropdown-content">
      <DropdownMenu.Item asChild>
        <Link href="/day-pass">Day Pass</Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item asChild>
        <Link href="/meeting-rooms">Meeting Rooms</Link>
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item asChild>
        <Link href="/private-office">Private Office</Link>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
```

### 7.5 Common Anti-Patterns to Avoid

**❌ Don't Remove Focus Styles:**

```css
/* NEVER DO THIS */
*:focus {
  outline: none;
}

button:focus {
  outline: none;
}
```

**❌ Don't Use Divs as Buttons:**

```tsx
// WRONG
<div onClick={handleClick}>Click me</div>

// CORRECT
<button onClick={handleClick}>Click me</button>
```

**❌ Don't Use Click Handlers on Non-Interactive Elements:**

```tsx
// WRONG
<div onClick={handleClick}>
  Click me
</div>

// CORRECT
<button onClick={handleClick}>
  Click me
</button>

// OR if you MUST use a div (rare cases)
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Click me
</div>
```

**❌ Don't Hide Content with display: none When It Should Be Accessible:**

```tsx
// WRONG - hides from screen readers
<div style={{ display: 'none' }}>
  Important information
</div>

// CORRECT - visually hidden but accessible
<div className="sr-only">
  Important information
</div>
```

**❌ Don't Use Placeholder as Label:**

```tsx
// WRONG
<input type="text" placeholder="Email address" />

// CORRECT
<label htmlFor="email">Email address</label>
<input 
  type="email" 
  id="email"
  placeholder="name@example.com"
/>
```

**❌ Don't Use Positive tabindex:**

```tsx
// WRONG - disrupts natural tab order
<button tabIndex={3}>Third</button>
<button tabIndex={1}>First</button>
<button tabIndex={2}>Second</button>

// CORRECT - natural DOM order
<button>First</button>
<button>Second</button>
<button>Third</button>
```

**❌ Don't Use aria-label on Divs/Spans:**

```tsx
// WRONG - aria-label doesn't work on non-semantic elements
<div aria-label="Close">×</div>

// CORRECT
<button aria-label="Close">
  <span aria-hidden="true">×</span>
</button>
```

### 7.6 Accessibility Utilities

**Screen Reader Only Class:**

```css
/* Add to globals.css */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:focus,
.sr-only-focusable:active {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

**Focus Management Hook:**

```tsx
// hooks/useFocusTrap.ts
import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTab);
    };
  }, [isActive]);

  return containerRef;
};
```

**Live Region Announcer:**

```tsx
// utils/announcer.ts
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Usage
announce('Form submitted successfully', 'polite');
announce('Error: Please fix the form errors', 'assertive');
```

---

## 8. Ongoing Maintenance

### 8.1 Regular Accessibility Reviews

**Quarterly Accessibility Audits:**

Schedule comprehensive accessibility audits every 3 months:

1. **Automated scan** with axe DevTools on all pages
2. **Keyboard navigation test** through main user flows
3. **Screen reader test** with NVDA/VoiceOver
4. **Color contrast review** of new components
5. **Mobile accessibility check** on iOS and Android

**Audit Template:**

```markdown
# Accessibility Audit - [Date]

## Pages Tested
- [ ] Home page
- [ ] Services pages (Day Pass, Meeting Rooms, etc.)
- [ ] Location pages
- [ ] About Us
- [ ] Careers
- [ ] Contact Us
- [ ] Blog

## Testing Methods
- [ ] Automated (axe DevTools)
- [ ] Keyboard navigation
- [ ] Screen reader (specify which)
- [ ] Color contrast
- [ ] Mobile devices

## Issues Found
1. [Issue description] - Priority: High/Medium/Low
   - Location: [page/component]
   - WCAG Criterion: [e.g., 2.4.7 Focus Visible]
   - Remediation: [how to fix]

## Recommendations
[List of improvements]

## Next Steps
[Action items with assignees and due dates]
```

### 8.2 Regression Testing in CI/CD

**Add Accessibility Tests to Pipeline:**

```json
// package.json
{
  "scripts": {
    "test:a11y": "npm run build && npm run test:a11y:run",
    "test:a11y:run": "start-server-and-test start http://localhost:3000 'pa11y-ci'"
  },
  "devDependencies": {
    "pa11y-ci": "^3.0.1",
    "start-server-and-test": "^2.0.0"
  }
}
```

**Pa11y CI Configuration:**

```json
// .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 10000,
    "wait": 1000,
    "chromeLaunchConfig": {
      "args": ["--no-sandbox"]
    }
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/services",
    "http://localhost:3000/locations",
    "http://localhost:3000/about-us",
    "http://localhost:3000/contact-us"
  ]
}
```

**GitHub Actions Workflow:**

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Tests

on:
  pull_request:
    branches: [main, testing]
  push:
    branches: [main]

jobs:
  a11y-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Run accessibility tests
        run: npm run test:a11y
        
      - name: Upload report
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: accessibility-report
          path: pa11y-report.json
```

### 8.3 Team Training and Awareness

**Developer Onboarding:**

Include accessibility in developer onboarding:
1. Share this document
2. Install required tools (axe DevTools, screen reader)
3. Complete accessibility training module
4. Review accessible component examples
5. Pair program on accessible features

**Regular Training Sessions:**

- **Monthly**: 30-minute accessibility tip/demo
- **Quarterly**: Full accessibility workshop
- **Annually**: External accessibility audit and training

**Training Resources:**

- W3C Web Accessibility Initiative: https://www.w3.org/WAI/
- WebAIM: https://webaim.org/
- Deque University: https://dequeuniversity.com/
- A11y Project: https://www.a11yproject.com/
- MDN Accessibility Docs: https://developer.mozilla.org/en-US/docs/Web/Accessibility

### 8.4 Accessibility Champions

**Designate Team Champions:**

- At least one accessibility champion per team
- Responsible for:
  - Reviewing PRs for accessibility
  - Staying current with WCAG updates
  - Conducting internal training
  - Advocating for accessibility in planning

### 8.5 Documentation Updates

**Keep This Document Current:**

- Update when WCAG standards change
- Add new component patterns as developed
- Document solutions to unique problems
- Share lessons learned from audits
- Version control this document

**Component Documentation:**

Document accessibility features in component files:

```tsx
/**
 * AccessibleButton Component
 * 
 * Accessible button with loading states and icon support.
 * 
 * Accessibility features:
 * - Proper disabled state handling
 * - aria-busy for loading states
 * - Icon hidden from screen readers
 * - Keyboard accessible
 * 
 * @example
 * <AccessibleButton 
 *   loading={isLoading}
 *   onClick={handleClick}
 * >
 *   Submit
 * </AccessibleButton>
 */
```

### 8.6 Continuous Improvement Process

**Accessibility Feedback Loop:**

1. **Collect feedback** from users with disabilities
2. **Monitor support tickets** for accessibility issues
3. **Track metrics** (bounce rate, task completion)
4. **Implement improvements** based on data
5. **Validate fixes** with users

**Accessibility Metrics to Track:**

- Lighthouse accessibility score (target: 95+)
- Number of WCAG violations (target: 0 critical)
- Keyboard navigation success rate
- Screen reader user feedback
- Task completion rates for users with disabilities

**Monthly Review Meeting:**

- Review accessibility metrics
- Discuss new issues found
- Prioritize fixes
- Update roadmap
- Celebrate wins

---

## 9. Quick Reference Checklists

### 9.1 Pre-Launch Accessibility Checklist

**Essential Items:**

- [ ] All images have alt text (or alt="" for decorative)
- [ ] Color contrast meets WCAG AA (4.5:1 normal text, 3:1 large text)
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skips)
- [ ] All form fields have visible labels
- [ ] Form validation provides clear error messages
- [ ] Skip to main content link is present
- [ ] Focus indicators are visible on all interactive elements
- [ ] Full keyboard navigation works
- [ ] No keyboard traps
- [ ] Page has descriptive `<title>`
- [ ] HTML lang attribute set
- [ ] Landmarks used (header, main, nav, footer)
- [ ] Links have descriptive text
- [ ] Buttons use `<button>` element
- [ ] ARIA used correctly (not overdone)
- [ ] Screen reader testing completed
- [ ] Mobile touch targets at least 44x44px
- [ ] No content relies on color alone
- [ ] No time limits (or can be extended)
- [ ] No flashing content
- [ ] Automated tests pass (axe, Lighthouse)

### 9.2 Component Development Checklist

**When Building New Components:**

- [ ] Use semantic HTML
- [ ] Add proper ARIA attributes if needed
- [ ] Ensure keyboard accessibility
- [ ] Provide visible focus indicators
- [ ] Test with keyboard only
- [ ] Test with screen reader
- [ ] Check color contrast
- [ ] Test on mobile
- [ ] Add accessibility documentation
- [ ] Run axe DevTools
- [ ] Review with accessibility champion

### 9.3 Code Review Checklist

**When Reviewing PRs:**

- [ ] Semantic HTML used appropriately
- [ ] Images have alt text
- [ ] Form fields have labels
- [ ] Buttons are `<button>` elements (not divs)
- [ ] Focus styles not removed
- [ ] ARIA attributes used correctly
- [ ] Color contrast adequate
- [ ] Component is keyboard accessible
- [ ] No positive tabindex values
- [ ] Link text is descriptive

### 9.4 Page Launch Checklist

**Before Publishing a New Page:**

- [ ] Page title is unique and descriptive
- [ ] H1 present and describes page purpose
- [ ] Heading hierarchy is logical
- [ ] All images have appropriate alt text
- [ ] Color contrast meets standards
- [ ] Forms have proper labels and error handling
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Mobile accessibility verified
- [ ] Automated tests pass
- [ ] Landmarks properly used
- [ ] Skip links work

---

## Appendix A: Useful Resources

### Standards and Guidelines

- **WCAG 2.2**: https://www.w3.org/WAI/WCAG22/quickref/
- **WAI-ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **Section 508**: https://www.section508.gov/

### Testing Tools

- **axe DevTools**: https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/
- **Lighthouse**: Built into Chrome DevTools
- **Pa11y**: https://pa11y.org/
- **NVDA Screen Reader**: https://www.nvaccess.org/
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

### Learning Resources

- **WebAIM**: https://webaim.org/
- **A11y Project**: https://www.a11yproject.com/
- **Inclusive Components**: https://inclusive-components.design/
- **Accessibility Developer Guide**: https://www.accessibility-developer-guide.com/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

### Communities

- **WebAIM Discussion List**: https://webaim.org/discussion/
- **A11y Slack**: https://web-a11y.slack.com/
- **Twitter/X**: #a11y hashtag

---

## Appendix B: Glossary

**Accessibility (a11y)**: The practice of making websites usable by people of all abilities and disabilities.

**ARIA**: Accessible Rich Internet Applications - a set of attributes that define ways to make web content more accessible.

**Assistive Technology**: Software or hardware that helps people with disabilities use computers (e.g., screen readers, switch devices).

**Focus Indicator**: Visual indicator showing which element currently has keyboard focus.

**Keyboard Trap**: A situation where keyboard users cannot navigate away from an element.

**Landmark**: HTML elements or ARIA roles that define regions of a page (e.g., navigation, main content).

**Screen Reader**: Software that reads content aloud for people who are blind or have low vision.

**Semantic HTML**: HTML that reinforces the meaning of content rather than just appearance.

**WCAG**: Web Content Accessibility Guidelines - international standards for web accessibility.

---

## Appendix C: WCAG 2.2 AA Success Criteria

### Level A (Minimum)

**1. Perceivable**
- 1.1.1 Non-text Content
- 1.2.1 Audio-only and Video-only
- 1.2.2 Captions (Prerecorded)
- 1.2.3 Audio Description or Media Alternative
- 1.3.1 Info and Relationships
- 1.3.2 Meaningful Sequence
- 1.3.3 Sensory Characteristics
- 1.4.1 Use of Color
- 1.4.2 Audio Control

**2. Operable**
- 2.1.1 Keyboard
- 2.1.2 No Keyboard Trap
- 2.1.4 Character Key Shortcuts
- 2.2.1 Timing Adjustable
- 2.2.2 Pause, Stop, Hide
- 2.3.1 Three Flashes or Below Threshold
- 2.4.1 Bypass Blocks
- 2.4.2 Page Titled
- 2.4.3 Focus Order
- 2.4.4 Link Purpose (In Context)
- 2.5.1 Pointer Gestures
- 2.5.2 Pointer Cancellation
- 2.5.3 Label in Name
- 2.5.4 Motion Actuation

**3. Understandable**
- 3.1.1 Language of Page
- 3.2.1 On Focus
- 3.2.2 On Input
- 3.2.6 Consistent Help
- 3.3.1 Error Identification
- 3.3.2 Labels or Instructions
- 3.3.7 Redundant Entry

**4. Robust**
- 4.1.2 Name, Role, Value

### Level AA (Target)

**1. Perceivable**
- 1.2.4 Captions (Live)
- 1.2.5 Audio Description (Prerecorded)
- 1.3.4 Orientation
- 1.3.5 Identify Input Purpose
- 1.4.3 Contrast (Minimum) - **4.5:1**
- 1.4.4 Resize Text
- 1.4.5 Images of Text
- 1.4.10 Reflow
- 1.4.11 Non-text Contrast - **3:1**
- 1.4.12 Text Spacing
- 1.4.13 Content on Hover or Focus

**2. Operable**
- 2.4.5 Multiple Ways
- 2.4.6 Headings and Labels
- 2.4.7 Focus Visible
- 2.4.11 Focus Not Obscured (Minimum)
- 2.5.7 Dragging Movements
- 2.5.8 Target Size (Minimum) - **24x24px**

**3. Understandable**
- 3.1.2 Language of Parts
- 3.2.3 Consistent Navigation
- 3.2.4 Consistent Identification
- 3.3.3 Error Suggestion
- 3.3.4 Error Prevention (Legal, Financial, Data)
- 3.3.8 Accessible Authentication (Minimum)

---

## Document Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-11-03 | Initial document creation | Clayworks Team |

---

## Contact and Support

For questions about this accessibility plan or to report accessibility issues:

- **Email**: accessibility@clayworks.com
- **Internal Slack**: #accessibility
- **Accessibility Champion**: [Name]

---

**Remember**: Accessibility is not a one-time task but an ongoing commitment. Every team member plays a role in creating an inclusive digital experience for all users.

<!-- Prompt -->

1. READ the guideline
2. AUDIT the component
   - Run axe DevTools
   - Test keyboard navigation
   - Check against checklist
3. FIX issues 
   - Make changes
   - Test locally
4. TEST thoroughly
   - Keyboard only
   - Screen reader
   - Visual check

