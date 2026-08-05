"use client";

import { Download } from 'lucide-react';
import React from 'react';

interface DownloadLinkProps {
  className?: string;
  children: React.ReactNode;
}

export function DownloadLink({ className, children }: DownloadLinkProps) {
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/KarkTech_Master_Document.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'KarkTech_Master_Document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <button onClick={handleDownload} className={className}>
      {children}
    </button>
  );
}
