import { Button, IButtonProps } from "native-base";
import React, { PropsWithChildren } from "react";

export type ImageGalleryButtonProps = PropsWithChildren &
  IButtonProps & {
    onPress?: () => void;
  };

export const ImageGalleryButton = ({
  children,
  onPress,
  ...props
}: ImageGalleryButtonProps) => {
  return (
    <Button width="8" size="sm" onPress={onPress} {...props}>
      {children}
    </Button>
  );
};
