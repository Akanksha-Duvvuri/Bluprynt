/**
 * Services rendered on the homepage and (when you build it) the /services
 * page. Plain static config — no DB. If you ever want admin-editable
 * services, this is the file you'd convert to a DB query.
 */

export type Service = {
  /** Two-digit number used as the leader-line label, e.g. "01" */
  n: string;
  title: string;
  /** One-liner shown below the title */
  line: string;
  /** Markets where this service is offered. e.g. "US · IN" or "US" or "IN" */
  region: string;
};

export const SERVICES: readonly Service[] = [
  {
    n: "01",
    title: "Construction Estimating",
    line: "Confirm the project before you commit.",
    region: "US · IN",
  },
  {
    n: "02",
    title: "Quantity takeoffs",
    line: "Numbers that survive contact with the contractor.",
    region: "US · IN",
  },
  {
    n: "03",
    title: "Material counts",
    line: "Catch it now, not at handover.",
    region: "US · IN",
  },
  {
    n: "04",
    title: "Bid-stage cost estimates for concrete",
    line: "MEP, structural, architectural — clashed and cleared.",
    region: "US",
  },
  {
    n: "05",
    title: "Rebar",
    line: "Documents that procure the right contractor.",
    region: "IN",
  },
  {
    n: "06",
    title: "Structural Scopes",
    line: "Documents that procure the right contractor.",
    region: "IN",
  },
] as const;

/**
 * Convenience accessor for the homepage preview. Returns the first N
 * services in declaration order. The homepage shows all six by default.
 */
export function getFeaturedServices(limit = 6): readonly Service[] {
  return SERVICES.slice(0, limit);
}