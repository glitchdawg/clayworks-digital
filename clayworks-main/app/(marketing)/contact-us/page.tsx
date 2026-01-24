import type { Metadata } from "next";
import { draftMode } from "next/headers";

import Breadcrumb from "@/app/components/ui/breadcrumb";
import { contactCaseStudiesData as defaultCaseStudiesData } from "@/db/data";
import { getCaseStudies } from "@/app/lib/strapi";
import CaseStudies from "../../components/features/services/CaseStudies";
import { ContactUs } from "../../components/features/services/ContactUs";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ClayWorks. We're here to help you find the perfect workspace solution for your business needs.",
  openGraph: {
    title: "Contact Us - ClayWorks",
    description:
      "Reach out to our team for workspace solutions, inquiries, or to schedule a tour of our facilities.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"
      }/contact-us`,
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/clayworkspace.jpg",
        width: 1200,
        height: 630,
        alt: "Contact ClayWorks",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - ClayWorks",
    description:
      "Reach out to our team for workspace solutions, inquiries, or to schedule a tour of our facilities.",
    images: ["/images/clayworkspace.jpg"],
  },
};

const ContactUsPage = async () => {
  // Check for preview mode
  const { isEnabled } = await draftMode();
  const preview = isEnabled;

  // Fetch case studies from Strapi
  const caseStudiesFromStrapi = await getCaseStudies({ limit: 3, preview });

  // Map Strapi CaseStudies with fallback to static contact data
  const caseStudiesData = caseStudiesFromStrapi.length > 0
    ? caseStudiesFromStrapi.map(cs => ({
      id: String(cs.id),
      companyName: cs.companyName,
      description: cs.description,
      linkText: cs.linkText || "Read This Case Study",
      linkUrl: `/case-studies/${cs.slug}`,
    }))
    : defaultCaseStudiesData;

  return (
    <div className="bg-white">
      <div className="pt-24 md:!pt-24 lg:!pt-28">
        <div className="container mx-auto">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
          />
        </div>
      </div>

      <ContactUs />
      <CaseStudies caseStudies={caseStudiesData} />
    </div>
  );
};

export default ContactUsPage;
