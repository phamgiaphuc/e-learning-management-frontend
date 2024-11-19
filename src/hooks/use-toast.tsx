import { toast, ToastOptions } from "react-hot-toast";

const useToast = () => {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  const loading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, options);
  };

  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  return { success, error, loading, dismiss };
};

export default useToast;
