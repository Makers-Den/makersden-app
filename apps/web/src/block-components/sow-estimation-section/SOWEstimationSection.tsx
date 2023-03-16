import { SOWEstimationSectionContent } from "@md/storyblok-types";

export const SOWEstimationSection = (props: SOWEstimationSectionContent) => {
  return (
    <section>
      <h1>SOW Estimation Section</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </section>
  );
};
