import toast, { ToastOptions } from "react-hot-toast";

const useToast = () => {
  const successToast = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      ...options,
      style: {
        background: "#DCFCE7",
      },
    });
  };

  const errorToast = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      ...options,
      style: {
        background: "#FEE2E2",
      },
    });
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
