import { StoryblockRichTextContent } from "./internalTypes";
import type { EstimationSectionContent } from "./nestableTypes";

export interface EstimationContent {
  _uid?: string;
  title: string;
  organization: string;
  description: StoryblockRichTextContent;
  secret: string;
  sections: EstimationSectionContent[];
  component: "Estimation";
}
