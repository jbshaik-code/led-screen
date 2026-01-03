"use client";

import { useEffect } from "react";

/**
 * ErrorHandler component that suppresses known browser extension errors
 * This prevents console pollution from third-party extensions
 */
export default function ErrorHandler() {
  useEffect(() => {
    // Store original error handler
    const originalError = window.console.error;
    const originalWarn = window.console.warn;

    // Filter out known extension errors
    const errorFilter = (...args: any[]) => {
      const errorMessage = args.join(" ");
      
      // Filter out known extension errors
      if (
        errorMessage.includes("antiPhishingManagerCS") ||
        errorMessage.includes("Cannot read properties of null") ||
        errorMessage.includes("hasVisibilityChanged") ||
        errorMessage.includes("isElementVisible") ||
        errorMessage.includes("MutationObserver") ||
        (errorMessage.includes("split") && errorMessage.includes("antiPhishing"))
      ) {
        // Silently ignore extension errors
        return;
      }
      
      // Call original error handler for legitimate errors
      originalError.apply(console, args);
    };

    // Override console.error
    window.console.error = errorFilter as typeof console.error;

    // Also handle unhandled errors
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || "";
      const errorSource = event.filename || "";
      
      // Filter out extension errors
      if (
        errorSource.includes("antiPhishingManagerCS") ||
        errorMessage.includes("antiPhishingManagerCS") ||
        (errorMessage.includes("Cannot read properties of null") && 
         errorMessage.includes("split"))
      ) {
        event.preventDefault();
        return false;
      }
    };

    // Also handle unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.toString() || "";
      
      // Filter out extension-related rejections
      if (reason.includes("antiPhishingManagerCS")) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    // Cleanup
    return () => {
      window.console.error = originalError;
      window.console.warn = originalWarn;
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}

