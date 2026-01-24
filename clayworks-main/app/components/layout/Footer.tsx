"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-[#0F161E]">
      <div className="container mx-auto px-4">
        {/* Top Section - Logo and Newsletter */}
        <div className="py-8 lg:py-14">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-center gap-6 lg:gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity mb-4 lg:mb-0"
            >
              <Image
                src="/images/logo.png"
                alt="ClayWorks Logo"
                width={600}
                height={400}
                className="object-contain w-auto h-8 lg:h-10"
              />
            </Link>

            {/* Newsletter Subscription */}
            <form
              className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0 w-full lg:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: Implement newsletter subscription
              }}
              aria-label="Newsletter subscription form"
            >
              <div className="relative flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for newsletter subscription
                </label>
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#21272A] w-4 h-4"
                  aria-hidden="true"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email to get the latest news..."
                  required
                  aria-required="true"
                  aria-label="Email address for newsletter subscription"
                  className="pl-10 pr-4 py-3 w-full lg:w-96 border border-[#C1C7CD] lg:border-r-0 focus:outline-none focus:border-[#E07B39] lg:focus:border-r-0 !rounded-none focus-visible:!rounded-none focus-visible:!border-r-0 lg:focus-visible:!border-r-0"
                />
              </div>
              <button
                type="submit"
                className="bg-[#C76A30] text-white px-6 py-3 font-semibold hover:bg-[#B85A20] transition-colors border border-[#C76A30] border-l-0 lg:border-l-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[#C1C7CD]" />

        {/* Main Footer Links */}
        <div className="py-6 lg:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* CLAYWORKS */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">CLAYWORKS</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Twenty One
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Thirty Two
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Fourty Three
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Fifty Four
                  </Link>
                </li>
              </ul>
            </div>

            {/* LOCATIONS */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">LOCATIONS</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Sixty Five
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Seventy Six
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Eighty Seven
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Ninety Eight
                  </Link>
                </li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">RESOURCES</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    One Two
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Three Four
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Five Six
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Seven Eight
                  </Link>
                </li>
              </ul>
            </div>

            {/* SERVICES */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">SERVICES</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    One Two
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Three Four
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Five Six
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Seven Eight
                  </Link>
                </li>
              </ul>
            </div>

            {/* PARTNERS */}
            <div>
              <h3 className="font-bold text-sm uppercase mb-4">PARTNERS</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    One Two
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Three Four
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Five Six
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E07B39] transition-colors"
                  >
                    Seven Eight
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[#C1C7CD]" />

        {/* Company Information */}
        <div className="py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2 flex-1">
              <p className="text-sm">
                ClayWorks Spaces Technologies Private Limited
              </p>
              <p className="text-sm">Bengaluru, Karnataka 560078</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
                <span>For media queries,</span>
                <span>write to us at </span>
                <a
                  href="mailto:media@clayworks.in"
                  className="underline hover:text-[#E07B39] transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  media@clayworks.in
                </a>
                <span> or reach us at </span>
                <a
                  href="tel:080-47111888"
                  className="underline hover:text-[#E07B39] transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  080-47111888
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
              <span className="text-sm font-medium">Follow Us</span>
              <nav
                className="flex items-center lg:gap-6 gap-8"
                aria-label="Social media links"
              >
                <Link
                  href="https://www.youtube.com/channel/UCxaz2XiBUx58z3Njkmgp3bA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E07B39] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Follow us on YouTube"
                >
                  <Youtube className="w-6 h-6" aria-hidden="true" />
                </Link>
                <Link
                  href="https://www.facebook.com/clayworks.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E07B39] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-6 h-6" aria-hidden="true" />
                </Link>
                <Link
                  href="https://x.com/ClayWorks_Space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E07B39] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Follow us on X (Twitter)"
                >
                  <Twitter className="w-6 h-6" aria-hidden="true" />
                </Link>
                <Link
                  href="https://www.instagram.com/clayworks.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E07B39] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6" aria-hidden="true" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/clayworks-spaces"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E07B39] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-6 h-6" aria-hidden="true" />
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[#C1C7CD]" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-center gap-4 lg:gap-6">
            {/* Copyright */}
            <div className="text-sm order-2 lg:order-1 text-center lg:text-left">
              ClayWorks @ 2025. All rights reserved.
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 lg:gap-6 order-1 lg:order-2">
              <Link
                href="/"
                className="text-sm hover:text-[#E07B39] transition-colors"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-[#E07B39] transition-colors flex items-center gap-1"
              >
                Services
                <ChevronDown className="w-3 h-3" />
              </Link>
              <Link
                href="/blogs"
                className="text-sm hover:text-[#E07B39] transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                className="text-sm hover:text-[#E07B39] transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/about-us"
                className="text-sm hover:text-[#E07B39] transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
