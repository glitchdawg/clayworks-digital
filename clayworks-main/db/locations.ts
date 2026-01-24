export type LocationDetail = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  operatingHours: string;
  rating: { rating: number; reviewCount: number };
  mainImage: { src: string; alt: string; hasPlayButton?: boolean };
  breadcrumbs: Array<{ label: string; href?: string }>;
  pricing?: {
    eyebrow?: string;
    title: string;
    cards: Array<{
      imageSrc?: string;
      imageAlt?: string;
      title: string;
      description?: string;
      badges?: Array<{
        label: string;
        variant?: "default" | "outline" | "filled";
      }>;
      price?: string;
      pricePrefix?: string;
      priceSuffix?: string;
      ctaText: string;
      ctaVariant?: "primary" | "secondary" | "outline";
      featured?: boolean;
    }>;
  };
  planComparison?: {
    title: string;
    columns?: 2 | 3;
    cards: Array<{
      eyebrow: string;
      title: string;
      features: Array<{
        icon: "building" | "user" | "meeting";
        title: string;
        subtitle?: string;
      }>;
      sponsorBadge?: { text: string; logo: string; logoAlt: string };
      ctaText: string;
    }>;
  };
  proximity?: {
    mapImage: { src: string; alt: string };
    title: string;
    items: Array<{
      icon: "airport" | "metro" | "bus" | "hotel" | "building" | "city";
      label: string;
      distance: string;
    }>;
  };
};

export const locationsDetail: LocationDetail[] = [
  {
    slug: "jp-nagar",
    title: "ClayWorks JP Nagar",
    subtitle: "JP Nagar, Bengaluru",
    description:
      "A calm, green pocket of the city with fast access to ORR. Designed for focused teams who love serene neighborhoods.",
    operatingHours: "Open 24/7",
    rating: { rating: 4.8, reviewCount: 127 },
    mainImage: {
      src: "/images/jpnagar.jpg",
      alt: "ClayWorks JP Nagar",
      hasPlayButton: true,
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "JP Nagar" },
    ],
    pricing: {
      eyebrow: "EXPLORE PLANS",
      title: "Choose Your Perfect Workspace",
      cards: [
        {
          imageSrc: "/images/business.png",
          imageAlt: "Day Pass",
          title: "Day Pass",
          description:
            "Step in, plug in, and make the most of your day in a professional environment built for success.",
          badges: [{ label: "Solo founders" }, { label: "Freelancers" }],
          price: "₹999",
          pricePrefix: "From",
          priceSuffix: "/day",
          ctaText: "Check Availability",
          ctaVariant: "outline",
          featured: true,
        },
        {
          imageSrc: "/images/locate.png",
          imageAlt: "Private Office",
          title: "Private Office",
          description:
            "A fully managed, branded workspace—without the headaches of ownership. Custom-fit to your team, and ready to move in.",
          badges: [{ label: "Small businesses" }, { label: "Early startups" }],
          price: "₹9999",
          pricePrefix: "From",
          priceSuffix: "/month",
          ctaText: "Schedule Call",
          ctaVariant: "outline",
        },
        {
          imageSrc: "/images/gst.png",
          imageAlt: "Meeting Rooms",
          title: "Meeting Rooms",
          description:
            "Host productive, professional meetings in fully-equipped rooms designed for focus, collaboration, and impact.",
          badges: [{ label: "Global entrepreneurs" }],
          price: "₹999",
          pricePrefix: "From",
          priceSuffix: "/hour",
          ctaText: "Check Availability",
          ctaVariant: "outline",
        },
      ],
    },
    planComparison: {
      title: "Need Little Extra",
      columns: 2,
      cards: [
        {
          eyebrow: "PREMIUM PLAN",
          title: "Startups Wanting More",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "2 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "2 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          ctaText: "Know More",
        },
        {
          eyebrow: "ELITE PLAN",
          title: "Accelerating Businesses",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "5 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "10 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          sponsorBadge: {
            text: "Endpoint Protection by",
            logo: "/images/badge.png",
            logoAlt: "Trend Micro",
          },
          ctaText: "Know More",
        },
      ],
    },
    proximity: {
      mapImage: {
        src: "/images/location.png",
        alt: "Map showing JP Nagar proximity",
      },
      title: "Convenient Access Near Key Destinations",
      items: [
        {
          icon: "airport",
          label: "Kempegowda International Airport Bengaluru",
          distance: "23 KM",
        },
        {
          icon: "metro",
          label: "Rashtriya Vidyalaya Road Subway Station",
          distance: "0.5 KM",
        },
        { icon: "bus", label: "Banashankari Bus Stand", distance: "0.5 KM" },
        { icon: "hotel", label: "The Marriott", distance: "1.5 KM" },
        {
          icon: "building",
          label: "The Chancery Pavilion",
          distance: "2.5 KM",
        },
        { icon: "city", label: "Bengaluru City Center", distance: "12.5 KM" },
      ],
    },
  },
  {
    slug: "bannerghatta-rd",
    title: "ClayWorks Bannerghatta Rd",
    subtitle: "Bannerghatta Road, Bengaluru",
    description:
      "Biophilic work zones and meeting spaces connected to key business corridors on Bannerghatta Road.",
    operatingHours: "Open 24/7",
    rating: { rating: 4.7, reviewCount: 98 },
    mainImage: {
      src: "/images/workspace2.jpg",
      alt: "ClayWorks Bannerghatta Rd",
      hasPlayButton: true,
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "Bannerghatta Rd" },
    ],
    pricing: {
      eyebrow: "EXPLORE PLANS",
      title: "Plans That Fit Your Stage of Growth",
      cards: [
        {
          imageSrc: "/images/business.png",
          imageAlt: "Day Pass",
          title: "Day Pass",
          description: "Flexible day access with amenities and support.",
          badges: [{ label: "Solo founders" }],
          price: "₹899",
          pricePrefix: "From",
          priceSuffix: "/day",
          ctaText: "Check Availability",
        },
        {
          imageSrc: "/images/locate.png",
          imageAlt: "Private Office",
          title: "Private Office",
          description: "Custom private suites with brand-ready interiors.",
          badges: [{ label: "Growing teams" }],
          price: "₹9499",
          pricePrefix: "From",
          priceSuffix: "/month",
          ctaText: "Schedule Call",
        },
        {
          imageSrc: "/images/gst.png",
          imageAlt: "Meeting Rooms",
          title: "Meeting Rooms",
          description: "Professional rooms with screens and whiteboards.",
          badges: [{ label: "Client meetings" }],
          price: "₹799",
          pricePrefix: "From",
          priceSuffix: "/hour",
          ctaText: "Check Availability",
        },
      ],
    },
    planComparison: {
      title: "Need Little Extra",
      columns: 2,
      cards: [
        {
          eyebrow: "PREMIUM PLAN",
          title: "Startups Wanting More",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "2 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "2 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          ctaText: "Know More",
        },
        {
          eyebrow: "ELITE PLAN",
          title: "Accelerating Businesses",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "5 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "10 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          sponsorBadge: {
            text: "Endpoint Protection by",
            logo: "/images/trend.svg",
            logoAlt: "Trend Micro",
          },
          ctaText: "Know More",
        },
      ],
    },
    proximity: {
      mapImage: {
        src: "/images/location.png",
        alt: "Map showing Bannerghatta proximity",
      },
      title: "Convenient Access Near Key Destinations",
      items: [
        {
          icon: "airport",
          label: "Kempegowda International Airport Bengaluru",
          distance: "23 KM",
        },
        {
          icon: "metro",
          label: "Rashtriya Vidyalaya Road Subway Station",
          distance: "0.5 KM",
        },
        { icon: "bus", label: "Banashankari Bus Stand", distance: "0.5 KM" },
        { icon: "hotel", label: "The Marriott", distance: "1.5 KM" },
        {
          icon: "building",
          label: "The Chancery Pavilion",
          distance: "2.5 KM",
        },
        { icon: "city", label: "Bengaluru City Center", distance: "12.5 KM" },
      ],
    },
  },
  {
    slug: "central-bengaluru",
    title: "ClayWorks Central Bengaluru",
    subtitle: "CBD, Bengaluru",
    description:
      "Premium address in the city’s business district with hospitality-grade amenities and transit connectivity.",
    operatingHours: "Mon–Sat • 8 AM – 10 PM",
    rating: { rating: 4.9, reviewCount: 212 },
    mainImage: { src: "/images/home.png", alt: "ClayWorks Central Bengaluru" },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "Central Bengaluru" },
    ],
    pricing: {
      eyebrow: "EXPLORE PLANS",
      title: "Choose Your Perfect Workspace",
      cards: [
        {
          imageSrc: "/images/business.png",
          imageAlt: "Day Pass",
          title: "Day Pass",
          description: "Prime CBD desks for a productive day.",
          badges: [{ label: "Consultants" }],
          price: "₹1299",
          pricePrefix: "From",
          priceSuffix: "/day",
          ctaText: "Check Availability",
        },
        {
          imageSrc: "/images/locate.png",
          imageAlt: "Private Office",
          title: "Private Office",
          description: "Executive private offices with hospitality service.",
          badges: [{ label: "Enterprises" }],
          price: "₹14999",
          pricePrefix: "From",
          priceSuffix: "/month",
          ctaText: "Schedule Call",
          featured: true,
        },
        {
          imageSrc: "/images/gst.png",
          imageAlt: "Meeting Rooms",
          title: "Meeting Rooms",
          description: "Boardrooms and collaboration spaces on demand.",
          badges: [{ label: "Investor pitches" }],
          price: "₹1199",
          pricePrefix: "From",
          priceSuffix: "/hour",
          ctaText: "Check Availability",
        },
      ],
    },
    planComparison: {
      title: "Need Little Extra",
      columns: 2,
      cards: [
        {
          eyebrow: "PREMIUM PLAN",
          title: "Startups Wanting More",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "2 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "2 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          ctaText: "Know More",
        },
        {
          eyebrow: "ELITE PLAN",
          title: "Accelerating Businesses",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "5 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "10 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          sponsorBadge: {
            text: "Endpoint Protection by",
            logo: "/images/trend.svg",
            logoAlt: "Trend Micro",
          },
          ctaText: "Know More",
        },
      ],
    },
    proximity: {
      mapImage: {
        src: "/images/location.png",
        alt: "Map showing Central Bengaluru proximity",
      },
      title: "Convenient Access Near Key Destinations",
      items: [
        {
          icon: "airport",
          label: "Kempegowda International Airport Bengaluru",
          distance: "23 KM",
        },
        {
          icon: "metro",
          label: "Rashtriya Vidyalaya Road Subway Station",
          distance: "0.5 KM",
        },
        { icon: "bus", label: "Banashankari Bus Stand", distance: "0.5 KM" },
        { icon: "hotel", label: "The Marriott", distance: "1.5 KM" },
        {
          icon: "building",
          label: "The Chancery Pavilion",
          distance: "2.5 KM",
        },
        { icon: "city", label: "Bengaluru City Center", distance: "12.5 KM" },
      ],
    },
  },
  {
    slug: "richmond-road",
    title: "ClayWorks Opus",
    subtitle: "Richmond Road, BLR",
    description:
      "Opus blends productivity, creativity, and connectivity—where every detail is designed for teams to thrive.",
    operatingHours: "Open 24/7",
    rating: { rating: 4.8, reviewCount: 127 },
    mainImage: {
      src: "/images/meeting.jpg",
      alt: "ClayWorks Opus Workspace",
      hasPlayButton: true,
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "Opus" },
    ],
    pricing: {
      eyebrow: "EXPLORE PLANS",
      title: "Choose Your Perfect Workspace",
      cards: [
        {
          imageSrc: "/images/business.png",
          imageAlt: "Day Pass",
          title: "Day Pass",
          description: "Plug-and-play desks at Opus with great coffee.",
          badges: [{ label: "Freelancers" }],
          price: "₹999",
          pricePrefix: "From",
          priceSuffix: "/day",
          ctaText: "Check Availability",
        },
        {
          imageSrc: "/images/locate.png",
          imageAlt: "Private Office",
          title: "Private Office",
          description: "Branded suites tailored to your team.",
          badges: [{ label: "SMBs" }],
          price: "₹10999",
          pricePrefix: "From",
          priceSuffix: "/month",
          ctaText: "Schedule Call",
        },
        {
          imageSrc: "/images/gst.png",
          imageAlt: "Meeting Rooms",
          title: "Meeting Rooms",
          description: "Presentation-ready rooms with AV.",
          badges: [{ label: "Workshops" }],
          price: "₹999",
          pricePrefix: "From",
          priceSuffix: "/hour",
          ctaText: "Check Availability",
        },
      ],
    },
    planComparison: {
      title: "Need Little Extra",
      columns: 2,
      cards: [
        {
          eyebrow: "PREMIUM PLAN",
          title: "Startups Wanting More",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "2 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "2 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          ctaText: "Know More",
        },
        {
          eyebrow: "ELITE PLAN",
          title: "Accelerating Businesses",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "5 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "10 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          sponsorBadge: {
            text: "Endpoint Protection by",
            logo: "/images/trend.svg",
            logoAlt: "Trend Micro",
          },
          ctaText: "Know More",
        },
      ],
    },
    proximity: {
      mapImage: {
        src: "/images/location.png",
        alt: "Map showing Richmond Road proximity",
      },
      title: "Convenient Access Near Key Destinations",
      items: [
        {
          icon: "airport",
          label: "Kempegowda International Airport Bengaluru",
          distance: "23 KM",
        },
        {
          icon: "metro",
          label: "Rashtriya Vidyalaya Road Subway Station",
          distance: "0.5 KM",
        },
        { icon: "bus", label: "Banashankari Bus Stand", distance: "0.5 KM" },
        { icon: "hotel", label: "The Marriott", distance: "1.5 KM" },
        {
          icon: "building",
          label: "The Chancery Pavilion",
          distance: "2.5 KM",
        },
        { icon: "city", label: "Bengaluru City Center", distance: "12.5 KM" },
      ],
    },
  },
  {
    slug: "basavanagudi",
    title: "ClayWorks Basavanagudi",
    subtitle: "Basavanagudi, Bengaluru",
    description:
      "A heritage neighborhood reimagined for modern work—quiet lanes, quick eats, and leafy nooks.",
    operatingHours: "Mon–Sat • 8 AM – 10 PM",
    rating: { rating: 4.6, reviewCount: 76 },
    mainImage: { src: "/images/workspace.jpg", alt: "ClayWorks Basavanagudi" },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "Basavanagudi" },
    ],
    pricing: {
      eyebrow: "EXPLORE PLANS",
      title: "Choose Your Perfect Workspace",
      cards: [
        {
          imageSrc: "/images/business.png",
          imageAlt: "Day Pass",
          title: "Day Pass",
          description: "Quiet day desks amidst heritage lanes.",
          badges: [{ label: "Creators" }],
          price: "₹799",
          pricePrefix: "From",
          priceSuffix: "/day",
          ctaText: "Check Availability",
        },
        {
          imageSrc: "/images/locate.png",
          imageAlt: "Private Office",
          title: "Private Office",
          description: "Calm private suites for focused work.",
          badges: [{ label: "Small teams" }],
          price: "₹8999",
          pricePrefix: "From",
          priceSuffix: "/month",
          ctaText: "Schedule Call",
        },
        {
          imageSrc: "/images/gst.png",
          imageAlt: "Meeting Rooms",
          title: "Meeting Rooms",
          description: "Meet clients in a peaceful setting.",
          badges: [{ label: "Client meets" }],
          price: "₹699",
          pricePrefix: "From",
          priceSuffix: "/hour",
          ctaText: "Check Availability",
        },
      ],
    },
    planComparison: {
      title: "Need Little Extra",
      columns: 2,
      cards: [
        {
          eyebrow: "PREMIUM PLAN",
          title: "Startups Wanting More",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "2 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "2 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          ctaText: "Know More",
        },
        {
          eyebrow: "ELITE PLAN",
          title: "Accelerating Businesses",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "5 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "10 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          sponsorBadge: {
            text: "Endpoint Protection by",
            logo: "/images/trend.svg",
            logoAlt: "Trend Micro",
          },
          ctaText: "Know More",
        },
      ],
    },
    proximity: {
      mapImage: {
        src: "/images/location.png",
        alt: "Map showing Basavanagudi proximity",
      },
      title: "Convenient Access Near Key Destinations",
      items: [
        {
          icon: "airport",
          label: "Kempegowda International Airport Bengaluru",
          distance: "23 KM",
        },
        {
          icon: "metro",
          label: "Rashtriya Vidyalaya Road Subway Station",
          distance: "0.5 KM",
        },
        { icon: "bus", label: "Banashankari Bus Stand", distance: "0.5 KM" },
        { icon: "hotel", label: "The Marriott", distance: "1.5 KM" },
        {
          icon: "building",
          label: "The Chancery Pavilion",
          distance: "2.5 KM",
        },
        { icon: "city", label: "Bengaluru City Center", distance: "12.5 KM" },
      ],
    },
  },
  {
    slug: "koramangala",
    title: "ClayWorks Koramangala",
    subtitle: "Koramangala, Bengaluru",
    description:
      "Lively, central, and startup-ready—collaboration spaces and quick access to HSR/Indiranagar.",
    operatingHours: "Open 24/7",
    rating: { rating: 4.7, reviewCount: 134 },
    mainImage: {
      src: "/images/servicecard3.jpg",
      alt: "ClayWorks Koramangala",
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "Koramangala" },
    ],
    pricing: {
      eyebrow: "EXPLORE PLANS",
      title: "Choose Your Perfect Workspace",
      cards: [
        {
          imageSrc: "/images/business.png",
          imageAlt: "Day Pass",
          title: "Day Pass",
          description: "Vibrant day desks in startup central.",
          badges: [{ label: "Solo founders" }],
          price: "₹999",
          pricePrefix: "From",
          priceSuffix: "/day",
          ctaText: "Check Availability",
        },
        {
          imageSrc: "/images/locate.png",
          imageAlt: "Private Office",
          title: "Private Office",
          description: "Brandable offices near cafés and talent.",
          badges: [{ label: "Startups" }],
          price: "₹10499",
          pricePrefix: "From",
          priceSuffix: "/month",
          ctaText: "Schedule Call",
        },
        {
          imageSrc: "/images/gst.png",
          imageAlt: "Meeting Rooms",
          title: "Meeting Rooms",
          description: "Collaborative rooms with whiteboards.",
          badges: [{ label: "Workshops" }],
          price: "₹899",
          pricePrefix: "From",
          priceSuffix: "/hour",
          ctaText: "Check Availability",
        },
      ],
    },
    planComparison: {
      title: "Need Little Extra",
      columns: 2,
      cards: [
        {
          eyebrow: "PREMIUM PLAN",
          title: "Startups Wanting More",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "2 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "2 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          ctaText: "Know More",
        },
        {
          eyebrow: "ELITE PLAN",
          title: "Accelerating Businesses",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "5 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "10 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          sponsorBadge: {
            text: "Endpoint Protection by",
            logo: "/images/trend.svg",
            logoAlt: "Trend Micro",
          },
          ctaText: "Know More",
        },
      ],
    },
    proximity: {
      mapImage: {
        src: "/images/location.png",
        alt: "Map showing Koramangala proximity",
      },
      title: "Convenient Access Near Key Destinations",
      items: [
        {
          icon: "airport",
          label: "Kempegowda International Airport Bengaluru",
          distance: "23 KM",
        },
        {
          icon: "metro",
          label: "Rashtriya Vidyalaya Road Subway Station",
          distance: "0.5 KM",
        },
        { icon: "bus", label: "Banashankari Bus Stand", distance: "0.5 KM" },
        { icon: "hotel", label: "The Marriott", distance: "1.5 KM" },
        {
          icon: "building",
          label: "The Chancery Pavilion",
          distance: "2.5 KM",
        },
        { icon: "city", label: "Bengaluru City Center", distance: "12.5 KM" },
      ],
    },
  },
  {
    slug: "kanakapura-rd",
    title: "ClayWorks Kanakapura Rd",
    subtitle: "Kanakapura Road, Bengaluru",
    description:
      "Easy drive-time access with green design and spacious breakout zones for growing teams.",
    operatingHours: "Mon–Sat • 8 AM – 10 PM",
    rating: { rating: 4.5, reviewCount: 65 },
    mainImage: {
      src: "/images/servicecard1.jpg",
      alt: "ClayWorks Kanakapura Rd",
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "Kanakapura Rd" },
    ],
    pricing: {
      eyebrow: "EXPLORE PLANS",
      title: "Choose Your Perfect Workspace",
      cards: [
        {
          imageSrc: "/images/business.png",
          imageAlt: "Day Pass",
          title: "Day Pass",
          description: "Green, quiet day pass experience.",
          badges: [{ label: "Freelancers" }],
          price: "₹699",
          pricePrefix: "From",
          priceSuffix: "/day",
          ctaText: "Check Availability",
        },
        {
          imageSrc: "/images/locate.png",
          imageAlt: "Private Office",
          title: "Private Office",
          description: "Spacious offices with breakout zones.",
          badges: [{ label: "Growing teams" }],
          price: "₹7999",
          pricePrefix: "From",
          priceSuffix: "/month",
          ctaText: "Schedule Call",
        },
        {
          imageSrc: "/images/gst.png",
          imageAlt: "Meeting Rooms",
          title: "Meeting Rooms",
          description: "Quiet rooms for deep work meetings.",
          badges: [{ label: "Strategy sprints" }],
          price: "₹599",
          pricePrefix: "From",
          priceSuffix: "/hour",
          ctaText: "Check Availability",
        },
      ],
    },
    planComparison: {
      title: "Need Little Extra",
      columns: 2,
      cards: [
        {
          eyebrow: "PREMIUM PLAN",
          title: "Startups Wanting More",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "2 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "2 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          ctaText: "Know More",
        },
        {
          eyebrow: "ELITE PLAN",
          title: "Accelerating Businesses",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "5 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "10 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          sponsorBadge: {
            text: "Endpoint Protection by",
            logo: "/images/trend.svg",
            logoAlt: "Trend Micro",
          },
          ctaText: "Know More",
        },
      ],
    },
    proximity: {
      mapImage: {
        src: "/images/location.png",
        alt: "Map showing Kanakapura Rd proximity",
      },
      title: "Convenient Access Near Key Destinations",
      items: [
        {
          icon: "airport",
          label: "Kempegowda International Airport Bengaluru",
          distance: "23 KM",
        },
        {
          icon: "metro",
          label: "Rashtriya Vidyalaya Road Subway Station",
          distance: "0.5 KM",
        },
        { icon: "bus", label: "Banashankari Bus Stand", distance: "0.5 KM" },
        { icon: "hotel", label: "The Marriott", distance: "1.5 KM" },
        {
          icon: "building",
          label: "The Chancery Pavilion",
          distance: "2.5 KM",
        },
        { icon: "city", label: "Bengaluru City Center", distance: "12.5 KM" },
      ],
    },
  },
  {
    slug: "whitefield",
    title: "ClayWorks Whitefield",
    subtitle: "ITPL Main Rd, Whitefield",
    description:
      "A tech-forward hub with meeting rooms, privacy pods, and enterprise-ready IT on demand.",
    operatingHours: "Open 24/7",
    rating: { rating: 4.8, reviewCount: 189 },
    mainImage: { src: "/images/workspace1.jpg", alt: "ClayWorks Whitefield" },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Locations", href: "/locations" },
      { label: "Whitefield" },
    ],
    pricing: {
      eyebrow: "EXPLORE PLANS",
      title: "Choose Your Perfect Workspace",
      cards: [
        {
          imageSrc: "/images/business.png",
          imageAlt: "Day Pass",
          title: "Day Pass",
          description: "Tech-hub desks with enterprise-grade Wi‑Fi.",
          badges: [{ label: "Remote teams" }],
          price: "₹899",
          pricePrefix: "From",
          priceSuffix: "/day",
          ctaText: "Check Availability",
        },
        {
          imageSrc: "/images/locate.png",
          imageAlt: "Private Office",
          title: "Private Office",
          description: "Enterprise-ready private offices near ITPL.",
          badges: [{ label: "Scale-ups" }],
          price: "₹11499",
          pricePrefix: "From",
          priceSuffix: "/month",
          ctaText: "Schedule Call",
          featured: true,
        },
        {
          imageSrc: "/images/gst.png",
          imageAlt: "Meeting Rooms",
          title: "Meeting Rooms",
          description: "AV-enabled rooms for client demos.",
          badges: [{ label: "Sales demos" }],
          price: "₹999",
          pricePrefix: "From",
          priceSuffix: "/hour",
          ctaText: "Check Availability",
        },
      ],
    },
    planComparison: {
      title: "Need Little Extra",
      columns: 2,
      cards: [
        {
          eyebrow: "PREMIUM PLAN",
          title: "Startups Wanting More",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "2 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "2 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          ctaText: "Know More",
        },
        {
          eyebrow: "ELITE PLAN",
          title: "Accelerating Businesses",
          features: [
            {
              icon: "building",
              title: "Business Address, GST & Company Registration",
            },
            {
              icon: "user",
              title: "5 days/week",
              subtitle: "workspace at any location",
            },
            {
              icon: "meeting",
              title: "10 hrs/week",
              subtitle: "meeting room at any location",
            },
          ],
          sponsorBadge: {
            text: "Endpoint Protection by",
            logo: "/images/trend.svg",
            logoAlt: "Trend Micro",
          },
          ctaText: "Know More",
        },
      ],
    },
    proximity: {
      mapImage: {
        src: "/images/location.png",
        alt: "Map showing Whitefield proximity",
      },
      title: "Convenient Access Near Key Destinations",
      items: [
        {
          icon: "airport",
          label: "Kempegowda International Airport Bengaluru",
          distance: "23 KM",
        },
        {
          icon: "metro",
          label: "Rashtriya Vidyalaya Road Subway Station",
          distance: "0.5 KM",
        },
        { icon: "bus", label: "Banashankari Bus Stand", distance: "0.5 KM" },
        { icon: "hotel", label: "The Marriott", distance: "1.5 KM" },
        {
          icon: "building",
          label: "The Chancery Pavilion",
          distance: "2.5 KM",
        },
        { icon: "city", label: "Bengaluru City Center", distance: "12.5 KM" },
      ],
    },
  },
];
