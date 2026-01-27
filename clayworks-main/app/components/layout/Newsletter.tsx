// components/blog/NewsletterSection.tsx
"use client";

import type React from "react";
import { useState } from "react";

export interface NewsletterSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubscribe?: (email: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  title = "Ideas, Insights, and Invitations",
  description = "Updates on workspace thinking, sustainability, design ideas, and event invites. Zero spam, just relevance.",
  buttonText = "Subscribe Now",
  onSubscribe,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubscribe) {
      onSubscribe(email);
    }
    setEmail("");
  };

  return (
    <div className="bg-[#E8F0F7] w-full p-8 md:!p-12 lg:!p-16 flex justify-center">
      <div className="max-w-xl text-left w-full">
        <p className="text-base md:!text-lg font-inter-normal text-black uppercase tracking-wider mb-2">
          NEWSLETTER
        </p>
        <h3 className="text-3xl md:!text-4xl lg:!text-4xl font-inter-medium text-[#2B2B2B] mb-4">
          {title}
        </h3>
        <p className="text-black font-inter-normal text-sm md:!text-base leading-relaxed mb-8">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-black font-inter-medium text-sm"
          >
            Email
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] text-sm transition-all"
            />
            <button
              type="submit"
              className="bg-[#E07B39] hover:bg-[#D06A28] text-white font-inter-medium px-6 py-3 rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
