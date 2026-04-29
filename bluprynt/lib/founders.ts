/**
 * Founders — owner-editable.
 * Replace placeholder copy with real bios when ready.
 */

export interface Credential {
  k: string;
  v: string;
}

export interface Founder {
  initials: string;          // displayed in placeholder photo
  name: string;
  role: string;
  bio: string;               // 3–5 sentences
  longBio: string;           // longer version for /about page
  credentials: Credential[];
  linkedin?: string;
  email?: string;
}

export const FOUNDERS: Founder[] = [
  {
    initials: "F1",
    name: "Founder One",
    role: "Principal · Structural",
    bio: "Twelve years across high-rise residential, civic infrastructure, and post-tensioning. Worked on three IFC-funded transit programs before founding the firm.",
    longBio:
      "Founder One has twelve years of experience as a practising structural engineer, focused on residential high-rise, civic infrastructure, and post-tensioned concrete. Before co-founding Bluprynt, they led structural design on a transit program funded by the IFC and were the technical lead on two podium-tower developments. They are a Chartered Structural Engineer and have peer-reviewed projects in three jurisdictions. Their interest in pre-consulting work comes from years of watching avoidable cost overruns trace back to decisions taken before the first drawing was issued.",
    credentials: [
      { k: "Degree", v: "M.Eng · IIT" },
      { k: "Licence", v: "P.Eng / Chartered" },
      { k: "Software", v: "ETABS · SAFE · SAP2000" },
      { k: "Member", v: "ICE · IStructE" },
    ],
    linkedin: "https://linkedin.com/in/founder-one",
  },
  {
    initials: "F2",
    name: "Founder Two",
    role: "Principal · Civil",
    bio: "A decade in coastal and water infrastructure across two continents. Specialises in feasibility, scope-to-cost translation, and owner-side technical strategy.",
    longBio:
      "Founder Two has a decade of experience in coastal, marine, and water infrastructure across Europe and South-East Asia. Before co-founding Bluprynt, they led feasibility and concept-design teams at two international consultancies, including projects funded by the World Bank and the ADB. Their work specialises in translating engineering scope into cost and schedule honestly — including delivering uncomfortable conclusions to clients who would have preferred a different answer. They hold a Master's in Coastal Engineering from TU Delft.",
    credentials: [
      { k: "Degree", v: "M.Sc · TU Delft" },
      { k: "Licence", v: "PMP · CEng" },
      { k: "Software", v: "Civil 3D · Revit · MIKE" },
      { k: "Member", v: "ICE · PIANC" },
    ],
    linkedin: "https://linkedin.com/in/founder-two",
  },
];