"use client";

import React from "react";
import {
  useLeadModal,
  type OpenModalOptions,
} from "@/components/ModalProvider";

interface OpenModalButtonProps extends OpenModalOptions {
  children: React.ReactNode;
  className?: string;
}

export function OpenModalButton({
  children,
  className,
  mode,
  source,
  tariffId,
}: OpenModalButtonProps) {
  const { openLeadModal } = useLeadModal();

  return (
    <button
      type="button"
      onClick={() => openLeadModal({ mode, source, tariffId })}
      className={className}
    >
      {children}
    </button>
  );
}
