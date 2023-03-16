import { BlockComponent } from "@md/storyblok-types";
import { ISbComponentType } from "storyblok-js-client";
import SbEditable from "storyblok-react";

type Props<T extends string> = { [key: string]: unknown } & {
  content: ISbComponentType<T>;
};

/**
 * Created a BlockComponentRenderer which will take the storyblok content and render the
 * respective block component.
 */
export const createBlockComponentRenderer =
  <T extends string>(typeToBlockComponent: {
    [key in T]: BlockComponent;
  }) =>
  ({ content, ...restProps }: Props<T>) => {
    // check if component is defined above
    if (typeof typeToBlockComponent[content.component] !== "undefined") {
      const Component = typeToBlockComponent[
        content.component
      ] as BlockComponent;
      const props = content;

      // wrap with SbEditable for visual editing
      return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Storyblok types are terrible
        <SbEditable content={content}>
          <Component {...props} {...restProps} />
        </SbEditable>
      );
    }

    // fallback if the component doesn't exist
    return (
      <div>
        The component <strong>{content.component}</strong> has not been created
        yet.
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </div>
    );
  };
