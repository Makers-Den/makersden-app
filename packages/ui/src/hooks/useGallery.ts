import { useCallback, useState } from "react";

interface GalleryImage {
  id: string | number;
  url: string;
  alt: string;
}

interface GalleryState {
  images: GalleryImage[];
  initialImageIndex: number | null;
}

export const useGallery = () => {
  const [galleryState, setGalleryState] = useState<GalleryState>({
    initialImageIndex: null,
    images: [],
  });

  const isOpen = galleryState.initialImageIndex !== null;

  const open = useCallback(
    (images: GalleryImage[], initialImageIndex: number) => {
      setGalleryState({ initialImageIndex, images });
    },
    [setGalleryState]
  );

  const close = useCallback(() => {
    setGalleryState({ initialImageIndex: null, images: [] });
  }, [setGalleryState]);

  return {
    initialImageIndex: galleryState.initialImageIndex,
    images: galleryState.images,
    isOpen,
    open,
    close,
  };
};
