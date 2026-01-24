"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, ChevronDown } from "lucide-react";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  requirement: string;
  numberOfSeats: string;
  message: string;
  agreeToPolicy: boolean;
}

export function ContactUs() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    requirement: "Day Pass",
    numberOfSeats: "1",
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // TODO: Implement backend API integration for contact form submission

    setIsSubmitting(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      requirement: "Day Pass",
      numberOfSeats: "1",
      message: "",
      agreeToPolicy: false,
    });
  };

  return (
    <div className="min-h-full bg-white pb-8 lg:!pb-12">
      {/* Header Section */}
      <div className="text-center pb-12 px-4 space-y-2 sm:space-y-3">
        <p className="text-base sm:text-lg font-inter-medium text-black uppercase tracking-wider">
          CONTACT US
        </p>
        <h1 className=" text-3xl md:!text-3xl lg:!text-4xl font-inter-semibold text-text-heading leading-tight">
          Have a Rare Question in Mind?
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-inter-normal leading-relaxed max-w-96 mx-auto px-2">
          Our team is here to help you make the most of your co-working
          experience.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-8 relative">
            {/* Image Section */}
            <div className="relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/discuss.png"
                  alt="Team meeting in modern coworking space"
                  fill
                  className="object-cover h-auto w-full"
                />
              </div>

              {/* Contact Info Cards - Overlay */}
              <div className="absolute md:-bottom-16 -bottom-33 left-1/2 -translate-x-1/2 w-[90%] sm:w-[85%] flex flex-col sm:flex-row gap-4 flex-wrap bg-bg-blue-light rounded-3xl p-6">
                {/* Phone */}
                <div className="bg-bg-secondary rounded-xl p-4 flex items-center gap-3 flex-1 min-w-[200px]">
                  <div className="w-10 h-10 bg-bg-gray-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone
                      className="w-5 h-5 text-text-gray"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-inter-medium text-gray-900 text-base">
                      Phone
                    </p>
                    <p className="text-text-muted text-xs">+1 (555) 123-4567</p>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-bg-secondary rounded-xl p-4 flex items-center gap-3 flex-1 min-w-[200px]">
                  <div className="w-10 h-10 bg-bg-gray-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail
                      className="w-5 h-5 text-text-gray"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-inter-medium text-gray-900 text-base">
                      Email
                    </p>
                    <p className="text-text-muted text-xs break-all">
                      hello@clayworks.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer to prevent layout overlap */}
            <div className="h-20 sm:h-0"></div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-bg-blue-light rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-label="Contact form"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-inter-normal text-text-secondary mb-2"
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
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-inter-normal text-text-secondary mb-2"
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
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-inter-normal text-text-secondary mb-2"
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
                  className="w-full px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 bg-white"
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Requirement */}
                <div>
                  <label
                    htmlFor="requirement"
                    className="block text-sm font-inter-normal text-text-secondary mb-2"
                  >
                    Requirement
                  </label>
                  <div className="relative">
                    <select
                      id="requirement"
                      name="requirement"
                      value={formData.requirement}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          requirement: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] bg-white appearance-none transition-all"
                      aria-label="Select requirement type"
                    >
                      <option value="Day Pass">Day Pass</option>
                      <option value="Meeting Room">Meeting Room</option>
                      <option value="Virtual Office">Virtual Office</option>
                      <option value="Co-working Space">Co-working Space</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <label
                    htmlFor="numberOfSeats"
                    className="block text-sm font-inter-normal text-text-secondary mb-2"
                  >
                    Number of seats
                  </label>
                  <div className="relative">
                    <select
                      id="numberOfSeats"
                      name="numberOfSeats"
                      value={formData.numberOfSeats}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          numberOfSeats: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] bg-white appearance-none transition-all"
                      aria-label="Select number of seats"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5+</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-inter-normal text-text-secondary mb-2"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={4}
                  className="w-full px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] resize-none bg-white transition-all"
                />
              </div>

              {/* Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="agreeToPolicy"
                    name="agreeToPolicy"
                    checked={formData.agreeToPolicy}
                    onChange={handleCheckboxChange}
                    required
                    aria-required="true"
                    className="mt-1 w-4 h-4 text-brand-primary border-border-gray rounded focus:outline-none focus:shadow-[0_0_0_2px_#E07B39] transition-all"
                  />
                  <span className="text-sm text-text-muted leading-relaxed">
                    I agree to the privacy policy and consent to be contacted by
                    the ClayWorks team.
                  </span>
                </label>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!formData.agreeToPolicy || isSubmitting}
                  className={`w-fit py-3 px-16 rounded-lg font-inter-semibold text-white transition-all duration-200 ${formData.agreeToPolicy && !isSubmitting
                      ? "bg-brand-primary hover:bg-brand-primary-hover hover:scale-[1.02]"
                      : "bg-border-gray cursor-not-allowed"
                    }`}
                  style={
                    formData.agreeToPolicy && !isSubmitting
                      ? { boxShadow: "0px 15px 26px 0px #00000040" }
                      : {}
                  }
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
