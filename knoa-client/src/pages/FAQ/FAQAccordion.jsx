import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";

const FAQAccordion = () => {
  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Simply click the 'Get Course' button on any course detail page. If the course is free, you'll get instant access. For paid courses, you'll be redirected to our secure checkout.",
    },
    {
      question: "Can I access the courses on mobile?",
      answer:
        "Yes! Our platform is fully responsive. You can learn on your laptop, tablet, or smartphone anytime, anywhere.",
    },
    {
      question: "Do I get a certificate after completion?",
      answer:
        "Absolutely. Once you complete all lessons and the final project in a program, a digital certificate will be generated in your dashboard.",
    },
    {
      question: "Is there a community for students?",
      answer:
        "Yes, every course comes with access to a dedicated Discord channel where you can interact with mentors and fellow students.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={index === 0} // Optional: Keep first one open by default
          />
        ))}
      </div>
    </section>
  );
};

const AccordionItem = ({ question, answer, isOpen: defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  return (
    <motion.div
      initial={false}
      className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-[#00b4d8] shadow-lg shadow-blue-50 bg-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 lg:p-8 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-2 rounded-xl transition-colors ${
              isOpen ? "bg-[#00b4d8] text-white" : "bg-slate-100 text-[#03045e]"
            }`}
          >
            <FiHelpCircle className="text-xl" />
          </div>
          <span
            className={`text-lg font-bold transition-colors ${
              isOpen
                ? "text-[#03045e]"
                : "text-slate-600 group-hover:text-[#00b4d8]"
            }`}
          >
            {question}
          </span>
        </div>

        <div
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          {isOpen ? (
            <FiMinus className="text-[#00b4d8] text-2xl" />
          ) : (
            <FiPlus className="text-slate-400 text-2xl" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginBottom: 0 },
              collapsed: { opacity: 0, height: 0, marginBottom: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-8 lg:px-20 pb-8 text-slate-500 leading-relaxed">
              <div className="pt-2 border-t border-slate-50">{answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQAccordion;
