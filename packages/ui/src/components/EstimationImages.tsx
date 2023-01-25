import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Button,
  Pressable,
} from "native-base";
import React, { useState } from "react";
import { TouchableOpacity, ImageSourcePropType } from "react-native";
import { StoryblockAssetContent } from "storyblok-types";

export interface EstimationImagesProps {
  images: StoryblockAssetContent[];
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

interface GalleryImage {
  source: ImageSourcePropType;
  alt: string;
}

interface ImageGalleryProps {
  isOpen: boolean;
  activeImageIndex: number;
  images: GalleryImage[];
  onActiveImageIndexChange?: (activeImageIndex: number) => void;
  onClose?: () => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  activeImageIndex,
  images,
  isOpen,
  onActiveImageIndexChange,
}) => {
  return <Text>My cool gallery</Text>;
};

export const EstimationImages: React.FC<EstimationImagesProps> = ({
  images,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const primaryImage = images[0];
  const secondaryImages = getSecondaryImages(images);
  const additionalImageCount = getAdditionalImageCount(images);

  const handleImagePress = (imageIndex: number) => {
    const image = images[imageIndex];
    if (!image) {
      return;
    }

    setActiveImageIndex(imageIndex);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <VStack space={3} mr={4}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleImagePress(0)}>
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
                  source={{ uri: secondaryImage.filename }}
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

      {activeImageIndex !== null && (
        <ImageGallery
          activeImageIndex={activeImageIndex}
          images={images.map((image) => ({
            source: { uri: image.filename },
            alt: image.alt,
          }))}
          isOpen
          onActiveImageIndexChange={(index) => setActiveImageIndex(index)}
          onClose={() => setActiveImageIndex(null)}
        />
      )}
    </VStack>
  );
};
