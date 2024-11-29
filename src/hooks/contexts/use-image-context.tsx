import { ImageContext } from "@/contexts/image-context";
import { useContext } from "react";

const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};

export default useImageContext;
