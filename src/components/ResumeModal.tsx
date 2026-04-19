"use client";

import { X, Download, Maximize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
  name: string;
}

export default function ResumeModal({ isOpen, onClose, resumeUrl, name }: ResumeModalProps) {
  if (!resumeUrl) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-none mb-1">
                    {name}'s Resume
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-white/40 font-medium">Professional Document</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a 
                  href={resumeUrl} 
                  download={`${name.replace(/\s+/g, '_')}_Resume.pdf`}
                  className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-white/60 transition-colors"
                  title="Download Resume"
                >
                  <Download className="w-5 h-5" />
                </a>
                <a 
                  href={resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-white/60 transition-colors"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <div className="w-px h-6 bg-gray-100 dark:bg-white/10 mx-1" />
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-500 dark:text-white/60 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-100 dark:bg-black/20 p-4 md:p-6 overflow-hidden">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-inner relative group">
                <iframe
                  src={`${resumeUrl}#toolbar=0`}
                  className="w-full h-full border-none"
                  title="Resume Preview"
                />
                
                {/* Overlay for mobile or if iframe fails to show nicely */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white/60 text-center">Use the buttons above to download or view full-screen</p>
                </div>
              </div>
            </div>
            
            {/* Footer with quick action */}
            <div className="px-6 py-4 flex justify-between items-center bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10 text-xs text-gray-500 dark:text-white/40">
              <span>Interactive Viewer</span>
              <button 
                onClick={onClose}
                className="font-bold text-blue-500 hover:underline"
              >
                Back to Portfolio
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
