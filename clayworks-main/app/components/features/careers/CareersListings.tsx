"use client";

import React, { useState, useMemo } from "react";
import { Select } from "../../ui/select";
import { cn } from "../../ui/util";

// Types
export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  locationType: "on-site" | "remote" | "hybrid";
  description: string;
  link: string;
  category?: string;
  type?: string;
}

export interface CareersListingsProps {
  eyebrow?: string;
  title: string;
  jobs: JobListing[];
  categories?: string[];
  types?: string[];
  locations?: string[];
  onJobClick?: (jobId: string) => void;
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  category: string;
  type: string;
  location: string;
}

export function CareersListings({
  eyebrow = "JOIN US",
  title = "Let's Craft the Future Together",
  jobs,
  categories: initialCategories = [],
  types: initialTypes = [],
  locations: initialLocations = [],
  onJobClick,
  onFilterChange,
  className,
}: CareersListingsProps) {
  // Current filter selections (what user selects in dropdowns)
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    type: "all",
    location: "all",
  });

  // Applied filters (what actually filters the jobs)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    category: "all",
    type: "all",
    location: "all",
  });

  // Auto-generate filter options from jobs if not provided
  const categories = useMemo(() => {
    if (initialCategories.length > 0) return initialCategories;
    const uniqueCategories = Array.from(
      new Set(jobs.map((j) => j.category).filter(Boolean)),
    );
    return uniqueCategories as string[];
  }, [initialCategories, jobs]);

  const types = useMemo(() => {
    if (initialTypes.length > 0) return initialTypes;
    return ["Full-time", "Part-time", "Contract", "Internship"];
  }, [initialTypes]);

  const locations = useMemo(() => {
    if (initialLocations.length > 0) return initialLocations;
    const uniqueLocations = Array.from(
      new Set(jobs.map((j) => j.location).filter(Boolean)),
    );
    return uniqueLocations as string[];
  }, [initialLocations, jobs]);

  // Filter jobs based on applied filters (only changes when button is clicked)
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (
        appliedFilters.category !== "all" &&
        job.category !== appliedFilters.category
      ) {
        return false;
      }
      if (appliedFilters.type !== "all" && job.type !== appliedFilters.type) {
        return false;
      }
      if (
        appliedFilters.location !== "all" &&
        job.location !== appliedFilters.location
      ) {
        return false;
      }
      return true;
    });
  }, [jobs, appliedFilters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    // Only update the selection, don't apply filters yet
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleJobClick = (jobId: string) => {
    if (onJobClick) {
      onJobClick(jobId);
    } else {
      // Default behavior: log for now, can navigate to job detail page
      const job = jobs.find((j) => j.id === jobId);
      if (job) {

        // TODO: Navigate to job detail page or open modal
      }
    }
  };

  const handleApplyFilters = () => {
    // Apply the current filter selections
    setAppliedFilters(filters);
    if (onFilterChange) {
      onFilterChange(filters);
    } else {
      // TODO: Implement analytics tracking for filter changes

    }
  };

  return (
    <div className={cn("bg-white w-full", className)}>
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12 px-4 md:px-6">
        {eyebrow && (
          <p className="text-sm md:!text-base font-inter-normal text-black uppercase tracking-wider mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl lg:!text-4xl font-inter-semibold text-brand-secondary">
          {title}
        </h2>
      </div>

      {/* Filter Section */}
      <div className="mx-auto container px-4 md:px-6 my-8 md:my-12">
        <div
          className="bg-white rounded-2xl p-6 md:!p-8"
          style={{
            boxShadow:
              "0px 3px 7px 0px #0000000A, 0px 13px 13px 0px #00000008, 0px 30px 18px 0px #00000005, 0px 53px 21px 0px #00000003, 0px 83px 23px 0px #00000000",
            backdropFilter: "blur(11px)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <Select
              label="Category"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              aria-label="Filter jobs by category"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>

            {/* Type Filter */}
            <Select
              label="Type"
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              aria-label="Filter jobs by type"
            >
              <option value="all">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>

            {/* Location Filter */}
            <Select
              label="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              aria-label="Filter jobs by location"
            >
              <option value="all">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </Select>

            {/* Filter Button */}
            <div className="w-full flex flex-col">
              <label className="block text-sm font-inter-medium text-black mb-2 invisible">
                Filter
              </label>
              <div className="flex justify-center lg:!flex-col lg:!justify-start">
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="py-3 w-full lg:!w-60 rounded-lg bg-[#E07B39] hover:bg-[#D06A28] text-white font-inter-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2"
                  style={{
                    boxShadow: "0px 15px 26px 0px #00000040",
                  }}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="mx-auto container px-4 md:px-6 mb-16">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <p className="text-lg font-inter-normal text-gray-600 mb-4">
              No jobs found matching your criteria
            </p>
          </div>
        ) : (
          <ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:!gap-6 my-10 md:my-16"
            role="list"
          >
            {filteredJobs.map((job) => (
              <li key={job.id} role="listitem">
                <JobCard job={job} onClick={() => handleJobClick(job.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Job Card Component
interface JobCardProps {
  job: JobListing;
  onClick?: () => void;
}

function JobCard({ job, onClick }: JobCardProps) {
  return (
    <article
      className="bg-white rounded-2xl transition-all duration-300 overflow-hidden h-full flex flex-col group"
      style={{
        boxShadow:
          "0px 4px 9px 0px #0000000D, 0px 16px 16px 0px #0000000A, 0px 36px 22px 0px #00000008, 0px 65px 26px 0px #00000003, 0px 101px 28px 0px #00000000",
      }}
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Job Title */}
        <h3 className="text-xl md:text-2xl font-inter-semibold text-[#1A2C42] mb-1 group-hover:text-[#E07B39] transition-colors">
          {job.title}
        </h3>

        {/* Department */}
        <p className="text-sm md:text-base font-inter-semibold text-[#333336] mb-2">
          {job.department}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm md:text-base font-inter-normal text-[#333336]">
            {job.locationType.charAt(0).toUpperCase() +
              job.locationType.slice(1)}{" "}
            | {job.location}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base font-inter-normal text-gray-700 mb-6 flex-1 line-clamp-3">
          {job.description}
        </p>

        {/* CTA Link */}
        <button
          type="button"
          onClick={onClick}
          className="text-[#E07B39] cursor-pointer font-inter-medium text-sm md:!text-base hover:text-[#D06A28] transition-colors text-left flex items-center gap-2 group-hover:gap-3 mt-auto focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
          aria-label={`View ${job.title} role details`}
        >
          View role
        </button>
      </div>
    </article>
  );
}

export default CareersListings;
