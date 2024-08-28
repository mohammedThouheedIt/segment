import { toast, Slide, Flip } from "react-toastify";

export const successMessage = (title) => {
  toast.success(title, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const errorMessage = (title) => {
  toast.error(title, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const infoMessage = (title) => {
  toast.info(title, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    transition: Slide,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const pushNotification = (title) => {
  toast.info(title, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
  });
};
