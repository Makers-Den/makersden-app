import { useCallback, useEffect, useMemo, useState } from "react";
import { ISbStoryData } from "storyblok-js-client";

import { clientEnvironment } from "../utils/clientEnvironment";
import { STORYBLOK_RESOLVED_RELATIONS } from "../utils/consts";
import { createNamedLogger } from "../utils/log";
import { storyblokClient } from "./storyblokClient";

const log = createNamedLogger("SB Bridge");

declare global {
  interface Window {
    StoryblokBridge;
  }
}

// appends the bridge script tag to our document
// see https://www.storyblok.com/docs/guide/essentials/visual-editor#installing-the-storyblok-js-bridge
const loadStoryblokBridgeJavascript = (callback: () => void) => {
  // check if the script is already present

  const existingScript = document.getElementById("storyblokBridge");
  if (!existingScript) {
    log.info("Loading storyblock bridge JS bundle");
    const script = document.createElement("script");
    script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
    script.id = "storyblokBridge";
    document.body.appendChild(script);
    script.onload = () => {
      // once the script is loaded, init the event listeners
      callback();
    };
  } else {
    callback();
  }
};

/**
 * TODO: check that originalStory type is correct
 *
 * This hook enables live editing if preview is enabled, in other
 * cases it should just return the originalStory.
 *
 * @param originalStory
 * @param preview
 * @param locale
 * @returns
 */
export const useStoryblok = <StoryDataType extends ISbStoryData>(
  originalStory: StoryDataType,
  preview: boolean,
  locale?: string
): StoryDataType => {
  const [story, setStory] = useState(originalStory);

  const storyContentUid = useMemo(
    () => originalStory?.content?._uid,
    [originalStory]
  );
  // adds the events for updating the visual editor
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#initializing-the-storyblok-js-bridge
  const initEventListeners = useCallback(() => {
    log.debug("Initing storyblok bridge listeners");

    const { StoryblokBridge } = window;
    if (typeof StoryblokBridge === "undefined") {
      log.error("StoryblokBridge not found on window");
      return;
    }

    // initialize the bridge with your token
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Shitty types
    const storyblokInstance = new StoryblokBridge({
      accessToken: clientEnvironment.STORYBLOK_ACCESS_TOKEN,
      resolveRelations: STORYBLOK_RESOLVED_RELATIONS,
      // TODO: hard coded localhost, need to look into what the significance of this was
      // customParent: 'https://localhost:3010/',
      language: locale,
    });

    // reload on Next.js page on save or publish event in the Visual Editor
    storyblokInstance.on(["change", "published"], (event) => {
      log.debug("change or published", event);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore forceReload bool is deprecated and missing from types
      location.reload(true);
    });
    // live update the story on input events
    storyblokInstance.on("input", async (event) => {
      log.debug("input", event);

      // check if the ids of the event and the passed story match, todo:uncomment if

      // if (event.story && event.story.content._uid === storyContentUid) {
      // change the story content through the setStory function
      setStory(event.story);
      //}
    });

    storyblokInstance.on("enterEditmode", (event) => {
      //   // loading the draft version on initial enter of editor
      log.debug("Entering edit mode");
      console.log("event", event);
      //const SECRET='example-company-fsav';
      storyblokClient
        .get(`cdn/stories/${event.storyId}`, {
          version: "draft",
          resolve_relations: STORYBLOK_RESOLVED_RELATIONS,
        })
        .then(async ({ data }) => {
          if (data.story) {
            setStory(data.story);
          }
        })
        .catch((error) => {
          log.error("Caught error loading story on entering edit mode", error);
        });
    });
  }, [locale]);

  useEffect(() => {
    // only load inside preview mode
    if (preview) {
      // first load the bridge, then initialize the event listeners
      loadStoryblokBridgeJavascript(initEventListeners);
    }
  }, [preview, initEventListeners]);

  useEffect(() => {
    setStory(originalStory);
  }, [originalStory]);

  // Ensure we don't return a old story if the original story changed.
  // This is important during client side routing, so we don't get the story of the previous page
  // on render of a new route
  return story?.content?._uid !== storyContentUid ? originalStory : story;
};
