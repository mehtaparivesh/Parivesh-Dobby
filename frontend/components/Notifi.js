import React, { memo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const fire = (type, text) => {
  if (type === "success") {
    toast.success(text);
  } else if (type === "info") {
    toast.info(text);
  } else if (type === "warning") {
    toast.warn(text);
  } else if (type === "error") {
    toast.error(text);
  } else toast(text);
};
function Notifi() {
  return <ToastContainer position="bottom-left" />;
}

export default memo(Notifi);
