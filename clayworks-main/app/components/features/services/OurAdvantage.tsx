import Image from "next/image";
import { Icon } from "@iconify/react";

interface AdvantageCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const advantages: AdvantageCard[] = [
  {
    icon: <Icon icon="clarity:design-line" className="w-8 h-8" />,
    title: "Design That Serves Work",
    description:
      "Earthy materials, biophilic interiors, and layouts crafted for focus and flow.",
  },
  {
    icon: <Icon icon="hugeicons:leaf-01" className="w-8 h-8" />,
    title: "Sustainability, Practiced",
    description:
      "Built with reclaimed materials, natural light, and low-footprint operations.",
  },
  {
    icon: (
      <Icon
        icon="material-symbols-light:concierge-outline"
        className="w-8 h-8"
      />
    ),
    title: "People-First Operations",
    description:
      "On-ground teams that offer real-time assistance—no tickets, just people.",
  },
  {
    icon: <Icon icon="solar:scale-outline" className="w-8 h-8" />,
    title: "Built to Scale With You",
    description:
      "Flexible lease terms and adaptable setups to match your evolving needs.",
  },
];

export function OurAdvantage() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="w-full">
        {/* Header */}
        <div className="container mx-auto">
          <div className="text-center md:text-left mb-8 md:mb-12 space-y-2">
            <p className="text-base font-inter-normal text-black uppercase tracking-wider mb-1">
              WHY CLAYWORKS
            </p>
            <h2 className="text-3xl md:!text-3xl lg:!text-4xl font-medium font-inter-medium text-[#2B2B2B]">
              What Makes Our Workspaces Different
            </h2>
            <p className="text-[#333336] max-w-xl font-inter-normal mx-auto md:mx-0">
              We don't believe offices should be generic containers for work. We design environments that reduce friction, support focus, and quietly improve everyday work life.
            </p>
          </div>
        </div>

        {/* Image and Cards Container */}
        <div className="relative w-full">
          {/* Background Image */}
          <div className="w-full h-[300px] md:h-[400px] lg:h-[480px]">
            <Image
              src="/images/jpnagar.jpg"
              alt="Modern office workspace"
              fill
              className="w-full h-full object-cover"
            />
          </div>

          {/* Cards - Desktop Grid (overlapping image) - Only on large screens */}
          <div className="hidden container mx-auto lg:block absolute -bottom-[20%] left-0 right-0 ">
            <div className="grid grid-cols-4 gap-6">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 space-y-4"
                  style={{
                    boxShadow: `
                      0px 4px 9px 0px #0000000D,
                      0px 16px 16px 0px #0000000A,
                      0px 36px 22px 0px #00000008,
                      0px 65px 26px 0px #00000003,
                      0px 101px 28px 0px #00000000
                    `,
                  }}
                >
                  <div className="text-[#333336]" aria-hidden="true">
                    {advantage.icon}
                  </div>
                  <h3 className="text-[#333336] text-lg font-bold font-inter-bold">
                    {advantage.title}
                  </h3>
                  <p className="text-xs font-inter-normal text-[#333336] leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cards - Mobile/Tablet Horizontal Scroll (overlapping image) */}
          <div className="lg:hidden absolute -bottom-[30%] left-0 right-0">
            <div
              className="overflow-x-auto scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="flex gap-4 px-6 pb-4">
                {advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-2xl p-6 flex-shrink-0 w-[220px] space-y-3"
                  >
                    <div className="text-[#333336]" aria-hidden="true">
                      {advantage.icon}
                    </div>
                    <h3 className="text-[#333336] text-lg font-bold font-inter-bold">
                      {advantage.title}
                    </h3>
                    <p className="text-xs font-inter-normal text-[#333336] leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
