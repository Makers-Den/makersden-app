import StoryblokClient from "storyblok-js-client";

import { clientEnvironment } from "../utils/clientEnvironment";

export const storyblokClient = new StoryblokClient({
  accessToken: clientEnvironment.STORYBLOK_ACCESS_TOKEN,
  cache: {
    clear: "auto",
    type: "memory",
  },
});
