"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = typeof window !== "undefined" ? localStorage.getItem("karktech_cookie_consent") : null;
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("karktech_cookie_consent", "accepted");
    }
    setVisible(false);
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("karktech_cookie_consent", "declined");
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="p-5 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-card)] shadow-2xl backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <span className="text-xl">🍪</span>
          <div className="flex-1 text-xs text-[var(--text-secondary)] leading-relaxed">
            <strong className="text-[var(--text-primary)] block mb-1">हामी कुकीज प्रयोग गर्छौं</strong>
            हामी तपाईंको अनुभव सुधार गर्न र साइट ट्राफिक विश्लेषण गर्न कुकीहरू प्रयोग गर्छौं। थप जानकारीका लागि{" "}
            <Link href="/cookie-policy" className="text-[var(--accent-gold)] underline hover:opacity-80">
              Cookie Policy
            </Link>{" "}
            हेर्नुहोस्।
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2.5">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 text-xs font-medium rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[var(--text-primary)] text-[var(--bg-base)] hover:opacity-90 transition-opacity shadow-xs"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
