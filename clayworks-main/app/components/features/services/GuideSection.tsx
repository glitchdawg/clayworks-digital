// components/CTASection.tsx
"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

interface FormField {
  id: string;
  label: string;
  type: "email" | "text" | "select" | "number";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface CTASectionProps {
  // Content
  eyebrow?: string;
  title: string;
  description: string;

  // Image
  image?: {
    src: string;
    alt: string;
    className?: string;
  };
  imagePosition?: "left" | "right";

  // Form
  formFields?: FormField[];
  ctaText: string;
  ctaButtonColor?: string;
  onSubmit?: (data: Record<string, string>) => void;

  // Styling
  backgroundColor?: string;
  className?: string;
}

export function CTASection({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "left",
  formFields = [],
  ctaText,
  ctaButtonColor = "bg-brand-primary hover:bg-brand-primary-hover",
  onSubmit,
  backgroundColor = "bg-bg-accent",
  className = "",
}: CTASectionProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // TODO: Implement backend API integration for form submission

    }
  };

  const isImageLeft = imagePosition === "left";

  return (
    <section
      className={`${backgroundColor} py-16 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="container mx-auto">
        {/* Desktop Layout */}
        <div
          className={`hidden lg:flex lg:items-center lg:justify-center lg:gap-12 xl:gap-16 ${!image ? "max-w-4xl mx-auto" : ""}`}
        >
          {/* Image - Left Side */}
          {image && isImageLeft && (
            <div className="flex-shrink-0 w-full max-w-xs">
              <div className="overflow-hidden rounded-lg max-h-[400px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={500}
                  className={`w-full h-auto max-h-[400px] object-contain ${image.className || ""}`}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className={`flex-1 max-w-xl space-y-6 ${!image ? "text-center" : ""}`}
          >
            <div className="space-y-2">
              {eyebrow && (
                <p className="uppercase tracking-wider text-text-heading font-inter-normal text-sm lg:!text-lg">
                  {eyebrow}
                </p>
              )}
              <h2 className="text-text-heading text-3xl lg:!text-4xl xl:!text-5xl font-inter-medium leading-tight">
                {title}
              </h2>
            </div>

            <p className="text-text-heading font-inter-normal text-base lg:text-lg">
              {description}
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              aria-label={title}
            >
              {formFields.length > 0 && (
                <div
                  className={`flex ${formFields.length === 1 ? "flex-col sm:flex-row" : "flex-col"} gap-4`}
                >
                  {formFields.map((field) => (
                    <div key={field.id} className="flex-1 space-y-2">
                      {field.label && (
                        <label
                          htmlFor={`${field.id}-desktop`}
                          className="block text-sm font-inter-medium text-text-heading"
                        >
                          {field.label}
                          {field.required && (
                            <span
                              className="text-red-500 ml-1"
                              aria-label="required"
                            >
                              *
                            </span>
                          )}
                        </label>
                      )}

                      {field.type === "select" ? (
                        <select
                          id={`${field.id}-desktop`}
                          value={formData[field.id] || ""}
                          onChange={(e) =>
                            handleInputChange(field.id, e.target.value)
                          }
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-text-heading font-inter-normal focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] transition-all"
                          required={field.required}
                          aria-required={field.required}
                        >
                          <option value="">
                            {field.placeholder || "Select..."}
                          </option>
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          id={`${field.id}-desktop`}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.id] || ""}
                          onChange={(e) =>
                            handleInputChange(field.id, e.target.value)
                          }
                          className="bg-white border border-gray-300 px-4 py-3"
                          required={field.required}
                          aria-required={field.required}
                        />
                      )}
                    </div>
                  ))}

                  <Button
                    type="submit"
                    className={`${ctaButtonColor} text-white px-8 py-6 rounded-lg font-inter-medium ${formFields.length === 1 ? "self-end" : "w-full"}`}
                  >
                    {ctaText}
                  </Button>
                </div>
              )}

              {formFields.length === 0 && (
                <Button
                  type="submit"
                  className={`${ctaButtonColor} text-white px-12 py-6 rounded-lg font-inter-medium ${!image ? "mx-auto" : ""}`}
                >
                  {ctaText}
                </Button>
              )}
            </form>
          </div>

          {/* Image - Right Side */}
          {image && !isImageLeft && (
            <div className="flex-shrink-0 w-full max-w-md">
              <div className="overflow-hidden rounded-lg max-h-[400px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={500}
                  className={`w-full h-auto max-h-[400px] object-contain ${image.className || ""}`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          <div className="text-center space-y-2">
            {eyebrow && (
              <p className="uppercase tracking-wider text-text-heading font-inter-normal text-sm">
                {eyebrow}
              </p>
            )}
            <h2 className="text-text-heading text-3xl lg:text-4xl font-inter-medium">
              {title}
            </h2>
          </div>

          {/* Image */}
          {image && (
            <div className="flex justify-center px-4">
              <div className="overflow-hidden max-w-sm w-full rounded-lg max-h-[300px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={400}
                  className={`w-full h-auto max-h-[300px] object-contain ${image.className || ""}`}
                />
              </div>
            </div>
          )}

          <p className="text-center text-text-heading font-inter-normal text-base px-4">
            {description}
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 px-4"
            aria-label={title}
          >
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                {field.label && (
                  <label
                    htmlFor={`${field.id}-mobile`}
                    className="block text-sm font-inter-medium text-text-heading"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1" aria-label="required">
                        *
                      </span>
                    )}
                  </label>
                )}

                {field.type === "select" ? (
                  <select
                    id={`${field.id}-mobile`}
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 text-text-heading font-inter-normal"
                    required={field.required}
                    aria-required={field.required}
                  >
                    <option value="">{field.placeholder || "Select..."}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={`${field.id}-mobile`}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    className="bg-white border-2 border-gray-200 p-3 rounded-lg"
                    required={field.required}
                    aria-required={field.required}
                  />
                )}
              </div>
            ))}

            <Button
              type="submit"
              className={`w-full ${ctaButtonColor} text-white py-6 rounded-lg font-inter-medium`}
            >
              {ctaText}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
