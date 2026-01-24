import Image from "next/image";
import { Icon } from "@iconify/react";

interface LocationCardProps {
  title: string;
  address: string;
  travelTime: string;
  distance: string;
  hasPowerBackup?: boolean;
}

export function LocationCard({
  title,
  address,
  travelTime,
  distance,
  hasPowerBackup = true,
}: LocationCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden p-4 space-y-3 shadow-lg">
      <div className="">
        <Image
          src="/images/clay.jpg"
          alt={`${title} location image`}
          width={400}
          height={300}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>
      <div className="">
        <h3 className="mb-2 text-xl font-inter-bold text-[#1A2C42]">{title}</h3>
        <p className="text-[#333336] font-inter-normal text-sm mb-4">
          {address}
        </p>
        <div className="flex items-center gap-4 text-[#333336] text-xs">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Icon
              icon="mdi:aeroplane"
              className="w-4 h-4 flex-shrink-0"
              aria-hidden="true"
            />
            <span>{travelTime}</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Icon
              icon="mynaui:train"
              className="w-4 h-4 flex-shrink-0"
              aria-hidden="true"
            />
            <span>{distance}</span>
          </div>
          {hasPowerBackup && (
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Icon
                icon="subway:power"
                className="w-4 h-4 flex-shrink-0"
                aria-hidden="true"
              />
              <span>Power backup</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
