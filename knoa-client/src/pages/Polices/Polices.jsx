import React from "react";
import { motion } from "framer-motion";

const Polices = () => {
  const sections = [
    {
      id: "terms",
      title: "Terms of Use",
      content:
        "By accessing Knoa, you agree to be bound by these terms. Our platform is designed to provide educational content and AI-powered support. Users must not use the platform for any illegal activities or distribute malicious content.",
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content:
        "Your privacy is our priority. We collect minimal data required for your learning experience—specifically your name, email, and profile image. We never sell your data to third parties. AI interactions are used solely to improve support quality.",
    },
    {
      id: "cookies",
      title: "Cookie Policy",
      content:
        "Knoa uses cookies to keep you logged in and remember your dashboard preferences. These are 'functional cookies' and are essential for the platform to operate correctly. You can disable them in your browser, but some features may stop working.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Sticky Sidebar Navigation */}
        <aside className="lg:w-1/4">
          <div className="sticky top-28 space-y-4">
            <h2 className="text-2xl font-black text-[#03045e] mb-6">
              Legal Center
            </h2>
            <nav className="flex flex-col gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-[#0077b6]/10 hover:text-[#0077b6] transition-all border border-transparent hover:border-[#0077b6]/20"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:w-3/4 space-y-16"
        >
          {sections.map((section) => (
            <motion.section
              key={section.id}
              id={section.id}
              variants={itemVariants}
              className="p-8 md:p-12 bg-white rounded-3xl shadow-sm border border-slate-100 scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-10 bg-[#0077b6] rounded-full"></div>
                <h3 className="text-3xl font-black text-[#03045e]">
                  {section.title}
                </h3>
              </div>

              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                <p>{section.content}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[#0077b6] font-medium">
                  <li>Respect all mentors and students.</li>
                  <li>Do not share account credentials.</li>
                  <li>AI support is for educational purposes only.</li>
                </ul>
              </div>
            </motion.section>
          ))}

          <footer className="text-center text-slate-400 text-sm pb-12">
            Last updated: April 2026 • Knoa Learning Platform
          </footer>
        </motion.main>
      </div>
    </div>
  );
};

export default Polices;
