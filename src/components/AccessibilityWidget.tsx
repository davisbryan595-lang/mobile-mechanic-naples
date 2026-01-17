import React, { useState, useEffect, useRef } from "react";
import { Settings, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessibilitySettings {
  highContrast: boolean;
  boldText: boolean;
  underlineLinks: boolean;
  enhanceTextDecoration: boolean;
  reduceMotion: boolean;
  screenReaderMode: boolean;
  focusIndicatorStrength: "normal" | "strong" | "very-strong";
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  boldText: false,
  underlineLinks: false,
  enhanceTextDecoration: false,
  reduceMotion: false,
  screenReaderMode: false,
  focusIndicatorStrength: "normal",
};

const STORAGE_KEY = "a11y-settings";

export const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isMounted, setIsMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        applySettings(parsed);
      } catch (e) {
        console.error("Failed to load accessibility settings:", e);
      }
    }
  }, []);

  // Apply all accessibility settings to the DOM
  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    const body = document.body;

    // High Contrast Mode
    if (newSettings.highContrast) {
      root.classList.add("a11y-high-contrast");
    } else {
      root.classList.remove("a11y-high-contrast");
    }

    // Bold Text
    if (newSettings.boldText) {
      root.classList.add("a11y-bold-text");
    } else {
      root.classList.remove("a11y-bold-text");
    }

    // Underline Links
    if (newSettings.underlineLinks) {
      root.classList.add("a11y-underline-links");
    } else {
      root.classList.remove("a11y-underline-links");
    }

    // Enhance Text Decoration
    if (newSettings.enhanceTextDecoration) {
      root.classList.add("a11y-enhance-text");
    } else {
      root.classList.remove("a11y-enhance-text");
    }

    // Reduce Motion
    if (newSettings.reduceMotion) {
      root.classList.add("a11y-reduce-motion");
    } else {
      root.classList.remove("a11y-reduce-motion");
    }

    // Screen Reader Mode - Add ARIA attributes
    if (newSettings.screenReaderMode) {
      root.classList.add("a11y-screen-reader");
      // Add ARIA attributes to main content
      const main = document.querySelector("main");
      if (main && !main.hasAttribute("role")) {
        main.setAttribute("role", "main");
      }
      // Ensure nav has proper role
      const nav = document.querySelector("nav");
      if (nav && !nav.hasAttribute("role")) {
        nav.setAttribute("role", "navigation");
      }
    } else {
      root.classList.remove("a11y-screen-reader");
    }

    // Focus Indicator Strength
    root.classList.remove("a11y-focus-normal", "a11y-focus-strong", "a11y-focus-very-strong");
    root.classList.add(`a11y-focus-${newSettings.focusIndicatorStrength}`);
  };

  // Handle setting changes
  const updateSetting = (key: keyof AccessibilitySettings, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  };

  // Reset to default settings
  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    applySettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);

    // Remove all a11y classes
    const root = document.documentElement;
    const classesToRemove = Array.from(root.classList).filter((cls) =>
      cls.startsWith("a11y-"),
    );
    classesToRemove.forEach((cls) => root.classList.remove(cls));
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Accessibility Panel */}
      {isOpen && (
        <>
          {/* Backdrop - Mobile only */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto md:hidden"
            onClick={() => setIsOpen(false)}
            role="presentation"
            aria-hidden="true"
          />

          {/* Panel Container */}
          <div
            ref={panelRef}
            className="absolute left-0 bottom-0 top-0 md:left-auto md:bottom-6 md:top-auto pointer-events-auto"
            style={{
              animation: "slideInAccessibility 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              width: "100%",
              maxWidth: "100%",
              height: "100%",
            }}
            role="dialog"
            aria-labelledby="a11y-title"
            aria-modal="true"
          >
            <div className="md:rounded-2xl h-full md:h-auto md:w-96 bg-[#0f172a] flex flex-col border border-gray-700 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-[#020617] border-b border-gray-700 px-6 py-5 flex items-center justify-between flex-shrink-0">
                <h2
                  id="a11y-title"
                  className="font-orbitron font-bold text-lg text-white"
                >
                  Accessibility Settings
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                  aria-label="Close accessibility settings"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-[#f97316]/30 scrollbar-track-transparent">
                {/* High Contrast Mode */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="high-contrast" className="text-sm font-medium text-gray-200">
                      High Contrast Mode
                    </label>
                    <button
                      id="high-contrast"
                      onClick={() =>
                        updateSetting("highContrast", !settings.highContrast)
                      }
                      className={cn(
                        "relative inline-flex items-center h-7 w-14 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a]",
                        settings.highContrast
                          ? "bg-[#f97316] focus:ring-[#f97316]"
                          : "bg-gray-700 focus:ring-gray-600",
                      )}
                      role="switch"
                      aria-checked={settings.highContrast}
                      aria-label="Toggle high contrast mode"
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
                          settings.highContrast ? "translate-x-7" : "translate-x-1",
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Dramatically increase contrast for better visibility
                  </p>
                </div>

                {/* Bold Text */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="bold-text" className="text-sm font-medium text-gray-200">
                      Bold Text
                    </label>
                    <button
                      id="bold-text"
                      onClick={() =>
                        updateSetting("boldText", !settings.boldText)
                      }
                      className={cn(
                        "relative inline-flex items-center h-7 w-14 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a]",
                        settings.boldText
                          ? "bg-[#f97316] focus:ring-[#f97316]"
                          : "bg-gray-700 focus:ring-gray-600",
                      )}
                      role="switch"
                      aria-checked={settings.boldText}
                      aria-label="Toggle bold text"
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
                          settings.boldText ? "translate-x-7" : "translate-x-1",
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Make all text bold for easier reading
                  </p>
                </div>

                {/* Underline Links */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="underline-links" className="text-sm font-medium text-gray-200">
                      Underline Links
                    </label>
                    <button
                      id="underline-links"
                      onClick={() =>
                        updateSetting("underlineLinks", !settings.underlineLinks)
                      }
                      className={cn(
                        "relative inline-flex items-center h-7 w-14 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a]",
                        settings.underlineLinks
                          ? "bg-[#f97316] focus:ring-[#f97316]"
                          : "bg-gray-700 focus:ring-gray-600",
                      )}
                      role="switch"
                      aria-checked={settings.underlineLinks}
                      aria-label="Toggle underline links"
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
                          settings.underlineLinks ? "translate-x-7" : "translate-x-1",
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Add orange underlines to all links
                  </p>
                </div>

                {/* Enhance Text Decoration */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="enhance-text-decoration"
                      className="text-sm font-medium text-gray-200"
                    >
                      Enhance Text Decoration
                    </label>
                    <button
                      id="enhance-text-decoration"
                      onClick={() =>
                        updateSetting(
                          "enhanceTextDecoration",
                          !settings.enhanceTextDecoration,
                        )
                      }
                      className={cn(
                        "relative inline-flex items-center h-7 w-14 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a]",
                        settings.enhanceTextDecoration
                          ? "bg-[#f97316] focus:ring-[#f97316]"
                          : "bg-gray-700 focus:ring-gray-600",
                      )}
                      role="switch"
                      aria-checked={settings.enhanceTextDecoration}
                      aria-label="Toggle enhance text decoration"
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
                          settings.enhanceTextDecoration
                            ? "translate-x-7"
                            : "translate-x-1",
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Add orange shadows and glows to headings and buttons
                  </p>
                </div>

                {/* Reduce Motion */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="reduce-motion" className="text-sm font-medium text-gray-200">
                      Reduce Motion
                    </label>
                    <button
                      id="reduce-motion"
                      onClick={() =>
                        updateSetting("reduceMotion", !settings.reduceMotion)
                      }
                      className={cn(
                        "relative inline-flex items-center h-7 w-14 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a]",
                        settings.reduceMotion
                          ? "bg-[#f97316] focus:ring-[#f97316]"
                          : "bg-gray-700 focus:ring-gray-600",
                      )}
                      role="switch"
                      aria-checked={settings.reduceMotion}
                      aria-label="Toggle reduce motion"
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
                          settings.reduceMotion ? "translate-x-7" : "translate-x-1",
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Disable animations and transitions
                  </p>
                </div>

                {/* Screen Reader Mode */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="screen-reader" className="text-sm font-medium text-gray-200">
                      Screen Reader Mode
                    </label>
                    <button
                      id="screen-reader"
                      onClick={() =>
                        updateSetting(
                          "screenReaderMode",
                          !settings.screenReaderMode,
                        )
                      }
                      className={cn(
                        "relative inline-flex items-center h-7 w-14 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a]",
                        settings.screenReaderMode
                          ? "bg-[#f97316] focus:ring-[#f97316]"
                          : "bg-gray-700 focus:ring-gray-600",
                      )}
                      role="switch"
                      aria-checked={settings.screenReaderMode}
                      aria-label="Toggle screen reader mode"
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
                          settings.screenReaderMode ? "translate-x-7" : "translate-x-1",
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Optimize for screen readers with enhanced ARIA attributes
                  </p>
                </div>

                {/* Focus Indicator Strength */}
                <div className="space-y-2">
                  <label
                    htmlFor="focus-strength"
                    className="text-sm font-medium text-gray-200 block"
                  >
                    Focus Indicator Strength
                  </label>
                  <select
                    id="focus-strength"
                    value={settings.focusIndicatorStrength}
                    onChange={(e) =>
                      updateSetting(
                        "focusIndicatorStrength",
                        e.target.value as "normal" | "strong" | "very-strong",
                      )
                    }
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 hover:border-gray-500 focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/30 transition-all"
                    aria-label="Select focus indicator strength"
                  >
                    <option value="normal">Normal</option>
                    <option value="strong">Strong</option>
                    <option value="very-strong">Very Strong</option>
                  </select>
                  <p className="text-xs text-gray-400">
                    Adjust the visibility of keyboard focus indicators
                  </p>
                </div>

                {/* Info Note */}
                <div className="border border-gray-600 bg-gray-800/30 rounded-lg px-4 py-3 mt-6">
                  <p className="text-xs text-gray-300">
                    💾 Your accessibility preferences are saved automatically and
                    will be remembered on your next visit.
                  </p>
                </div>
              </div>

              {/* Footer with Reset Button */}
              <div className="border-t border-gray-700 bg-[#020617] px-6 py-4 flex-shrink-0">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#f97316] to-orange-500 hover:from-[#ea580c] hover:to-orange-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#020617] flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30"
                  aria-label="Reset all accessibility settings to default"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className="absolute bottom-6 left-4 md:left-6 pointer-events-auto bg-gradient-to-br from-[#f97316] to-orange-500 hover:from-[#ea580c] hover:to-orange-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-xl hover:shadow-orange-500/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-110 active:scale-95"
          aria-label="Open accessibility settings"
          aria-expanded={isOpen}
        >
          <Settings className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </button>
      )}

      {/* Global Accessibility Styles */}
      <style>{`
        /* High Contrast Mode */
        :root.a11y-high-contrast {
          --background: 0 0% 0%;
          --foreground: 0 0% 100%;
          --card: 0 0% 0%;
          --card-foreground: 0 0% 100%;
          --primary: 30 100% 50%;
          --accent: 30 100% 50%;
        }

        .a11y-high-contrast {
          background-color: #000000 !important;
          color: #ffffff !important;
        }

        .a11y-high-contrast a {
          color: #f97316 !important;
        }

        .a11y-high-contrast button,
        .a11y-high-contrast [role="button"] {
          border: 2px solid #f97316 !important;
        }

        /* Bold Text */
        .a11y-bold-text,
        .a11y-bold-text * {
          font-weight: 700 !important;
        }

        /* Underline Links */
        .a11y-underline-links a {
          text-decoration: underline !important;
          text-decoration-color: #f97316 !important;
          text-decoration-thickness: 2px !important;
          text-underline-offset: 4px !important;
        }

        /* Enhance Text Decoration */
        .a11y-enhance-text h1,
        .a11y-enhance-text h2,
        .a11y-enhance-text h3,
        .a11y-enhance-text h4,
        .a11y-enhance-text h5,
        .a11y-enhance-text h6 {
          text-shadow: 0 0 10px rgba(249, 115, 22, 0.6) !important;
        }

        .a11y-enhance-text button,
        .a11y-enhance-text [role="button"] {
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.5) !important;
        }

        .a11y-enhance-text input,
        .a11y-enhance-text textarea,
        .a11y-enhance-text select {
          box-shadow: 0 0 12px rgba(249, 115, 22, 0.4) !important;
        }

        /* Reduce Motion */
        .a11y-reduce-motion *,
        .a11y-reduce-motion *::before,
        .a11y-reduce-motion *::after {
          animation: none !important;
          transition: none !important;
        }

        /* Screen Reader Mode - Enhanced ARIA handling */
        .a11y-screen-reader [aria-hidden="false"] {
          visibility: visible !important;
        }

        .a11y-screen-reader nav,
        .a11y-screen-reader main,
        .a11y-screen-reader [role="main"],
        .a11y-screen-reader [role="navigation"] {
          outline: 2px dashed rgba(249, 115, 22, 0.3) !important;
          outline-offset: 2px !important;
        }

        /* Focus Indicator - Normal */
        .a11y-focus-normal *:focus-visible {
          outline: 2px solid hsl(var(--ring)) !important;
          outline-offset: 2px !important;
        }

        /* Focus Indicator - Strong */
        .a11y-focus-strong *:focus-visible {
          outline: 4px solid #f97316 !important;
          outline-offset: 3px !important;
        }

        /* Focus Indicator - Very Strong */
        .a11y-focus-very-strong *:focus-visible {
          outline: 6px solid #f97316 !important;
          outline-offset: 4px !important;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.8) !important;
        }

        /* Scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(249, 115, 22, 0.3);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(249, 115, 22, 0.5);
        }

        /* Panel slide animation */
        @keyframes slideInAccessibility {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .a11y-widget-panel {
            width: 100%;
            height: 100vh;
          }
        }
      `}</style>
    </div>
  );
};
