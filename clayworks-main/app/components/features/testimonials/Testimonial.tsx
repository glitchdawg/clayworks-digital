"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { testimonials as defaultTestimonials } from "@/db/testimonial";
import { Testimonial as StrapiTestimonial, getStrapiImageUrl } from "@/app/lib/strapi";

interface TestimonialsSectionProps {
  testimonials?: StrapiTestimonial[];
}

const TestimonialsSection = ({ testimonials: strapiTestimonials = [] }: TestimonialsSectionProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Normalize data: map Strapi data to the shape component expects (avatar as string url)
  // If no Strapi data, fall back to defaultTestimonials
  const activeTestimonials = strapiTestimonials.length > 0
    ? strapiTestimonials.map(t => ({
      ...t,
      id: String(t.id),
      avatar: getStrapiImageUrl(t.avatar),
    }))
    : defaultTestimonials;

  // Auto slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % activeTestimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [activeTestimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const handleReadAllStories = () => {
    // TODO: Implement navigation to testimonials page or modal

  };

  // Static images for the gallery - using all 12 images from testimonial folder
  const staticImages = [
    "/images/testimonial/person1.png",
    "/images/testimonial/person2.png",
    "/images/testimonial/person3.png",
    "/images/testimonial/person4.png",
    "/images/testimonial/person5.jpg",
    "/images/testimonial/person6.png",
    "/images/testimonial/person7.jpg",
    "/images/testimonial/person8.png",
    "/images/testimonial/person9.jpg",
    "/images/testimonial/person10.jpg",
    "/images/testimonial/person11.png",
    "/images/testimonial/person12.png",
    "/images/testimonial/person13.png",
  ];

  return (
    <section className="w-full py-[30px] sm:py-[40px] lg:py-[40px] xl:py-[50px] px-4 sm:px-6 lg:px-8 xl:px-[30px]">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Image Gallery */}
        <div className="relative w-full">
          <div className="flex justify-center">
            {/* Left Image Stack - Hidden on mobile and tablet */}
            <div className="hidden xl:block w-[32%] relative h-[528px]">
              <div className="flex gap-[18px] h-full">
                <div className="flex flex-col gap-[18px] w-[32%] mt-[94px]">
                  <div className="relative w-full h-[206px] rounded-xl overflow-hidden">
                    <Image
                      src={staticImages[0]}
                      alt="Workspace 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-full h-[206px] rounded-xl overflow-hidden">
                    <Image
                      src={staticImages[1]}
                      alt="Workspace 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[18px] w-[32%]">
                  <div className="relative w-full h-[206px] rounded-xl overflow-hidden">
                    <Image
                      src={staticImages[2]}
                      alt="Workspace 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-full h-[206px] rounded-xl overflow-hidden">
                    <Image
                      src={staticImages[3]}
                      alt="Workspace 4"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(270deg, rgba(255, 255, 255, 0) 9.16%, #FDFDFD 205.95%)",
                }}
              ></div>
              <div className="absolute top-[94px] right-0 w-[28%] h-[206px] rounded-xl overflow-hidden">
                <Image
                  src={staticImages[4]}
                  alt="Workspace 5"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Center Content */}
            <div className="w-full xl:w-[36%] flex flex-col justify-center gap-[20px] sm:gap-[60px] lg:gap-[80px] xl:gap-[120px]">
              {/* Mobile and Tablet Image Layout - Left stack (2 images), Center (3 images), Right stack (2 images) */}
              <div className="xl:hidden relative w-full overflow-hidden">
                <div className="flex items-center justify-center gap-[8px] sm:gap-[12px] px-4">
                  {/* Left Image Stack - Only 2 outer images */}
                  <div className="flex gap-[8px] sm:gap-[12px] w-[20%]">
                    <div className="flex flex-col gap-[8px] sm:gap-[12px] w-full mt-[20px] sm:mt-[28px]">
                      <div className="relative w-full h-[60px] sm:h-[80px] md:h-[90px] rounded-lg overflow-hidden">
                        <Image
                          src={staticImages[0]}
                          alt="Workspace 1"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-full h-[60px] sm:h-[80px] md:h-[90px] rounded-lg overflow-hidden">
                        <Image
                          src={staticImages[1]}
                          alt="Workspace 2"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Center Images - 3 images like desktop */}
                  <div className="flex gap-[8px] sm:gap-[12px] flex-1 max-w-[300px] sm:max-w-[400px]">
                    <div className="relative w-[30%] h-[120px] sm:h-[160px] md:h-[180px] rounded-lg overflow-hidden mb-[20px] sm:mb-[28px]">
                      <Image
                        src={staticImages[5]}
                        alt="Featured workspace 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-[30%] h-[120px] sm:h-[160px] md:h-[180px] rounded-lg overflow-visible mt-[20px] sm:mt-[28px]">
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Image
                          key={`mobile-center-${currentTestimonial}`}
                          src={activeTestimonials[currentTestimonial].avatar}
                          alt={activeTestimonials[currentTestimonial].name}
                          fill
                          className="object-cover transition-all duration-700 ease-out animate-fade-in-scale"
                          style={{
                            transform: "scale(0.85)",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                    </div>
                    <div className="relative w-[30%] h-[120px] sm:h-[160px] md:h-[180px] rounded-lg overflow-hidden mb-[20px] sm:mb-[28px]">
                      <Image
                        src={staticImages[3]}
                        alt="Featured workspace 3"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Image Stack - Only 2 outer images */}
                  <div className="flex gap-[8px] sm:gap-[12px] w-[20%]">
                    <div className="flex flex-col gap-[8px] sm:gap-[12px] w-full mt-[20px] sm:mt-[28px]">
                      <div className="relative w-full h-[60px] sm:h-[80px] md:h-[90px] rounded-lg overflow-hidden">
                        <Image
                          src={staticImages[8]}
                          alt="Workspace 3"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-full h-[60px] sm:h-[80px] md:h-[90px] rounded-lg overflow-hidden">
                        <Image
                          src={staticImages[9]}
                          alt="Workspace 4"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Center Images (3 Images Layout) */}
              <div className="hidden xl:flex justify-center gap-[18px]">
                <div className="relative w-[30%] h-[206px] rounded-xl overflow-hidden mb-[38px]">
                  <Image
                    src={staticImages[5]}
                    alt="Featured workspace 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-[30%] h-[206px] rounded-xl overflow-visible mt-[30px]">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      key={`desktop-center-${currentTestimonial}`}
                      src={activeTestimonials[currentTestimonial].avatar}
                      alt={activeTestimonials[currentTestimonial].name}
                      fill
                      className="object-cover transition-all duration-700 ease-out animate-fade-in-scale"
                      style={{
                        transform: "scale(0.85)",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                </div>
                <div className="relative w-[30%] h-[206px] rounded-xl overflow-hidden mb-[38px]">
                  <Image
                    src={staticImages[7]}
                    alt="Featured workspace 3"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Section Header */}
              <div className="text-center space-y-1 sm:space-y-[6px] lg:space-y-[8px]">
                <p className="text-base font-normal leading-[20px] sm:leading-[22px] lg:leading-[24px] xl:leading-[28px] text-black uppercase tracking-wide">
                  TESTIMONIALS
                </p>
                <h2 className="text-3xl md:!text-3xl lg:!text-4xl font-semibold leading-[34px] sm:leading-[42px] lg:leading-[52px] xl:leading-[63px] text-[#2b2b2b] px-4">
                  Workdays to Remember
                </h2>
              </div>
            </div>

            {/* Right Image Stack - Hidden on mobile and tablet */}
            <div className="hidden xl:block w-[32%] relative h-[528px]">
              <div className="flex gap-[18px] h-full justify-end">
                <div className="flex flex-col gap-[18px] w-[32%] mb-[94px]">
                  <div className="relative w-full h-[206px] rounded-xl overflow-hidden">
                    <Image
                      src={staticImages[8]}
                      alt="Workspace 6"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-full h-[206px] rounded-xl overflow-hidden">
                    <Image
                      src={staticImages[9]}
                      alt="Workspace 7"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[18px] w-[32%] mt-[94px]">
                  <div className="relative w-full h-[206px] rounded-xl overflow-hidden">
                    <Image
                      src={staticImages[10]}
                      alt="Workspace 8"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-full h-[206px] rounded-xl overflow-hidden">
                    <Image
                      src={staticImages[11]}
                      alt="Workspace 9"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0) 9.16%, #FDFDFD 205.95%)",
                }}
              ></div>
              <div className="absolute top-[94px] left-0 w-[28%] h-[206px] rounded-xl overflow-hidden">
                <Image
                  src={staticImages[12]}
                  alt="Workspace 10"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="flex justify-center mb-[30px] sm:mb-[40px] lg:mb-[42px] mt-[40px] sm:mt-0">
          <div className="w-full max-w-[90%] sm:max-w-[500px] lg:max-w-[600px] xl:w-[40%] bg-white rounded-[20px] sm:rounded-[28px] lg:rounded-3xl p-6 sm:p-6 lg:p-[30px] shadow-[0px_7px_15px_0px_#00000014,0px_28px_28px_0px_#00000012,0px_62px_37px_0px_#0000000A,0px_111px_44px_0px_#00000003,0px_174px_49px_0px_#00000000] transition-all duration-700 ease-out">
            {/* Mobile Layout - Content at top, avatar on left, details at bottom */}
            <div className="xl:hidden space-y-4">
              {/* Content at top */}
              <p
                key={`content-${currentTestimonial}`}
                className="text-[16px] font-medium font-inter-medium leading-[22px] text-black animate-slide-in-right"
              >
                {activeTestimonials[currentTestimonial].content}
              </p>

              {/* Avatar and details at bottom */}
              <div className="flex gap-3 items-start">
                <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0 transition-all duration-500 ease-out">
                  <Image
                    key={currentTestimonial}
                    src={activeTestimonials[currentTestimonial].avatar}
                    alt={activeTestimonials[currentTestimonial].name}
                    fill
                    className="object-cover animate-fade-in-scale"
                  />
                </div>
                <div
                  key={`details-${currentTestimonial}`}
                  className="text-[14px] font-medium font-inter-medium leading-5 text-[#6d6d6d] animate-slide-in-left"
                >
                  <span className="font-bold">
                    {activeTestimonials[currentTestimonial].name}
                  </span>
                  <br />
                  <span className="font-inter-medium">
                    {activeTestimonials[currentTestimonial].position}{" "}
                  </span>
                  <br />
                  <span className="font-bold">
                    {activeTestimonials[currentTestimonial].company}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original design */}
            <div className="hidden xl:block space-y-3 sm:space-y-4 lg:space-y-[20px]">
              <div className="flex gap-3 sm:gap-4 lg:gap-[20px] items-start">
                <div className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px] xl:w-[94px] xl:h-[94px] rounded-full overflow-hidden flex-shrink-0 transition-all duration-500 ease-out">
                  <Image
                    key={currentTestimonial}
                    src={activeTestimonials[currentTestimonial].avatar}
                    alt={activeTestimonials[currentTestimonial].name}
                    fill
                    className="object-cover animate-fade-in-scale"
                  />
                </div>
                <div className="flex-1">
                  <p
                    key={`content-${currentTestimonial}`}
                    className="text-[15px] sm:text-base lg:text-lg font-medium font-inter-medium leading-[20px] sm:leading-[22px] lg:leading-[24px] xl:leading-[27px] text-black animate-slide-in-right"
                  >
                    {activeTestimonials[currentTestimonial].content}
                  </p>
                </div>
              </div>

              <div
                key={`details-${currentTestimonial}`}
                className="text-[14px] sm:text-[15px] lg:text-base font-medium font-inter-medium leading-5 sm:leading-[22px] lg:leading-6 text-[#6d6d6d] animate-slide-in-left"
              >
                <span className="font-bold">
                  {activeTestimonials[currentTestimonial].name}
                </span>
                <br />
                <span className="font-inter-medium">
                  {activeTestimonials[currentTestimonial].position},{" "}
                </span>
                <span className="font-bold">
                  {activeTestimonials[currentTestimonial].company}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots - Show only 5 dots, each representing one testimonial, moving forward sequentially */}
        <div className="flex justify-center gap-[6px] sm:gap-2 lg:gap-[10px] mb-[30px] sm:mb-[40px] lg:mb-[42px]">
          {Array.from({ length: 5 }).map((_, dotIndex) => {
            // Calculate which testimonial this dot represents
            // Show 5 dots moving forward: current, current+1, current+2, current+3, current+4
            // With wrapping to loop through all 13 testimonials
            const getTestimonialIndex = (dotIdx: number) => {
              let testimonialIdx = currentTestimonial + dotIdx;

              // Wrap around if out of bounds
              if (testimonialIdx >= activeTestimonials.length) {
                testimonialIdx = testimonialIdx - activeTestimonials.length;
              }

              return testimonialIdx;
            };

            const testimonialIndex = getTestimonialIndex(dotIndex);
            const isActive = testimonialIndex === currentTestimonial; // Check if this dot represents the current testimonial

            return (
              <button
                key={`dot-${dotIndex}-${testimonialIndex}-${currentTestimonial}`}
                onClick={() => goToTestimonial(testimonialIndex)}
                className="transition-all duration-500 ease-out touch-manipulation transform hover:scale-110 active:scale-95"
                aria-label={`Go to testimonial ${testimonialIndex + 1}`}
              >
                {isActive ? (
                  <div className="relative w-[38px] sm:w-[46px] h-[6px] sm:h-[8px] bg-[#d9d9d9] rounded-[4px] overflow-hidden animate-dot-activate">
                    <div
                      key={`progress-${currentTestimonial}`}
                      className="absolute inset-0 bg-[#8d8d8d] rounded-[4px] animate-progress-bar"
                    ></div>
                  </div>
                ) : (
                  <div className="w-[6px] sm:w-[8px] h-[6px] sm:h-[8px] bg-[#d9d9d9] rounded-[4px] hover:bg-[#8d8d8d] active:bg-[#8d8d8d] transition-all duration-300 ease-out hover:scale-110 animate-dot-inactive"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Read All Stories Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="px-12 border-[#2C3E50] text-[#2C3E50]"
            onClick={handleReadAllStories}
          >
            Read all stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
