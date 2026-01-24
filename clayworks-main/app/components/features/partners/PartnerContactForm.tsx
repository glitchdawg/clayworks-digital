"use client";

import type React from "react";
import { useState } from "react";

interface PartnerContactFormProps {
  title?: string;
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
  agreeToPolicy: boolean;
}

export function PartnerContactForm({
  title = "Let's Build Success Together",
  onSubmit,
}: PartnerContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
    agreeToPolicy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agreeToPolicy: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (onSubmit) {
      await onSubmit(formData);
    } else {
      // Default behavior
      await new Promise((resolve) => setTimeout(resolve, 1000));

    }

    setIsSubmitting(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      message: "",
      agreeToPolicy: false,
    });
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="w-full text-center max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <p className="text-base md:!text-base font-inter-medium text-black uppercase tracking-wider mb-2">
              PARTNER WITH US
            </p>
            <h2 className="text-3xl md:!text-3xl lg:!text-[40px] font-inter-medium text-brand-secondary">
              {title}
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-bg-blue-light rounded-3xl p-6 md:p-8 lg:p-10"
            aria-label="Partner contact form"
          >
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-inter-normal text-secondary mb-2 text-left"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  aria-required="true"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] bg-white text-brand-secondary transition-all"
                />
              </div>

              {/* Email and Phone in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-inter-normal text-secondary mb-2 text-left"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] bg-white text-brand-secondary transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-inter-normal text-secondary mb-2 text-left"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    aria-required="true"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] bg-white text-brand-secondary transition-all"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-inter-normal text-secondary mb-2 text-left"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Your company"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] bg-white text-brand-secondary transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-inter-normal text-secondary mb-2 text-left"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none resize-none bg-white text-brand-secondary"
                />
              </div>

              {/* Checkbox */}
              <div>
                <label
                  htmlFor="agree-policy"
                  className="flex items-start gap-3 cursor-pointer text-left"
                >
                  <input
                    type="checkbox"
                    id="agree-policy"
                    name="agreeToPolicy"
                    checked={formData.agreeToPolicy}
                    onChange={handleCheckboxChange}
                    required
                    aria-required="true"
                    className="mt-1 w-4 h-4 text-brand-primary border-gray rounded focus:ring-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2"
                  />
                  <span className="text-sm text-muted leading-relaxed text-text-muted">
                    I agree to the privacy policy and agree to be contact by the
                    ClayWorks Team
                  </span>
                </label>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!formData.agreeToPolicy || isSubmitting}
                  aria-busy={isSubmitting}
                  aria-disabled={!formData.agreeToPolicy || isSubmitting}
                  className={`py-3.5 px-20 rounded-lg font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${formData.agreeToPolicy && !isSubmitting
                      ? "bg-brand-primary hover:bg-brand-primary-hover"
                      : "bg-border-gray cursor-not-allowed"
                    }`}
                  style={
                    formData.agreeToPolicy && !isSubmitting
                      ? { boxShadow: "0px 15px 26px 0px #00000040" }
                      : {}
                  }
                >
                  {isSubmitting ? "Sending..." : "Let's Talk"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
