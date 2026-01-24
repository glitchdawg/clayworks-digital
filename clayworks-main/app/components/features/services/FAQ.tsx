// components/FAQSection.tsx (with horizontal scroll on mobile)
"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  label: string;
  faqs: FAQItem[];
}

interface FAQSectionProps {
  eyebrow: string;
  title: string;
  categories: FAQCategory[];
  className?: string;
}

export function FAQSection({
  eyebrow,
  title,
  categories,
  className = "",
}: FAQSectionProps) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");

  const activeCategoryFaqs =
    categories.find((cat) => cat.id === activeTab)?.faqs || [];

  return (
    <section className={`py-10 lg:py-16 bg-white ${className}`}>
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-base font-inter-medium text-black uppercase tracking-wider mb-4">
            {eyebrow}
          </p>
          <h2 className="text-4xl lg:text-5xl font-inter-medium text-[#2B2B2B] leading-tight">
            {title}
          </h2>
        </div>

        {/* Tabs - Horizontal scroll on mobile, centered on desktop */}
        <div className="lg:mb-12 mb-6  -mx-6 px-6 lg:mx-0 lg:px-0">
          <div
            className="overflow-x-auto scrollbar-hide lg:overflow-visible"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              className="flex gap-3 lg:justify-center pb-2 lg:pb-0"
              role="tablist"
              aria-label="FAQ categories"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === category.id}
                  aria-controls={`faq-panel-${category.id}`}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-6 py-3 rounded-full font-inter-medium text-base lg:text-lg transition-all duration-300 flex-shrink-0 focus:outline-none ${
                    activeTab === category.id
                      ? "bg-[#2C3E50] text-white shadow-md"
                      : "bg-white text-[#1A2C42] hover:bg-gray-100"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accordion */}
        <Accordion.Root
          type="single"
          collapsible
          className="space-y-4"
          aria-label={`FAQ items for ${categories.find((cat) => cat.id === activeTab)?.label || "selected category"}`}
        >
          {activeCategoryFaqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border border-[#E5E7EB] rounded-2xl bg-[#F9FAFB] hover:shadow-md transition-shadow duration-300"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left group focus:outline-none rounded-2xl">
                  <span className="text-base lg:text-xl font-inter-medium text-[#111827] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="w-5 h-5 text-[#6B7280] flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="px-6 pb-6 pt-0">
                  <p className="text-base lg:text-lg text-[#6B7280] font-inter-normal leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
