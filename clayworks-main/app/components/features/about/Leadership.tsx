// components/LeadershipSection.tsx
import Image from "next/image";

interface Leader {
  name: string;
  title: string;
  bio: string;
  image: string;
}

interface LeadershipSectionProps {
  eyebrow: string;
  title: string;
  leaders: Leader[];
  className?: string;
}

export function LeadershipSection({
  eyebrow,
  title,
  leaders,
  className = "",
}: LeadershipSectionProps) {
  return (
    <section className={`py-8 lg:!py-12 bg-white ${className}`}>
      <div className="container mx-auto ">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-base lg:!text-base font-inter-medium text-black uppercase tracking-wider mb-2">
            {eyebrow}
          </p>
          <h2 className="text-3xl lg:!text-4xl max-w-2xl mx-auto font-inter-medium text-[#1A2C42] leading-tight">
            {title}
          </h2>
        </div>

        {/* Leaders Grid */}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {leaders.map((leader) => (
            <li key={leader.name} className="h-full">
              <LeaderCard
                name={leader.name}
                title={leader.title}
                bio={leader.bio}
                image={leader.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Individual Leader Card Component
interface LeaderCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
}

function LeaderCard({ name, title, bio, image }: LeaderCardProps) {
  return (
    <article
      className="h-full bg-white rounded-2xl transition-shadow duration-300 p-8 lg:p-10 flex flex-col"
      style={{
        boxShadow:
          "0px 5px 11px 0px #0000000D, 0px 20px 20px 0px #0000000A, 0px 45px 27px 0px #00000008, 0px 79px 32px 0px #00000003, 0px 124px 35px 0px #00000000",
      }}
    >
      {/* Image + Name/Title Row */}
      <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
        <div className="relative w-28 h-28 lg:!w-20 lg:!h-20 rounded-full overflow-hidden flex-shrink-0 lg:mb-0 mb-2">
          <Image
            src={image}
            alt={`${name}, ${title}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center lg:text-left">
          <h3 className="mb-1">
            <span className="font-inter-bold text-xl lg:!text-xl text-black">
              {name}
            </span>
            <span className="font-inter-normal lg:!text-base text-base text-black">
              , {title}
            </span>
          </h3>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm lg:text-base text-[#696969] font-inter-normal leading-relaxed">
        {bio}
      </p>
    </article>
  );
}
