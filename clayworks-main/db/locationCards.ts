export type LocationCardData = {
  slug: string;
  title: string;
  address: string;
  travelTime: string;
  distance: string;
  hasPowerBackup?: boolean;
};

export const allLocationCards: LocationCardData[] = [
  {
    slug: "jp-nagar",
    title: "ClayWorks JP Nagar",
    address: "RBI Layout, 3rd Phase, J. P. Nagar",
    travelTime: "35 min",
    distance: "0.3 km",
    hasPowerBackup: true,
  },
  {
    slug: "bannerghatta-rd",
    title: "ClayWorks Bannerghatta Rd",
    address: "Bannerghatta Main Road, Bengaluru",
    travelTime: "30 min",
    distance: "2.1 km",
    hasPowerBackup: true,
  },
  {
    slug: "central-bengaluru",
    title: "ClayWorks Central Bengaluru",
    address: "MG Rd, Central Business District",
    travelTime: "20 min",
    distance: "1.1 km",
    hasPowerBackup: true,
  },
  {
    slug: "richmond-road",
    title: "ClayWorks Opus",
    address: "Richmond Road, Bengaluru",
    travelTime: "18 min",
    distance: "0.9 km",
    hasPowerBackup: true,
  },
  {
    slug: "basavanagudi",
    title: "ClayWorks Basavanagudi",
    address: "Gandhi Bazaar, Basavanagudi",
    travelTime: "28 min",
    distance: "3.2 km",
    hasPowerBackup: true,
  },
  {
    slug: "koramangala",
    title: "ClayWorks Koramangala",
    address: "80 Feet Road, Koramangala",
    travelTime: "22 min",
    distance: "1.8 km",
    hasPowerBackup: true,
  },
  {
    slug: "kanakapura-rd",
    title: "ClayWorks Kanakapura Rd",
    address: "Kanakapura Main Road",
    travelTime: "40 min",
    distance: "6.5 km",
    hasPowerBackup: true,
  },
  {
    slug: "whitefield",
    title: "ClayWorks Whitefield",
    address: "ITPL Main Road, Whitefield",
    travelTime: "45 min",
    distance: "12.5 km",
    hasPowerBackup: true,
  },
];
