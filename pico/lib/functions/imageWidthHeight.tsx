import { imageSize } from "@/templates/Album";

export const getImageWidthandHeight = (file: File): Promise<imageSize> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // Set up an onload handler to resolve the promise once the image loads
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    // Set up an onerror handler to reject the promise if there's an error loading the image
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Start loading the image
    img.src = URL.createObjectURL(file);
  });
};
