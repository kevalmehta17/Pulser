import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const quotes = [
  {
    text: `"A platform where words shape the world. Writing has never felt more impactful."`,
    author: "Harper Lee",
    position: "Author | To Kill a Mockingbird",
  },
  {
    text: `"Every writer needs a voice, and Pulser amplifies it beautifully."`,
    author: "Ernest Hemingway",
    position: "Journalist & Novelist",
  },
  {
    text: `"Seamless publishing, engaging readers — Pulser is the future of blogging."`,
    author: "Seth Godin",
    position: "Marketing Guru & Blogger",
  },
  {
    text: `"Where ideas meet the world. A must-have for storytellers and thinkers."`,
    author: "Maya Angelou",
    position: "Poet & Memoirist",
  },
  {
    text: `"Writing is about connection, and Pulser makes it effortless."`,
    author: "Joan Didion",
    position: "Essayist & Journalist",
  },
];

export const Quote = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-3xl font-bold text-center text-slate-900 leading-snug"
            >
              {quotes[index].text}
              <div className="text-xl font-semibold text-slate-800 pt-4">
                {quotes[index].author}
              </div>
              <div className="text-xl font-semibold text-slate-400">
                {quotes[index].position}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
