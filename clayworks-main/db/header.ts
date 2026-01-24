// Header configuration - makes the header dynamic and easy to maintain
//
// Environment Variables:
// - NEXT_PUBLIC_CONTACT_PHONE: Phone number for tel: links (digits only, e.g., "9123456789")
// - NEXT_PUBLIC_CONTACT_PHONE_DISPLAY: Phone number display format (can include formatting, e.g., "9123 456 789")
//   If not set, will fall back to NEXT_PUBLIC_CONTACT_PHONE

export interface SolutionItem {
  title: string;
  subtitle: string;
  href: string;
}

export interface LocationMapping {
  [slug: string]: {
    title: string;
    subtitle: string;
  };
}

export interface ResourceItem {
  title: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderConfig {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp?: string;
  };
  navigation: NavItem[];
  solutions: SolutionItem[];
  locations: {
    cityLabel: string;
    mapping: LocationMapping;
  };
  resources: ResourceItem[];
}

export const headerConfig: HeaderConfig = {
  logo: {
    src: "/images/logo.png",
    alt: "Clayworks Logo",
    width: 120,
    height: 32,
  },
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "9123456789",
    phoneDisplay:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ||
      process.env.NEXT_PUBLIC_CONTACT_PHONE ||
      "+91-8047111888",
  },
  navigation: [
    {
      label: "OUR STORY",
      href: "/about-us",
    },
  ],
  solutions: [
    {
      title: "DAY PASS",
      subtitle:
        "Access professional, distraction-free workspaces designed for focus and flow.",
      href: "/day-pass",
    },
    {
      title: "MEETING ROOM",
      subtitle:
        "Ready-to-connect meeting rooms designed for focus, comfort, and collaboration.",
      href: "/meeting-rooms",
    },
    {
      title: "BUILT-TO-SUIT",
      subtitle:
        "Custom-built offices tailored to your brand, team size, and workflow—from design to delivery.",
      href: "/built-to-suit",
    },
    {
      title: "PRIVATE OFFICE",
      subtitle:
        "Fully-managed private suites offering security, privacy, and all the perks of a premium workspace.",
      href: "/private-office",
    },
    {
      title: "VIRTUAL OFFICE",
      subtitle:
        "A credible business presence with a premium address, mail handling, and reception services, without a lease.",
      href: "/virtual-office",
    },
  ],
  locations: {
    cityLabel: "Bengaluru",
    mapping: {
      "jp-nagar": { title: "CLAYWORKS MINIFOREST", subtitle: "JP Nagar" },
      "bannerghatta-rd": {
        title: "CLAYWORKS CREATE",
        subtitle: "Bannerghatta Road",
      },
      "central-bengaluru": {
        title: "CLAYWORKS CBD",
        subtitle: "Commissariat Road, Central Bengaluru",
      },
      "richmond-road": { title: "CLAYWORKS OPUS", subtitle: "Richmond Road" },
      basavanagudi: {
        title: "CLAYWORKS SOUTH END",
        subtitle: "Basavanagudi",
      },
      koramangala: { title: "CLAYWORKS 371", subtitle: "Koramangala" },
      "kanakapura-rd": {
        title: "CLAYWORKS SHANKARAA",
        subtitle: "Kanakapura Road",
      },
      whitefield: { title: "CLAYWORKS WHITEFIELD", subtitle: "Whitefield" },
    },
  },
  resources: [
    {
      title: "Careers",
      href: "/careers",
    },
    {
      title: "Blogs",
      href: "/blogs",
    },
    {
      title: "Partners",
      href: "/partners",
    },
  ],
};

// Export individual parts for convenience
export const locationMapping = headerConfig.locations.mapping;
export const solutions = headerConfig.solutions;
export const resources = headerConfig.resources;
export const navigation = headerConfig.navigation;
export const contactInfo = headerConfig.contact;
export const logoConfig = headerConfig.logo;
