"use client";

import type { ReactNode } from "react";
import { useState } from "react";

interface DownloadButtonProps {
  url: string;
  fileName?: string;
  className?: string;
  children: ReactNode;
}

function inferFileName(url: string, fallback = "dataset") {
  try {
    const parsed = new URL(url, window.location.origin);
    const lastSegment = parsed.pathname.split("/").filter(Boolean).pop();
    if (lastSegment) return decodeURIComponent(lastSegment);
  } catch {
    // Fallback to provided default when URL parsing fails.
  }
  return fallback;
}

function fallbackOpen(url: string, fileName?: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  if (fileName) {
    anchor.download = fileName;
  }
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function DownloadButton({
  url,
  fileName,
  className,
  children,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleClick = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = fileName ?? inferFileName(url);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      // If CORS or network blocks fetch-based download, fallback to browser default behavior.
      fallbackOpen(url, fileName);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      disabled={isDownloading}
    >
      {children}
    </button>
  );
}
