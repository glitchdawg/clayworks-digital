import { Icon } from "@iconify/react";
import type { JobListing } from "../app/components/features/careers/CareersListings";

export const processSteps = [
  {
    imageSrc: "/images/icons/location.png",
    title: "Select",
    description:
      "We pre-screen hundreds of properties against 20+ criteria so you only choose from the best.",
  },
  {
    imageSrc: "/images/icons/designer.png",
    title: "Design & Build",
    description:
      "Our architects and interior experts co-create a bespoke workspace, marrying functionality with your brand DNA.",
  },
  {
    imageSrc: "/images/icons/chair.png",
    title: "Operate",
    description:
      "We manage facilities, IT, and hospitality-grade services so you never have to worry about the details.",
  },
];

export const processPrivateOffice = [
  {
    imageSrc: "/images/icons/needs.png",
    title: "Share Your Needs",
    description:
      "We pre-screen hundreds of properties against 20+ criteria so you only choose from the best.",
  },
  {
    imageSrc: "/images/icons/design.png",
    title: "We Design",
    description:
      "Our architects and interior experts co-create a bespoke workspace, marrying functionality with your brand DNA.",
  },
  {
    imageSrc: "/images/icons/tools.png",
    title: "We Set it Up",
    description:
      "We manage facilities, IT, and hospitality-grade services so you never have to worry about the details.",
  },
  {
    imageSrc: "/images/icons/chair.png",
    title: "Your Focus, We Manage",
    description:
      "Tell us about your team size, preferred location, must-have amenities, and any specific layout needs.",
  },
];

export const offerCards = [
  {
    title: "Handpicked Locations",
    description:
      "We shortlist sites based on 20+ business-critical factors—access, zoning, safety, transport, and more—so you don't waste time evaluating options.",
  },
  {
    title: "Fully Managed, End-to-End",
    description:
      "Everything's taken care of—leases, operations, compliance, IT, reception, and pantry—so your teams can focus on outcomes, not upkeep.",
  },
  {
    title: "Built for Talent",
    description:
      "We create spaces where people want to show up. That means better productivity, lower attrition, and stronger team engagement.",
  },
  {
    title: "Hybrid-Ready by Default",
    description:
      "WaaE™ workspaces are designed for today's reality—supporting remote, in-office, and near-home work without friction.",
  },
  {
    title: "Mood by Design",
    description:
      "Your workspace reflects your brand. From layout to materials, we co-design the space to align with your values, workflow, and identity.",
  },
];

export const faqCategories = [
  {
    id: "general",
    label: "General Info",
    faqs: [
      {
        question:
          'What does "Built-to-Suit" mean in the context of office spaces?',
        answer:
          "Built-to-Suit refers to a custom office space solution where we design and construct a workspace specifically tailored to your business needs, brand identity, and operational requirements. Unlike traditional leasing, every aspect is customized to fit your exact specifications.",
      },
      {
        question:
          "How is a Built-to-Suit office different from a managed or coworking space?",
        answer:
          "While coworking spaces offer shared amenities and managed offices provide ready-made solutions, Built-to-Suit offices are completely customized to your specifications. You get full control over design, layout, branding, and functionality, creating a unique workspace that reflects your company culture.",
      },
      {
        question:
          "What is the typical timeline to deliver a Built-to-Suit office?",
        answer:
          "The timeline varies based on project scope and customization level, but typically ranges from 3-6 months. This includes site selection, design approval, construction, and final setup. We work closely with you throughout the process to ensure timely delivery.",
      },
      {
        question: "Can we choose the location for our Built-to-Suit office?",
        answer:
          "Absolutely! We help you identify and evaluate potential locations based on your criteria such as accessibility, proximity to talent, business districts, and budget. Our team provides detailed analysis of each option to help you make an informed decision.",
      },
      {
        question: "What level of customization is possible?",
        answer:
          "Complete customization is possible - from layout and interior design to furniture, technology infrastructure, and branding elements. You can customize everything including meeting rooms, breakout spaces, pantries, lighting, acoustics, and even sustainability features.",
      },
      {
        question: "Are sustainability and wellness features included?",
        answer:
          "Yes! We incorporate sustainable and wellness-focused features such as energy-efficient systems, natural lighting, air quality monitoring, ergonomic furniture, biophilic design elements, and green building certifications upon request.",
      },
    ],
  },
  {
    id: "sourcing",
    label: "Sourcing",
    faqs: [
      {
        question: "How do you source locations for Built-to-Suit offices?",
        answer:
          "We use a rigorous selection process evaluating 20+ criteria including location accessibility, infrastructure, compliance, growth potential, and cost-effectiveness. Our network of property partners ensures you get the best options available.",
      },
      {
        question:
          "Can we provide our own property for Built-to-Suit development?",
        answer:
          "Yes, if you already have a property in mind, we can assess its suitability and develop it according to your specifications. Our team will conduct due diligence and provide recommendations for optimization.",
      },
    ],
  },
  {
    id: "policies",
    label: "Policies",
    faqs: [
      {
        question: "What are the lease terms for Built-to-Suit offices?",
        answer:
          "Lease terms are flexible and tailored to your business needs. We offer various options from medium-term to long-term commitments, with scalability provisions built in to accommodate your growth.",
      },
      {
        question: "What happens if we need to scale up or down?",
        answer:
          "Our agreements include flexibility clauses that allow for expansion or contraction. We can reconfigure spaces, add modular units, or adjust your footprint as your team grows or changes.",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    faqs: [
      {
        question: "How is pricing structured for Built-to-Suit offices?",
        answer:
          "Pricing is transparent and customized based on your requirements including location, size, customization level, and lease duration. We provide detailed breakdowns covering construction, design, amenities, and ongoing operational costs.",
      },
      {
        question: "Are there any hidden costs?",
        answer:
          "No hidden costs. We provide complete transparency with all-inclusive pricing covering design, construction, furniture, technology setup, and facilities management. Any additional services are clearly outlined upfront.",
      },
    ],
  },
];

export const caseStudiesData = [
  {
    id: "techco-innovations",
    companyName: "TechCo Innovations",
    description:
      "Scaled from 10 to 200 seats in six months with a tailored office floor that mirrors its agile culture.",
    linkText: "Read This Case Study",
  },
  {
    id: "global-finance-group",
    companyName: "Global Finance Group",
    description:
      "Moved into a flagship fintech hub designed for collaboration and compliance at 99% occupancy.",
    linkText: "Read This Case Study",
  },
  {
    id: "design-house-collective",
    companyName: "Design House Collective",
    description:
      'Created an artisanal "studio within a studio" that doubled creative output and cuts real-estate costs by 20%.',
    linkText: "Read This Case Study",
  },
];

export const blogPostsData = [
  {
    image: "/images/workspace.jpg",
    title: "Why your workday deserves better than a café table",
    description:
      "Tired of noisy backgrounds and unstable Wi-Fi? Discover how a Day Pass at ClayWorks",
    author: "John Doe",
    date: "Aug 23, 2025",
  },
  {
    image: "/images/meeting.jpg",
    title: "The hidden power of premium meeting rooms",
    description:
      "A great meeting starts with the right room. Learn why businesses are rethinking their client interactions",
    author: "John Doe",
    date: "Aug 23, 2025",
  },
  {
    image: "/images/workspace1.jpg",
    title: "Work anywhere, but you have to work well",
    description:
      "Flexibility is more than location—it's experience. See how ClayWorks blends hospitality",
    author: "John Doe",
    date: "Aug 23, 2025",
  },
  {
    image: "/images/workspace2.jpg",
    title: "Virtual Office, Real Impact",
    description:
      "Need a professional presence without a long lease? A ClayWorks Virtual Office comes with a prime address and",
    author: "John Doe",
    date: "Aug 23, 2025",
  },
  {
    image: "/images/clayworkspace.jpg",
    title: "Why your workday deserves better than a café table",
    description:
      "Tired of noisy backgrounds and unstable Wi-Fi? Discover how a Day Pass at ClayWorks",
    author: "John Doe",
    date: "Aug 23, 2025",
  },
  {
    image: "/images/modern.png",
    title: "Why your workday deserves better than a café table",
    description:
      "Tired of noisy backgrounds and unstable Wi-Fi? Discover how a Day Pass at ClayWorks",
    author: "John Doe",
    date: "Aug 23, 2025",
  },
  {
    image: "/images/workspace.jpg",
    title: "Why your workday deserves better than a café table",
    description:
      "Tired of noisy backgrounds and unstable Wi-Fi? Discover how a Day Pass at ClayWorks",
    author: "John Doe",
    date: "Aug 23, 2025",
  },
];

export const reasonsData = [
  {
    title: "Flexible Contracts",
    content:
      "Scale your workspace month to month without being tied down by long leases.",
  },
  {
    title: "All-Inclusive Pricing",
    content:
      "No hidden costs — utilities, maintenance, and cleaning are all included.",
  },
  {
    title: "Premium Support",
    content:
      "Enjoy 24/7 building access and dedicated community support teams.",
  },
];

export const locationCards = [
  {
    title: "ClayWorks JP Nagar",
    address: "RBI Layout, 3rd Phase, J. P. Nagar",
    travelTime: "35 min",
    distance: "0.3 km",
    hasPowerBackup: true,
  },
  {
    title: "ClayWorks Indiranagar",
    address: "100 Feet Road, Indiranagar",
    travelTime: "25 min",
    distance: "5.2 km",
    hasPowerBackup: true,
  },
  {
    title: "ClayWorks Koramangala",
    address: "80 Feet Road, Koramangala",
    travelTime: "30 min",
    distance: "3.8 km",
    hasPowerBackup: true,
  },
  {
    title: "ClayWorks Whitefield",
    address: "ITPL Main Road, Whitefield",
    travelTime: "45 min",
    distance: "12.5 km",
    hasPowerBackup: true,
  },
];

export const elitePlanFeatures = [
  {
    imageSrc: "/images/icons/businesslocation.png",
    imageAlt: "Business Location",
    title: "Business Address, GST & Company Registration",
  },
  {
    imageSrc: "/images/icons/userbadge.png",
    imageAlt: "User Badge",
    title: "5 days/week",
    subtitle: "workspace at any location",
  },
  {
    imageSrc: "/images/icons/meetingroom.png",
    imageAlt: "Meeting Room",
    title: "10 hrs/week",
    subtitle: "meeting room at any location",
  },
];

export const spaces = [
  {
    id: "1",
    image: "/images/clayworkspace.jpg",
    title: "ClayWorks Indiranagar",
    location: "Campbell Rd, Austin Town",
    features: [
      {
        icon: <Icon icon="game-icons:office-chair" className="w-4 h-4" />,
        text: "150 Seats",
      },
      {
        icon: <Icon icon="mynaui:train" className="w-4 h-4" />,
        text: "Metro 0.3 km",
      },
      {
        icon: <Icon icon="subway:power" className="w-4 h-4" />,
        text: "Power Backup",
      },
    ],
    tags: [{ label: "Breakout Zones" }, { label: "Green Certified Building" }],
    moreTagsCount: 6,
  },
  {
    id: "2",
    image: "/images/clayworkspace.jpg",
    title: "ClayWorks Indiranagar",
    location: "Campbell Rd, Austin Town",
    features: [
      {
        icon: <Icon icon="game-icons:office-chair" className="w-4 h-4" />,
        text: "150 Seats",
      },
      {
        icon: <Icon icon="mynaui:train" className="w-4 h-4" />,
        text: "Metro 0.3 km",
      },
      {
        icon: <Icon icon="subway:power" className="w-4 h-4" />,
        text: "Power Backup",
      },
    ],
    tags: [{ label: "Breakout Zones" }, { label: "Green Certified Building" }],
    moreTagsCount: 6,
  },
  {
    id: "3",
    image: "/images/clayworkspace.jpg",
    title: "ClayWorks Indiranagar",
    location: "Campbell Rd, Austin Town",
    features: [
      {
        icon: <Icon icon="game-icons:office-chair" className="w-4 h-4" />,
        text: "150 Seats",
      },
      {
        icon: <Icon icon="mynaui:train" className="w-4 h-4" />,
        text: "Metro 0.3 km",
      },
      {
        icon: <Icon icon="subway:power" className="w-4 h-4" />,
        text: "Power Backup",
      },
    ],
    tags: [{ label: "Breakout Zones" }, { label: "Green Certified Building" }],
    moreTagsCount: 6,
  },
  {
    id: "4",
    image: "/images/clayworkspace.jpg",
    title: "ClayWorks HSR Layout",
    location: "Sector 1, HSR Layout",
    features: [
      {
        icon: <Icon icon="game-icons:office-chair" className="w-4 h-4" />,
        text: "200 Seats",
      },
      {
        icon: <Icon icon="mynaui:train" className="w-4 h-4" />,
        text: "Metro 0.5 km",
      },
      {
        icon: <Icon icon="subway:power" className="w-4 h-4" />,
        text: "Power Backup",
      },
    ],
    tags: [{ label: "Breakout Zones" }, { label: "Green Certified Building" }],
    moreTagsCount: 8,
  },
  {
    id: "5",
    image: "/images/clayworkspace.jpg",
    title: "ClayWorks Koramangala",
    location: "5th Block, Koramangala",
    features: [
      {
        icon: <Icon icon="game-icons:office-chair" className="w-4 h-4" />,
        text: "180 Seats",
      },
      {
        icon: <Icon icon="mynaui:train" className="w-4 h-4" />,
        text: "Metro 0.4 km",
      },
      {
        icon: <Icon icon="subway:power" className="w-4 h-4" />,
        text: "Power Backup",
      },
    ],
    tags: [{ label: "Breakout Zones" }, { label: "Green Certified Building" }],
    moreTagsCount: 7,
  },
];

export const principleCards = [
  {
    imageSrc: "/images/icons/stone.png",
    title: "Bespoke and Tailored, Design-Led Spaces",
    description:
      "Every workspace is thoughtfully crafted to reflect your unique work culture while inspiring creativity and driving productivity.",
  },
  {
    imageSrc: "/images/icons/heart.png",
    title: "Hospitality-Grade Service and Community",
    description:
      "Enjoy five-star hospitality, top-tier amenities, and a collaborative, welcoming environment that supports productivity and growth",
  },
  {
    imageSrc: "/images/icons/ecofriendly.png",
    title: "Sustainability and Well-being at the Core",
    description:
      "Natural light, green spaces, and eco-friendly design prioritise team wellness while reducing environmental impact",
  },
];

export const impactStats = [
  {
    imageSrc: "/images/icons/chair.png",
    value: "1500+",
    label: "Seats up and Running",
  },
  {
    imageSrc: "/images/icons/trust.png",
    value: "300+",
    label: "Trusted Brands",
  },
  {
    imageSrc: "/images/icons/location.png",
    value: "11",
    label: "Prime Locations",
  },
  {
    imageSrc: "/images/icons/arcticon.png",
    value: "5000+",
    label: "Seats Being Crafted",
  },
  {
    imageSrc: "/images/icons/trophy.png",
    value: "IGBC Gold LEED Building",
    label: "Sustainability Certified",
  },
];

export const leaders = [
  {
    name: "Rahul Singh",
    title: "Co-Founder",
    bio: "Rahul brings over two decades of experience in real estate and financial services. After completing his B.Tech from IIT Roorkee, he held senior positions at Infosys, Knight Frank India, and Essel Finance before co-founding ClayWorks. His expertise in capital markets and strategic planning has been instrumental in scaling ClayWorks from a startup to Bangalore's leading workspace provider.",
    image: "/images/rahul.png",
  },
  {
    name: "Abhijit Shashhar",
    title: "Co-Founder",
    bio: "Abhijit's background in office and asset management at Knight Frank, combined with his passion for sustainable design, drives ClayWorks' unique approach to workspace creation. He leads the company's design strategy and operational excellence initiatives, ensuring every ClayWorks center delivers an unparalleled experience.",
    image: "/images/abhijit.png",
  },
];

export const contactCaseStudiesData = [
  {
    id: "hq-location",
    companyName: "HQ Location",
    description:
      "3rd Floor, Site No. 74, Mass Complex, 15th Cross Road Sarakki Industrial Area, 3rd Phase, J. P. Nagar, Bengaluru, Karnataka 560078",
    linkText: "Open Map",
    linkUrl:
      "https://www.google.com/maps/search/?api=1&query=3rd%20Floor%2C%20Site%20No.%2074%2C%20Mass%20Complex%2C%2015th%20Cross%20Road%20Sarakki%20Industrial%20Area%2C%203rd%20Phase%2C%20J.%20P.%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560078",
  },
  {
    id: "media-queries",
    companyName: "Media Queries",
    description:
      "Write to us at media@clayworks.in or reach us at 080-47111888",
    linkText: "media@clayworks.in",
    linkUrl: "mailto:media@clayworks.in",
  },
  {
    id: "careers-at-clayworks",
    companyName: "Careers at ClayWorks",
    description:
      "Interested in redefining Indian workspaces through design, sustainability, and hospitality?",
    linkText: "View Opportunities",
  },
];

export const jobListings: JobListing[] = [
  {
    id: "1",
    title: "Community Manager",
    department: "Operations",
    location: "Bengaluru",
    locationType: "on-site",
    description:
      "Manage community initiatives, events, and member relations to create a vibrant co-working environment.",
    link: "/careers/community-manager",
    category: "Operations",
    type: "Full-time",
  },
  {
    id: "2",
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Bengaluru",
    locationType: "on-site",
    description:
      "Develop and execute digital marketing campaigns across various channels to drive leads and brand awareness.",
    link: "/careers/digital-marketing-specialist",
    category: "Marketing",
    type: "Full-time",
  },
  {
    id: "3",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Hyderabad",
    locationType: "hybrid",
    description:
      "Build scalable applications and lead technical initiatives in a fast-paced startup environment.",
    link: "/careers/senior-software-engineer",
    category: "Engineering",
    type: "Full-time",
  },
  {
    id: "4",
    title: "UX Designer",
    department: "Design",
    location: "Mumbai",
    locationType: "remote",
    description:
      "Create intuitive user experiences and beautiful interfaces for our workspace management platform.",
    link: "/careers/ux-designer",
    category: "Design",
    type: "Full-time",
  },
  {
    id: "5",
    title: "Business Development Manager",
    department: "Sales",
    location: "Delhi",
    locationType: "hybrid",
    description:
      "Identify and pursue new business opportunities to expand our customer base and market presence.",
    link: "/careers/business-development-manager",
    category: "Sales",
    type: "Full-time",
  },
  {
    id: "6",
    title: "Content Marketing Intern",
    department: "Marketing",
    location: "Bengaluru",
    locationType: "on-site",
    description:
      "Assist with content creation, social media management, and marketing campaigns in a dynamic team.",
    link: "/careers/content-marketing-intern",
    category: "Marketing",
    type: "Internship",
  },
  {
    id: "7",
    title: "Workspace Coordinator",
    department: "Operations",
    location: "Pune",
    locationType: "on-site",
    description:
      "Ensure smooth operations and excellent member experience at our premier co-working spaces.",
    link: "/careers/workspace-coordinator",
    category: "Operations",
    type: "Full-time",
  },
  {
    id: "8",
    title: "Financial Analyst",
    department: "Finance",
    location: "Gurgaon",
    locationType: "hybrid",
    description:
      "Analyze financial data, prepare reports, and support strategic decision-making processes.",
    link: "/careers/financial-analyst",
    category: "Finance",
    type: "Full-time",
  },
  {
    id: "9",
    title: "Customer Success Manager",
    department: "Operations",
    location: "Chennai",
    locationType: "remote",
    description:
      "Build strong relationships with clients and ensure their success with our products and services.",
    link: "/careers/customer-success-manager",
    category: "Operations",
    type: "Full-time",
  },
];
