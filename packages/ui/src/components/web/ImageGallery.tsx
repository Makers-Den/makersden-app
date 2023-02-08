import { Box, HStack, Image, Pressable } from "native-base";
import Carousel from "nuka-carousel";
import React, { useEffect, useState } from "react";
import { ImageSourcePropType, Modal } from "react-native";

import { ImageGalleryButton } from "../ImageGalleryButton";

interface GalleryImage {
  id: string | number;
  alt: string;
  source: ImageSourcePropType;
}

export interface ImageGalleryProps {
  isOpen: boolean;
  images: GalleryImage[];
  initialImageIndex: number;
  onClose?: () => void;
}

export const ImageGallery = ({
  isOpen,
  images,
  initialImageIndex,
  onClose,
}: ImageGalleryProps) => {
  const [slideIndex, setSlideIndex] = useState(initialImageIndex);

  useEffect(() => {
    if (isOpen) {
      setSlideIndex(initialImageIndex);
    }
  }, [isOpen, initialImageIndex]);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <Box background="black.200">
        <Box maxW="2xl" width="100%" marginX="auto" position="relative">
          <Carousel
            slideIndex={slideIndex}
            renderCenterLeftControls={({ previousSlide, previousDisabled }) =>
              previousDisabled ? null : (
                <Box ml={2}>
                  <ImageGalleryButton onPress={previousSlide} text="<" />
                </Box>
              )
            }
            renderCenterRightControls={({ nextSlide, nextDisabled }) =>
              nextDisabled ? null : (
                <Box mr={2}>
                  <ImageGalleryButton onPress={nextSlide} text=">" />
                </Box>
              )
            }
            renderBottomCenterControls={({ currentSlide, goToSlide }) => (
              <HStack space={2}>
                {images.map((image, index) => (
                  <Pressable
                    key={image.id}
                    w={3}
                    h={3}
                    borderRadius="full"
                    onPress={() => goToSlide(index)}
                    background={
                      currentSlide === index ? "green.400" : "gray.400"
                    }
                    mb={4}
                  />
                ))}
              </HStack>
            )}
          >
            {images.map((image) => (
              <Box key={image.id}>
                <Image
                  source={image.source}
                  alt={image.alt}
                  width="100%"
                  height="100vh"
                  resizeMode="contain"
                  background="black.200"
                  marginX="auto"
                />
              </Box>
            ))}
          </Carousel>

          <Box position="absolute" top={6} right={2} safeArea>
            <ImageGalleryButton onPress={onClose} text="X" />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
