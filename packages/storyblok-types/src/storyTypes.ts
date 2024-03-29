import { ISbComponentType, ISbStoryData } from "storyblok-js-client";

import { ComponentBlockType } from "./nestableTypes";

/**
 * The `body` of a page is a list of blocks, corresponding to the
 * block-components.
 */
export type Body = ISbComponentType<ComponentBlockType>[];

type RegularPageContent = {
  body?: Body;
};

/** Type def for the 'Page' component content-type in Storyblok */
export type RegularPageStory = ISbStoryData<
  ISbComponentType<"Page"> & RegularPageContent
>;

type SoWPageContent = {
  title: string;
  subTitle: string;
  author: string;
  date: string;
  body?: Body;
};

/** Type def for the 'SoW' component content-type in Storyblok */
export type SowPageStory = ISbStoryData<
  ISbComponentType<"SoW"> & SoWPageContent
>;

/**
 * This type corresponds to the possible top level stories
 * (Storyblok components tagged "Content Type" like Page) fetched from Storyblok.
 */
export type PageStory = RegularPageStory | SowPageStory;
