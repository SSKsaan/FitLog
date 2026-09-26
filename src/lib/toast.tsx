"use client";

import type { CSSProperties } from "react";
import { toast, type ToastIcon } from "react-toastify";

function DrawIcon({ d, length }: { d: string; length: number }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
      <path
        d={d}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="toast-draw"
        style={{ "--draw": length } as CSSProperties}
      />
    </svg>
  );
}

export function SuccessIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500">
      <DrawIcon d="M3.5 8.5 6.3 11.3 12.5 4.7" length={15} />
    </span>
  );
}

export function FailedIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500">
      <DrawIcon d="M4.2 4.2 11.8 11.8 M4.2 11.8 11.8 4.2" length={23} />
    </span>
  );
}

const toastStyle = {
  background: "var(--card)",
  color: "var(--foreground)",
  border: "1px solid var(--line)",
  borderRadius: 12,
  fontSize: 14,
  whiteSpace: "nowrap",
  width: "max-content",
  maxWidth: "min(340px, calc(100vw - 32px))",
  marginBottom: 0,
};

export function showToast(message: string, icon: ToastIcon = SuccessIcon) {
  toast(message, { style: toastStyle, icon });
}