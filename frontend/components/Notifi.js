import React, { memo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const fire = (type, text) => {
  if (type === "success") {
    toast.success(text);
  }
  if (type === "info") {
    toast.info(text);
  }
  if (type === "warning") {
    toast.warn(text);
  }
  if (type === "error") {
    toast.error(text);
  }
};
function Notifi() {
  return (
    <>
      <ToastContainer />
    </>
  );
}

export default memo(Notifi);
