import { BlockComponent, ComponentBlockType } from "@md/storyblok-types";

import { createBlockComponentRenderer } from "./createBlockComponentRenderer";
import { PageBreak } from "./page-break/PageBreak";
import { RichTextContent } from "./rich-text-content/RichTextContent";
import { SoWEstimationSection } from "./sow-estimation-section/SoWEstimationSection";

/**
 * Resolves Storyblok blocks to our block-components
 */
const typeToBlockComponent: {
  [key in ComponentBlockType]: BlockComponent;
} = {
  RichTextContent: RichTextContent,
  SoWEstimationSection: SoWEstimationSection,
  PageBreak: PageBreak,
};

/** Our default BlockComponentRenderer that corresponds to sections rendered in page body */
export const BlockComponentRenderer =
  createBlockComponentRenderer(typeToBlockComponent);
