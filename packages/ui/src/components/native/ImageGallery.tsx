import { Box, Image, Pressable } from "native-base";
import React from "react";
import { ImageSourcePropType, Modal } from "react-native";
import Swiper from "react-native-web-swiper";

import { ImageGalleryButton } from "../ImageGalleryButton";
import { CaretLeftIcon } from "./icons/CaretLeftIcon";
import { CaretRightIcon } from "./icons/CaretRightIcon";
import { CloseIcon } from "./icons/CloseIcon";

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

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  initialImageIndex,
  images,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <Swiper
        from={initialImageIndex}
        minDistanceForAction={0.1}
        springConfig={{
          bounciness: 0,
        }}
        controlsProps={{
          dotsTouchable: true,
          prevPos: "left",
          nextPos: "right",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          NextComponent: (({ onPress }: any) => (
            <ImageGalleryButton onPress={onPress}>
              <CaretRightIcon />
            </ImageGalleryButton>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          )) as any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          PrevComponent: (({ onPress }: any) => (
            <ImageGalleryButton onPress={onPress}>
              <CaretLeftIcon />
            </ImageGalleryButton>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          )) as any,
          DotComponent: ({ isActive, onPress }) => (
            <Pressable px={1} mb={4} onPress={onPress}>
              <Box
                w={3}
                h={3}
                borderRadius="full"
                background={isActive ? "green.400" : "gray.400"}
              />
            </Pressable>
          ),
        }}
      >
        {images.map((image) => (
          <Image
            key={image.id}
            source={image.source}
            alt={image.alt}
            width="100%"
            height="100%"
            resizeMode="contain"
            background="black.200"
          />
        ))}
      </Swiper>
      <Box position="absolute" top="6" right="4" safeArea>
        <ImageGalleryButton onPress={onClose} backgroundColor="none">
          <CloseIcon />
        </ImageGalleryButton>
      </Box>
    </Modal>
  );
};
