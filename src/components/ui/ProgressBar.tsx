import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export function ProgressBar({ current, total, progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      <div className="flex justify-between items-center text-sm md:text-base text-purple-100 font-medium">
        <span>
          Question {current} / {total}
        </span>
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-3 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/20 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 shadow-[0_0_30px_rgba(192,132,252,0.8)] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}
