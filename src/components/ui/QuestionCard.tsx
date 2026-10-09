import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

interface QuestionCardProps {
  question: {
    question: string;
    options: string[];
    explanation?: string;
  };
  onAnswerSelect: (index: number) => void;
  selectedAnswer: number | null;
  showExplanation: boolean;
  isCorrect: boolean;
}

export function QuestionCard({
  question,
  onAnswerSelect,
  selectedAnswer,
  showExplanation,
  isCorrect,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto space-y-6"
    >
      <motion.div
        key={question.question}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 md:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20"
      >
        <h2 className="text-xl md:text-3xl font-semibold text-white leading-relaxed text-center">
          {question.question}
        </h2>
      </motion.div>

      <div className="grid gap-4 md:gap-5">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          // const showCorrect = showExplanation && index === question.options.indexOf(question.options[index]);

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.995 : 1 }}
              onClick={() => onAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`group relative p-5 md:p-6 text-left rounded-2xl border transition-all duration-300 ${
                selectedAnswer === null
                  ? "bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20"
                  : isSelected && isCorrect
                  ? "bg-emerald-500/20 border-emerald-400/60 shadow-lg shadow-emerald-500/20"
                  : isSelected && !isCorrect
                  ? "bg-rose-500/20 border-rose-400/60 shadow-lg shadow-rose-500/20"
                  : showExplanation && index === (question as any).correctAnswer
                  ? "bg-emerald-500/20 border-emerald-400/60 shadow-lg shadow-emerald-500/20"
                  : "bg-white/5 border-white/10 opacity-60"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold border transition-all ${
                    selectedAnswer === null
                      ? "bg-purple-500/30 border-purple-400/40 text-purple-100 group-hover:bg-purple-500/40"
                      : isSelected && isCorrect
                      ? "bg-emerald-500/40 border-emerald-400/60 text-white"
                      : isSelected && !isCorrect
                      ? "bg-rose-500/40 border-rose-400/60 text-white"
                      : showExplanation && index === (question as any).correctAnswer
                      ? "bg-emerald-500/40 border-emerald-400/60 text-white"
                      : "bg-white/10 border-white/20 text-purple-100"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <p className="flex-1 text-base md:text-lg text-white font-medium leading-relaxed">
                  {option}
                </p>
                {showExplanation && isSelected && isCorrect && (
                  <Check className="w-7 h-7 text-emerald-400" />
                )}
                {showExplanation && isSelected && !isCorrect && (
                  <X className="w-7 h-7 text-rose-400" />
                )}
                {showExplanation && !isSelected && index === (question as any).correctAnswer && (
                  <Check className="w-7 h-7 text-emerald-400 animate-pulse" />
                )}
              </div>

              {isSelected && !isCorrect && showExplanation && (question as any).explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-rose-400/30"
                >
                  <p className="text-sm md:text-base text-purple-100 flex items-start gap-2">
                    <Sparkles className="w-5 h-5 mt-0.5 text-pink-300 flex-shrink-0" />
                    {(question as any).explanation}
                  </p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-lg font-medium text-purple-100 flex items-center justify-center gap-2">
            {isCorrect ? (
              <>
                <Check className="w-6 h-6 text-emerald-400" />
                Correct! That's so Nisha-coded ✨
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 text-pink-400" />
                Ooh plot twist... but very on-brand for her!
              </>
            )}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
