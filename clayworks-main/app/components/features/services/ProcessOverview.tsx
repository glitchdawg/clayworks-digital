// components/ProcessOverview.tsx (Alternative with better centering)
import Image from "next/image";

interface ProcessStep {
  imageSrc: string;
  title: string;
  description: string;
}

interface ProcessOverviewProps {
  eyebrow: string;
  title: string;
  steps: ProcessStep[];
  className?: string;
}

export function ProcessOverview({
  eyebrow,
  title,
  steps,
  className = "",
}: ProcessOverviewProps) {
  // Check if there's exactly 1 card in the last row (e.g., 4, 7, 10 cards)
  const hasSingleCardInLastRow = steps.length > 3 && steps.length % 3 === 1;

  return (
    <section className={`py-8 lg:py-16 bg-white ${className}`}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 lg:mb-16 text-center lg:text-left">
          <p className="text-base lg:text-base font-inter-medium text-black uppercase tracking-wider mb-3">
            {eyebrow}
          </p>
          <h2 className="text-4xl lg:text-5xl font-inter-medium text-[#1A2C42] leading-tight max-w-sm mx-auto lg:mx-0">
            {title}
          </h2>
        </div>

        {/* Process Cards */}
        <div className="container mx-auto !p-0">
          {/* Grid layout: 1 column on mobile, 2 on tablet, 3 on desktop */}
          <ol
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16"
            role="list"
          >
            {steps.map((step, index) => {
              const isLastCard = index === steps.length - 1;
              const shouldCenter = hasSingleCardInLastRow && isLastCard;

              return (
                <li
                  key={index}
                  className={shouldCenter ? "lg:col-start-2" : ""}
                  role="listitem"
                >
                  <ProcessCard
                    imageSrc={step.imageSrc}
                    title={step.title}
                    description={step.description}
                    stepNumber={index + 1}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

// Individual Process Card Component
function ProcessCard({
  imageSrc,
  title,
  description,
  stepNumber,
}: {
  imageSrc: string;
  title: string;
  description: string;
  stepNumber?: number;
}) {
  return (
    <article className="bg-white rounded-2xl shadow-[0px_28.83px_28.83px_0px_#00000026] hover:shadow-[0px_28.83px_28.83px_0px_#00000026] transition-shadow duration-300 p-8 h-full">
      {/* Image */}
      <div className="mb-6 flex justify-center">
        <Image
          src={imageSrc}
          alt={`${title} process step icon`}
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-inter-semibold text-[#121212] mb-2 text-center lg:text-left">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm lg:text-base text-[#1A2C42] font-inter-normal leading-relaxed text-center lg:text-left">
        {description}
      </p>
    </article>
  );
}
