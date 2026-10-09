import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Heart, MessageCircle } from "lucide-react";

export function CharacterScene() {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);

  const dialogues = [
    {
      speaker: "nisha",
      text: "Meezan! Took ya long enough to show up!",
      side: "left",
    },
    {
      speaker: "meezan",
      text: "Hey hey... I had to dodge a few guards to get here, y'know.",
      side: "right",
    },
    {
      speaker: "nisha",
      text: "Pfft- dramatic as ever.",
      side: "left",
    },
    {
      speaker: "meezan",
      text: "Says the girl who paints the whole tower every year for fun.",
      side: "right",
    },
    {
      speaker: "nisha",
      text: "It's called decor! Not my fault you stare at 'em too much.",
      side: "left",
    },
    {
      speaker: "meezan",
      text: "Can't help it. The best ones have your name written all over 'em.",
      side: "right",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDialogue(false);
      setTimeout(() => {
        setCurrentDialogue((prev) => (prev + 1) % dialogues.length);
        setShowDialogue(true);
      }, 300);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-violet-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-10 left-20"
        >
          <Sparkles className="w-8 h-8 text-pink-300" />
        </motion.div>
        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-20 right-24"
        >
          <Heart className="w-7 h-7 text-rose-300" />
        </motion.div>
        <motion.div
          animate={{
            x: [0, 10, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-20 left-32"
        >
          <Sparkles className="w-6 h-6 text-purple-300" />
        </motion.div>
      </div>

      <div className="relative z-10 flex items-end justify-center gap-4 md:gap-8 px-4 h-full">
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative flex flex-col items-center"
        >
          <motion.img
            src="https://static.wikia.nocookie.net/disney/images/1/10/Rapunzel_tangled.png"
            alt="Nisha"
            className="w-40 h-40 md:w-64 md:h-64 object-contain drop-shadow-[0_0_60px_rgba(192,132,252,0.8)]"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 1.5, -1.5, 0],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm border border-white/30 shadow-lg"
          >
          <span className="text-sm md:text-base font-bold text-white">
            Nisha
          </span>
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute -top-2 -right-2"
          >
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400/50" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="flex flex-col items-center justify-center mb-20 md:mb-32"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 md:p-4 rounded-full bg-gradient-to-br from-pink-500/40 to-purple-500/40 backdrop-blur-md border border-pink-400/50 shadow-[0_0_40px_rgba(247,37,133,0.5)]"
          >
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-rose-300 fill-rose-300/50" />
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative flex flex-col items-center"
        >
          <motion.img
            src="https://static.wikia.nocookie.net/disney/images/6/6b/Flynn_Rider_pose.png"
            alt="Meezan"
            className="w-40 h-40 md:w-64 md:h-64 object-contain drop-shadow-[0_0_60px_rgba(255,159,28,0.6)]"
            animate={{
              y: [0, -6, 0],
              rotate: [0, -1.5, 1.5, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/80 to-orange-500/80 backdrop-blur-sm border border-white/30 shadow-lg"
          >
            <span className="text-sm md:text-base font-bold text-white">
              Meezan
            </span>
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-2 -left-2"
          >
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400/50" />
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showDialogue && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`absolute ${
              dialogues[currentDialogue].side === "left"
                ? "bottom-6 left-4 md:bottom-10 md:left-10"
                : "bottom-6 right-4 md:bottom-10 md:right-10"
            } max-w-[280px] md:max-w-sm`}
          >
            <div
              className={`relative p-4 md:p-5 rounded-3xl backdrop-blur-xl border shadow-2xl ${
                dialogues[currentDialogue].side === "left"
                  ? "bg-purple-500/20 border-purple-400/50 shadow-purple-500/30"
                  : "bg-amber-500/20 border-amber-400/50 shadow-amber-500/30"
              }`}
            >
              <div
                className={`absolute -bottom-2 w-4 h-4 rotate-45 backdrop-blur-xl border-b border-r ${
                  dialogues[currentDialogue].side === "left"
                    ? "left-6 bg-purple-500/20 border-purple-400/50"
                    : "right-6 bg-amber-500/20 border-amber-400/50"
                }`}
              />
              <div className="flex items-start gap-2 mb-1">
                <MessageCircle
                  className={`w-4 h-4 mt-0.5 ${
                    dialogues[currentDialogue].side === "left"
                      ? "text-pink-300"
                      : "text-amber-300"
                  }`}
                />
                <span
                  className={`text-xs font-bold uppercase tracking-wide ${
                    dialogues[currentDialogue].side === "left"
                      ? "text-pink-200"
                      : "text-amber-200"
                  }`}
                >
                  {dialogues[currentDialogue].speaker === "nisha"
                    ? "Nisha"
                    : "Meezan"}
                </span>
              </div>
              <p className="text-sm md:text-base text-white font-medium leading-relaxed pl-6">
                {dialogues[currentDialogue].text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
