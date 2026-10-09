import { motion } from "framer-motion";
import { Crown, Book, Film, Ghost, Heart } from "lucide-react";

export function CharacterCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative p-6 md:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-violet-500/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 border border-pink-400/40"
            >
              <Crown className="w-8 h-8 text-pink-300" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Meet Nisha
            </h3>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="p-3 rounded-full bg-gradient-to-br from-purple-500/30 to-violet-500/30 border border-purple-400/40"
            >
              <Heart className="w-8 h-8 text-rose-300" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              <Book className="w-7 h-7 text-pink-300" />
              <span className="text-xs md:text-sm text-purple-100 text-center font-medium">
                Dark Romance Novels
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              <Film className="w-7 h-7 text-violet-300" />
              <span className="text-xs md:text-sm text-purple-100 text-center font-medium">
                South Indian Films
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors col-span-2 md:col-span-1"
            >
              <Ghost className="w-7 h-7 text-purple-300" />
              <span className="text-xs md:text-sm text-purple-100 text-center font-medium">
                Horror • Mystery • Thriller
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="text-2xl">🗯️</div>
              <span className="text-xs md:text-sm text-purple-100 text-center font-medium">
                Elite Gossip Queen
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="text-2xl">🐼</div>
              <span className="text-xs md:text-sm text-purple-100 text-center font-medium">
                Doraemon & Shinchan
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="text-2xl">💜</div>
              <span className="text-xs md:text-sm text-purple-100 text-center font-medium">
                Tangled Rapunzel-coded
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center text-purple-100/90 italic text-sm md:text-base"
          >
            "Mood swings, indirect talks, overthinks everything... and argues a
            lot but loves even harder"
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
