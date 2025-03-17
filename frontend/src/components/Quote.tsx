import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
const quotes = [
  {
    text: `"The customer service I received was exceptional. The support team went above and beyond to address my concerns."`,
    author: "Jules Winnfield",
    position: "CEO | Acme Corp",
  },
  {
    text: `"Their product quality exceeded my expectations. I would highly recommend them to anyone in need of top-notch solutions."`,
    author: "Sarah Connor",
    position: "CTO | Skynet Tech",
  },
  {
    text: `"Absolutely love the user experience! The design and functionality are seamless and intuitive."`,
    author: "Tony Stark",
    position: "Founder | Stark Industries",
  },
  // {
  //   text: `"Fast, reliable, and outstanding service. They truly care about their customers and deliver beyond expectations."`,
  //   author: "Bruce Wayne",
  //   position: "CEO | Wayne Enterprises",
  // },
];

export const Quote = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000);
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
