import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { Link } from "react-router";
import styled from "styled-components";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  return (
    <footer className="bg-[#03045e] text-white pt-16 pb-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* Brand Section */}
        <StyledWrapper>
          <aside className="footer-brand-section">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img
                className="w-28 md:w-32 h-auto mb-6"
                src="https://i.ibb.co/Ldzb6PJr/footer-Logo-2-1.png"
                alt="Knoa Logo"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-[250px]">
              Empowering learners worldwide with expert-led courses and
              AI-driven support.
            </p>

            <div className="card">
              <a
                className="socialContainer containerOne"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <SiInstagram className="socialIcon" />
              </a>
              <a
                className="socialContainer containerTwo"
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaXTwitter className="socialIcon" />
              </a>
              <a
                className="socialContainer containerThree"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn className="socialIcon" />
              </a>
              <a
                className="socialContainer containerFour"
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
              >
                <SiWhatsapp className="socialIcon" />
              </a>
            </div>
          </aside>
        </StyledWrapper>

        {/* Links Section */}
        <div className="flex flex-col gap-4">
          <h6 className="text-[#0077b6] font-bold uppercase tracking-widest text-xs mb-2">
            Platform
          </h6>
          <Link
            to="/contact"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Contacts
          </Link>
          <Link
            to="/faq"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            FAQ
          </Link>
          <Link
            to="/mentors"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Mentors
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h6 className="text-[#39b8ad] font-bold uppercase tracking-widest text-xs mb-2">
            Student Resources
          </h6>
          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <Link
              to="/resources/roadmap"
              className="hover:text-white transition-colors"
            >
              MERN Stack Roadmap
            </Link>
            <Link
              to="/resources/interview-prep"
              className="hover:text-white transition-colors"
            >
              Interview Cheat Sheet
            </Link>
            <Link
              to="/resources/verify"
              className="hover:text-white transition-colors"
            >
              Certificate Verifier
            </Link>
            <Link
              to="/resources/community"
              className="hover:text-white transition-colors"
            >
              Digital Library
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <h6 className="text-[#0077b6] font-bold uppercase tracking-widest text-xs mb-2">
            Legal
          </h6>
          <Link
            to="/policies#terms"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Terms of use
          </Link>
          <Link
            to="/policies#privacy"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Privacy policy
          </Link>
          <Link
            to="/policies#cookies"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Cookie policy
          </Link>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Knoa Learning. All rights reserved.</p>
      </div>
    </footer>
  );
};

const StyledWrapper = styled.div`
  .footer-brand-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding-top: 10px;
  }

  .socialContainer {
    width: 38px;
    height: 38px;
    background-color: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 12px; /* Square-ish rounded looks more modern than circles */
    border: 1px border-white/5;
  }

  .socialIcon {
    color: #cbd5e1;
    font-size: 16px;
    transition: 0.4s;
  }

  .containerOne:hover {
    background-color: #d62976;
  }
  .containerTwo:hover {
    background-color: #000000;
  }
  .containerThree:hover {
    background-color: #0072b1;
  }
  .containerFour:hover {
    background-color: #128c7e;
  }

  .socialContainer:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .socialContainer:hover .socialIcon {
    color: white;
    transform: scale(1.1);
  }
`;

export default Footer;
