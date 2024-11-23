import { createContext } from "react";
import { AxiosError } from "axios";
import { ChildrenNodeProps } from "@/types/children";
import useToast from "@/hooks/use-toast";
import { axiosJwt } from "@/configs/axios.config";

type ImageProviderProps = ChildrenNodeProps;

export interface ImageContextProps {
  uploadImage: (image: File) => Promise<{
    imageUrl: string;
  }>;
}

export const ImageContext = createContext<ImageContextProps>({
  uploadImage: async () => ({ imageUrl: "" }),
});

const ImageProvider = ({ children }: ImageProviderProps) => {
  const { successToast, errorToast } = useToast();

  const uploadImage = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const {
        data: { imageUrl },
      } = await axiosJwt.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successToast("Upload image successfully");
      return { imageUrl };
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { message, status, ...rest } = error.response.data;
        errorToast(message);
        console.log(status);
        console.log(rest);
      }
      throw error;
    }
  };

  return (
    <ImageContext.Provider value={{ uploadImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;
