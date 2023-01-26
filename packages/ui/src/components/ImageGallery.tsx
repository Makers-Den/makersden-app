import { Box, Image } from "native-base";
import React from "react";
import { Modal, ImageSourcePropType } from "react-native";
import Swiper from "react-native-web-swiper";
import { ImageGalleryButton } from "./ImageGalleryButton";

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
          NextComponent: (({ onPress }: any) => (
            <ImageGalleryButton onPress={onPress} text=">" />
          )) as any,
          PrevComponent: (({ onPress }: any) => (
            <ImageGalleryButton onPress={onPress} text="<" />
          )) as any,
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
        <ImageGalleryButton onPress={onClose} text="X" />
      </Box>
    </Modal>
  );
};
