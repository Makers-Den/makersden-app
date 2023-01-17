import type { EstimationSectionContent } from "./nestableTypes";

export interface EstimationContent {
  _uid?: string;
  title: string;
  sections: EstimationSectionContent[];
  component: "Estimation";
}
