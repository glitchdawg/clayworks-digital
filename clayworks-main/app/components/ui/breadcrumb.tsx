import type React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "",
  separator = "/",
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={`mb-6 relative z-10 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center text-sm text-black font-inter-medium">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-black hover:text-gray-700 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
                  aria-current={isLast ? undefined : "page"}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="text-[#E07B39] font-medium"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
