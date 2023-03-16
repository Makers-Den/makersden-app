import { RichTextContentContent } from "@md/storyblok-types";

export const RichTextContent = (props: RichTextContentContent) => {
  return (
    <section>
      <h1>Rich text content</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </section>
  );
};
