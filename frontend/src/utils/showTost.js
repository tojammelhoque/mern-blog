import { toast } from "react-toastify";
export const showTost = (type, message) => {
  const config = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  if (type === "succes") {
    toast.success(message, config);
  } else if (type === "error") {
    toast.error(message, config);
  } else if (type === "info") {
    toast.info(message, config);
  } else if (type === "warning") {
    toast.warning(message, config);
  } else {
    toast(message, config);
  }
};
