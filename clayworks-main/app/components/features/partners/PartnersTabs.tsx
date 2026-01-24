import type React from "react";
import PartnersTabButtons from "@/app/components/features/partners/PartnersTabButtons";
import { PropertyOwnerTab } from "./PropertyOwnerTab";
import { BrokerTab } from "./BrokerTab";

export interface PartnersTabsProps {
  activeTab?: "property-owner" | "broker";
  propertyOwnerLabel?: string;
  brokerLabel?: string;
}

const PartnersTabs: React.FC<PartnersTabsProps> = ({
  activeTab = "property-owner",
  propertyOwnerLabel = "I'm a Property Owner",
  brokerLabel = "I'm a Broker",
}) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 pt-12 md:pt-16 lg:pt-20">
        {/* Tabs */}
        <PartnersTabButtons
          activeTab={activeTab}
          propertyOwnerLabel={propertyOwnerLabel}
          brokerLabel={brokerLabel}
        />
      </div>

      {/* Tab Content */}
      {activeTab === "property-owner" ? (
        <div
          role="tabpanel"
          id="property-owner-tabpanel"
          aria-labelledby="property-owner-tab"
        >
          <PropertyOwnerTab />
        </div>
      ) : (
        <div role="tabpanel" id="broker-tabpanel" aria-labelledby="broker-tab">
          <BrokerTab />
        </div>
      )}
    </section>
  );
};

export default PartnersTabs;
