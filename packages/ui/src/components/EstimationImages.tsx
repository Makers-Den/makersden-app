import { StoryblockAssetContent } from "@md/storyblok-types";
import { Box, Flex, HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

export interface EstimationImagesProps {
  images: StoryblockAssetContent[];
  onImageClick?: (imageIndex: number) => void;
}

const SECONDARY_IMAGE_COUNT = 2;

const getSecondaryImages = (images: StoryblockAssetContent[]) => {
  const secondaryImages: StoryblockAssetContent[] = [];

  for (let i = 1; i < 1 + SECONDARY_IMAGE_COUNT; i += 1) {
    if (images[i]) {
      secondaryImages.push(images[i]);
    }
  }

  return secondaryImages;
};

const getAdditionalImageCount = (images: StoryblockAssetContent[]) =>
  Math.max(images.length - 1 - SECONDARY_IMAGE_COUNT, 0);

export const EstimationImages = ({
  images,
  onImageClick,
}: EstimationImagesProps) => {
  const primaryImage = images[0];
  const secondaryImages = getSecondaryImages(images);
  const additionalImageCount = getAdditionalImageCount(images);

  const handleImagePress = (imageIndex: number) => {
    const image = images[imageIndex];
    if (!image) {
      return;
    }

    onImageClick?.(imageIndex);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <Flex alignItems="center">
      <VStack space={3} minHeight="1px" width="120px">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleImagePress(0)}
        >
          <Image
            source={{ uri: primaryImage.filename }}
            alt={primaryImage.alt}
            width="120px"
            height="80px"
            resizeMode="cover"
            borderRadius="sm"
          />
        </TouchableOpacity>

        {secondaryImages.length > 0 && (
          <HStack alignItems="center" justifyContent="space-between">
            <HStack space={3}>
              {secondaryImages.map((secondaryImage, index) => (
                <TouchableOpacity
                  key={secondaryImage.id}
                  activeOpacity={0.8}
                  onPress={() => handleImagePress(1 + index)}
                >
                  <Image
                    source={{
                      uri: secondaryImage.filename,
                    }}
                    alt={secondaryImage.alt}
                    width="40px"
                    height="30px"
                    resizeMode="cover"
                    borderRadius="sm"
                  />
                </TouchableOpacity>
              ))}
            </HStack>
            <Box>
              {additionalImageCount > 0 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleImagePress(1 + SECONDARY_IMAGE_COUNT)}
                >
                  <Text>+{additionalImageCount}</Text>
                </TouchableOpacity>
              )}
            </Box>
          </HStack>
        )}
      </VStack>
    </Flex>
  );
};
