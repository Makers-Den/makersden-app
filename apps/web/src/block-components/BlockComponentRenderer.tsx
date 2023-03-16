import { BlockComponent, ComponentBlockType } from "@md/storyblok-types";

import { createBlockComponentRenderer } from "./createBlockComponentRenderer";
import { RichTextContent } from "./rich-text-content/RichTextContent";
import { SOWEstimationSection } from "./sow-estimation-section/SOWEstimationSection";

/**
 * Resolves Storyblok blocks to our block-components
 */
const typeToBlockComponent: {
  [key in ComponentBlockType]: BlockComponent;
} = {
  RichTextContent: RichTextContent,
  SOWEstimationSection: SOWEstimationSection,
};

/** Our default BlockComponentRenderer that corresponds to sections rendered in page body */
export const BlockComponentRenderer =
  createBlockComponentRenderer(typeToBlockComponent);
