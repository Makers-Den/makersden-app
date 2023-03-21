import { SoWEstimationSectionContent } from "@md/storyblok-types";
import { EstimationRowContent } from "@md/ui/src/components/EstimationRowContent";
import { EstimationRowHeader } from "@md/ui/src/components/EstimationRowHeader";
import { EstimationsSectionHeader } from "@md/ui/src/components/EstimationsSectionHeader";
import { ImageGallery } from "@md/ui/src/components/web/ImageGallery";
import { useGallery } from "@md/ui/src/hooks/useGallery";
import { useMapEstimationData } from "@md/ui/src/utils/useMapEstimationData";
import { Box, Divider, Text } from "native-base";

export const SoWEstimationSection = ({
  estimation,
}: SoWEstimationSectionContent) => {
  const gallery = useGallery();
  const { sections, sumOfExpectedDays } = useMapEstimationData(estimation);

  return (
    <Box my="2">
      {sections.map((section, sectionIndex) => (
        <div key={section.key}>
          <Box mt={sectionIndex === 0 ? 0 : 4}>
            <EstimationsSectionHeader
              title={section.title}
              listIndex={section.listIndex}
              expectedDays={section.expectedDays}
              nominalDays={section.nominalDays}
              optimisticDays={section.optimisticDays}
              pessimisticDays={section.pessimisticDays}
              variant="sow"
            />
          </Box>

          {section.rows.map((row, rowIndex) => (
            <div key={row.key}>
              <EstimationRowHeader
                expectedDays={row.expectedDays}
                order={row.listIndex}
                text={row.task}
                isIncluded={row.isIncluded}
                variant="sow"
                wrapperProps={{
                  px: 4,
                }}
              />

              <EstimationRowContent
                description={row.description}
                images={row.images}
                wrapperProps={{ px: 4 }}
                variant="sow"
                onImageClick={(imageIndex) => {
                  gallery.open(
                    row.images.map((image) => ({
                      alt: image.alt,
                      id: image.id,
                      url: image.filename,
                    })),
                    imageIndex
                  );
                }}
              />

              {rowIndex !== section.rows.length - 1 && (
                <Box opacity="0.2">
                  <Divider bg="gray.700" />
                </Box>
              )}
            </div>
          ))}
        </div>
      ))}

      <Text color="black" fontSize="md" mt="3">
        The expected work time according to estimates is&nbsp;
        <Text fontWeight="bold">{sumOfExpectedDays} work days</Text>.
      </Text>

      <ImageGallery
        initialImageIndex={gallery.initialImageIndex ?? 0}
        isOpen={gallery.isOpen}
        images={gallery.images.map((image) => ({
          alt: image.alt,
          source: { uri: image.url },
          id: image.id,
        }))}
        onClose={gallery.close}
      />
    </Box>
  );
};
