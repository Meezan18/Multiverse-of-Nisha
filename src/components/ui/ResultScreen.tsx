import { motion } from "framer-motion";
import { RotateCcw, Crown } from "lucide-react";
import rapunzelImg from "../../assets/characters/rapunzel.svg";
import roseImg from "../../assets/characters/rose.svg";
import burritoImg from "../../assets/characters/burrito.svg";
import gremlinImg from "../../assets/characters/gremlin.svg";
import princessImg from "../../assets/characters/princess.svg";

interface ResultScreenProps {
  result: {
    type: string;
    title: string;
    description: string;
    score: number;
    color: string;
    character: string;
  };
  onRestart: () => void;
  totalQuestions: number;
}

export function ResultScreen({
  result,
  onRestart,
  totalQuestions,
}: ResultScreenProps) {
  const getCharacterImage = (character: string) => {
    switch (character) {
      case "rapunzel":
        return rapunzelImg;
      case "rose":
        return roseImg;
      case "burrito":
        return burritoImg;
      case "gremlin":
        return gremlinImg;
      case "princess":
        return princessImg;
      default:
        return rapunzelImg;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="w-full max-w-2xl mx-auto text-center space-y-6 md:space-y-8"
    >
      <motion.div
        animate={{
          rotate: [0, 3, -3, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="flex items-center justify-center"
      >
        <img
          src={getCharacterImage(result.character)}
          alt={`${result.character} character`}
          className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-purple-400/50 shadow-[0_0_60px_rgba(192,132,252,0.7)] bg-white/10 backdrop-blur-sm"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent"
        >
          {result.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={`inline-block px-8 py-4 rounded-2xl bg-gradient-to-r ${result.color} shadow-2xl shadow-purple-500/50`}
        >
          <div className="flex items-center gap-3 text-white text-xl md:text-2xl font-bold">
            <Crown className="w-7 h-7" />
            Score: {result.score} / {totalQuestions}
            <Crown className="w-7 h-7" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 md:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20"
      >
        <p className="text-lg md:text-xl text-purple-100 leading-relaxed">
          {result.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="group relative px-10 py-4 text-lg md:text-xl font-bold rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/50 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            Play Again
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
