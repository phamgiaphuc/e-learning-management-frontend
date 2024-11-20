import toast, { ToastOptions } from "react-hot-toast";

const useToast = () => {
  const successToast = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  const errorToast = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  const loadingToast = (message: string, options?: ToastOptions) => {
    return toast.loading(message, options);
  };

  const dismissToast = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  return { successToast, errorToast, loadingToast, dismissToast };
};

export default useToast;
