import Link from "next/link";
import { LocationCard } from "./LocationCard";

type OtherLocationItem = {
  title: string;
  address: string;
  travelTime: string;
  distance: string;
  hasPowerBackup?: boolean;
};

interface OtherLocationsSectionProps {
  eyebrow?: string;
  title: string;
  locations: OtherLocationItem[];
  viewAllHref?: string;
}

export function OtherLocationsSection({
  eyebrow = "OTHER LOCATIONS",
  title,
  locations,
  viewAllHref = "/locations",
}: OtherLocationsSectionProps) {
  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 lg:mb-14">
          <p className="text-base lg:!text-base tracking-wider text-black font-inter-medium uppercase mb-2">
            {eyebrow}
          </p>
          <h2 className="text-3xl lg:!text-4xl font-inter-medium text-[#2B2B2B]">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-10">
          {locations.map((loc, index) => (
            <LocationCard
              key={`${loc.title}-${index}`}
              title={loc.title}
              address={loc.address}
              travelTime={loc.travelTime}
              distance={loc.distance}
              hasPowerBackup={loc.hasPowerBackup}
            />
          ))}
        </div>

        {viewAllHref && (
          <div className="flex justify-center">
            <Link
              href={viewAllHref}
              className="inline-flex items-center justify-center rounded-xl border border-[#D1D5DB] text-[#1A2C42] hover:bg-[#F9FAFB] hover:border-[#9CA3AF] transition-all duration-200 py-3 px-6"
            >
              View All Locations
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
