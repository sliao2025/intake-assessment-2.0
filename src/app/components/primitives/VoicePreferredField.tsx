import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

type Props = {
  voiceRecorder: React.ReactNode;
  textArea: React.ReactNode;
  hasTextValue?: boolean;
};

export default function VoicePreferredField({
  voiceRecorder,
  textArea,
  hasTextValue = false,
}: Props) {
  const [isTextOpen, setIsTextOpen] = useState(hasTextValue);

  // If text value becomes present (e.g. loaded from DB), open it
  useEffect(() => {
    if (hasTextValue) {
      setIsTextOpen(true);
    }
  }, [hasTextValue]);

  return (
    <div className={`space-y-3 ${dm_sans.className}`}>
      <div className="relative z-10">{voiceRecorder}</div>

      <div className="flex flex-col">
        {!isTextOpen ? (
          <button
            onClick={() => setIsTextOpen(true)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors self-start ml-1"
          >
            <span>or type here in your own words...</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                {textArea}
                {/* Optional: Allow hiding it again if it's empty, or always? 
                     If they have text, maybe they shouldn't hide it easily or it doesn't matter.
                     Let's add a small button to collapse if they change their mind.
                 */}
                {!hasTextValue && (
                  <button
                    onClick={() => setIsTextOpen(false)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 mt-2 ml-1"
                  >
                    <ChevronUp className="w-3 h-3" />
                    Hide text input
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
