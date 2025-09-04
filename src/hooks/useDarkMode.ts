import { useState, useEffect } from 'react';

/**
 * Custom hook to manage and track the dark mode state of the document.
 * It listens for changes to the 'dark' class on the document's root element (<html>).
 *
 * @returns {boolean} `true` if dark mode is active, `false` otherwise.
 */
export function useDarkMode(): boolean {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state based on current document class to avoid hydration mismatches
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains("dark");
    }
    return false; // Default to false if document is not available (e.g., SSR)
  });

  useEffect(() => {
    if (typeof document === 'undefined') {
      return; // Do nothing if document is not available
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    // Observe changes to the 'class' attribute on the document's root element
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Cleanup the observer when the component unmounts
    return () => observer.disconnect();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return isDarkMode;
}