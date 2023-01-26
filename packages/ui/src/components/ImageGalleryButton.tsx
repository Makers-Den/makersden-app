import { Button } from "native-base";
import React, { PropsWithChildren } from "react";

export interface ImageGalleryButtonProps extends PropsWithChildren {
  text: string;
  onPress?: () => void;
}

export const ImageGalleryButton: React.FC<ImageGalleryButtonProps> = ({
  text,
  onPress,
}) => {
  return (
    <Button width="8" size="sm" onPress={onPress}>
      {text}
    </Button>
  );
};
