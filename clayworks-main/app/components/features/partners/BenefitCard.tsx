import React from "react";

interface BenefitCardProps {
  title: string;
  description: string;
}

export function BenefitCard({ title, description }: BenefitCardProps) {
  // Check if description contains "OR" to determine complex layout
  const hasOrSeparator = description.includes(" OR ");

  // Parse complex layout (with OR)
  let introText = "";
  let option1 = "";
  let option2 = "";

  if (hasOrSeparator) {
    const parts = description.split(" OR ");
    const introMatch = parts[0].match(/^(.+?):\s*(.+)$/);
    if (introMatch) {
      introText = introMatch[1] + ":";
      option1 = introMatch[2];
      option2 = parts[1];
    }
  }

  // For simple cards, split by periods to create separate lines
  const simpleLines = !hasOrSeparator
    ? description.split(".").filter((line) => line.trim().length > 0)
    : [];

  return (
    <article
      className="bg-primary rounded-2xl p-6 md:p-8 h-full"
      style={{
        boxShadow:
          "0px 4px 9px 0px #0000000D, 0px 16px 16px 0px #0000000A, 0px 36px 22px 0px #00000008, 0px 65px 26px 0px #00000003, 0px 101px 28px 0px #00000000",
      }}
    >
      {/* Title */}
      <h3 className="text-lg md:!text-xl font-inter-semibold text-text-gray-light mb-3 text-left">
        {title}
      </h3>

      {/* Simple Layout */}
      {!hasOrSeparator && (
        <div className="space-y-2">
          {simpleLines.map((line, index) => {
            const trimmedLine = line.trim();
            // Add period only if it doesn't already end with one
            const finalLine = trimmedLine.endsWith(".")
              ? trimmedLine
              : trimmedLine + ".";
            return (
              <p
                key={index}
                className="text-sm md:!text-base text-text-gray-light font-inter-normal leading-relaxed text-left"
              >
                {finalLine}
              </p>
            );
          })}
        </div>
      )}

      {/* Complex Layout with Options */}
      {hasOrSeparator && (
        <div className="space-y-4 text-left">
          <p className="text-sm md:!text-base text-text-gray-light font-inter-normal leading-relaxed">
            {introText}
          </p>

          {/* Option 1 */}
          <div className="bg-bg-accent rounded-lg px-4 py-2">
            <p className="text-sm md:!text-base text-text-gray-light font-inter-normal leading-relaxed">
              {option1}
            </p>
          </div>

          {/* OR Separator */}
          <p className="text-sm md:!text-base text-text-gray-light font-inter-normal text-left">
            OR
          </p>

          {/* Option 2 */}
          <div className="bg-bg-accent rounded-lg px-4 py-2">
            <p className="text-sm md:!text-base text-text-gray-light font-inter-normal leading-relaxed">
              {option2}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
