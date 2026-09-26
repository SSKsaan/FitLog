"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toaster() {
  return (
    <ToastContainer
      position="top-right"
      style={{ top: "var(--toast-top)" }}
      autoClose={2200}
      newestOnTop
      limit={4}
      closeButton={false}
      hideProgressBar
    />
  );
}