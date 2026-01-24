import { Icon } from "@iconify/react";
import Image from "next/image";

const offerings = [
  { icon: "game-icons:office-chair", title: "Ergonomic Seating" },
  { icon: "carbon:wifi", title: "High-speed Wi-Fi" },
  { icon: "cbi:socket-uk", title: "Power outlets everywhere" },
  { icon: "ph:armchair", title: "Breakout zones & lounge areas" },
  { icon: "streamline-flex:tea-cup", title: "Unlimited tea & coffee" },
  { icon: "guidance:meeting-room", title: "Meeting Room Priority" },
  {
    icon: "streamline-plump:customer-support-7",
    title: "On-site support staff",
  },
  {
    icon: "fluent:glance-horizontal-sparkles-24-regular",
    title: "Peaceful, inspiring environment",
  },
];

export function OfferingsSection() {
  return (
    <section className="bg-white md:py-8 py-4 relative overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="mb-8 lg:mb-12 text-center">
          <p className="text-base tracking-wider text-black mb-2">
            OUR OFFERINGS
          </p>
          <h2 className="text-3xl md:!text-3xl lg:!text-3xl font-inter-semibold text-[#2B2B2B]">
            What Waits for You
          </h2>
        </div>

        <div className="relative h-[450px] overflow-hidden mb-8 z-0">
          <Image
            src="/images/clayworkspace.jpg"
            alt="Modern coworking office workspace"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <ul
          className="grid grid-cols-2 gap-4 mb-8 px-6 -mt-20 relative z-10"
          role="list"
        >
          {offerings.slice(0, 4).map((offering, index) => {
            return (
              <li
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                role="listitem"
              >
                <div className="mb-4">
                  <Icon
                    icon={offering.icon}
                    className="w-12 h-12 text-black"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-gray-800">{offering.title}</p>
              </li>
            );
          })}
        </ul>

        <div className="text-center">
          <a
            href="#"
            className="text-[#E07B39] hover:text-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
          >
            View All Offerings
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Desktop Layout - Image top right, content bottom left with overlap */}
        <div className="hidden lg:block relative">
          {/* Image positioned top-right */}
          <div className="absolute top-0 right-0 w-[55%] h-[650px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/clayworkspace.jpg"
              alt="Modern coworking office workspace"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          {/* Content bottom-left (with overlap) */}
          <div className="relative z-10 max-w-[50%]  ">
            {/* Header */}
            <div className="mb-16">
              <p className="text-base font-inter-normal tracking-wider text-black mb-2">
                OUR OFFERINGS
              </p>
              <h2 className="text-3xl md:!text-3xl lg:!text-3xl font-inter-semibold text-[#2B2B2B]">
                What Waits for You
              </h2>
            </div>

            {/* Offerings Grid */}
            <ul className="grid grid-cols-3 gap-6 min-h-[600px]" role="list">
              {offerings.map((offering, index) => {
                return (
                  <li
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 h-[210px] flex flex-col"
                    role="listitem"
                  >
                    <div className="flex justify-start mb-6">
                      <Icon
                        icon={offering.icon}
                        className="w-16 h-16 text-black"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1 flex items-end">
                      <p className="text-black font-inter-normal text-lg text-left">
                        {offering.title}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
