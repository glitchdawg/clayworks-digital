import Image from "next/image";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "primary" | "secondary";
  featured?: boolean;
}

export function ServiceCard({
  image,
  title,
  description,
  features,
  buttonText,
  buttonVariant = "secondary",
  featured = false,
}: ServiceCardProps) {
  return (
    <div
      className={`bg-white overflow-hidden h-full ${
        featured ? "" : "rounded-2xl"
      }`}
      style={
        featured
          ? {}
          : {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }
      }
    >
      {featured ? (
        // Featured card layout - vertical with larger image
        <div className="flex flex-col h-full">
          <div className="relative h-60 lg:h-96 rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={`${title} workspace image`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="pt-4 pr-8 pb-8 flex flex-col flex-grow space-y-4">
            <h3 className="text-text-dark font-inter-bold text-2xl">{title}</h3>
            <p className="text-text-body font-inter-normal text-base">
              {description}
            </p>
            <div className="flex flex-wrap gap-2  items-start">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="px-4 py-1 border border-border-default rounded-full text-xs text-text-dark"
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className="">
              <button
                type="button"
                className={`px-8 py-3 rounded-lg font-inter-medium transition-colors ${
                  buttonVariant === "primary"
                    ? "bg-brand-primary hover:bg-brand-primary text-white"
                    : "bg-white hover:bg-gray-50 text-text-slate border border-text-slate"
                }`}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Regular card layout - vertical
        <div className="flex flex-col h-full">
          <div className="relative h-48 md:h-56 flex-shrink-0 overflow-hidden">
            <Image
              src={image}
              alt={`${title} workspace image`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4 md:p-6 flex flex-col flex-grow space-y-3">
            <h3 className="text-text-dark font-inter-bold text-lg lg:text-2xl">
              {title}
            </h3>
            <p className="text-text-body font-inter-normal text-sm md:text-base flex-grow">
              {description}
            </p>
            <div className="flex flex-wrap gap-1.5 items-start">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 border border-border-default rounded-full text-xs text-text-dark"
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="w-56 px-4 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-text-slate border border-text-slate transition-colors text-sm"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
