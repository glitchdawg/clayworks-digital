import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { jobListings as defaultJobListings } from "@/db/data";
import { CareersListings } from "../../components/features/careers/CareersListings";
import CareersBanner from "../../components/layout/PageHero/InternalBanner";
import Breadcrumb from "../../components/ui/breadcrumb";
import { getJobListings } from "@/app/lib/strapi";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join us to redefine how India works. Shape productive, collaborative workspaces that help teams and individuals thrive.",
  openGraph: {
    title: "Careers - ClayWorks",
    description:
      "Join our team to redefine Indian workspaces through design, sustainability, and hospitality.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"}/careers`,
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/careers.png",
        width: 1200,
        height: 630,
        alt: "Careers at ClayWorks",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers - ClayWorks",
    description:
      "Join our team to redefine Indian workspaces through design, sustainability, and hospitality.",
    images: ["/images/careers.png"],
  },
};

const CareersPage = async () => {
  // Check for preview mode
  const { isEnabled } = await draftMode();
  const preview = isEnabled;

  // Fetch job listings from Strapi
  const strapiJobs = await getJobListings({ active: true, preview });

  // Map Strapi data to CareersListings format, with fallback to static data
  const jobListings = strapiJobs.length > 0
    ? strapiJobs.map(job => ({
      id: String(job.id),
      title: job.title,
      department: job.department,
      location: job.location,
      locationType: job.locationType,
      description: job.description,
      link: `/careers/${job.slug}`,
      category: job.category || job.department,
      type: job.type,
    }))
    : defaultJobListings;

  // Extract unique values for filters from Strapi data
  const categories = strapiJobs.length > 0
    ? [...new Set(strapiJobs.map(j => j.department))]
    : ["Operations", "Marketing", "Engineering", "Design", "Sales", "Finance"];

  const types = strapiJobs.length > 0
    ? [...new Set(strapiJobs.map(j => j.type))]
    : ["Full-time", "Part-time", "Contract", "Internship"];

  const locations = strapiJobs.length > 0
    ? [...new Set(strapiJobs.map(j => j.location))]
    : ["Bengaluru", "Hyderabad", "Mumbai", "Delhi", "Pune", "Gurgaon", "Chennai"];

  return (
    <div className="bg-white">
      <div className="pt-24 md:!pt-24 lg:!pt-28">
        <div className="container mx-auto">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Careers" }]}
          />
        </div>
        <CareersBanner
          mainImage={{
            src: "/images/careers.png",
            alt: "Careers at ClayWorks",
          }}
          layout="image-right"
          title="Join Us to Redefine How India Works"
          description="Each day, we shape productive, collaborative workspaces that help teams and individuals thrive. If you're passionate about inspiring change, growing with purpose, and making meaningful impact."
        />
      </div>

      <CareersListings
        eyebrow="JOIN US"
        title="Let's Craft the Future Together"
        jobs={jobListings}
        categories={categories}
        types={types}
        locations={locations}
        className="py-10 md:!py-12 lg:!py-16"
      />
    </div>
  );
};

export default CareersPage;
