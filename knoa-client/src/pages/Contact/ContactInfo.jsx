import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <FiPhone className="text-2xl" />,
      title: "Phone Number",
      detail: "+1 (555) 000-1234",
      subDetail: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email Address",
      detail: "support@learning.com",
      subDetail: "Our team will reply within 24h",
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: "Office Location",
      detail: "123 Education Lane",
      subDetail: "New York, NY 10001, USA",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE: CONTACT DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-[#03045e]">Contact Us</h2>
            <p className="text-slate-500 max-w-md leading-relaxed">
              We're here to help you. Reach out to us through any of these
              channels and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-8">
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-start gap-5 group">
                {/* Icon Container */}
                <div className="p-4 rounded-2xl bg-[#00b4d8]/10 text-[#00b4d8] group-hover:bg-[#00b4d8] group-hover:text-white transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                    {item.title}
                  </h4>
                  <p className="text-xl font-bold text-[#03045e]">
                    {item.detail}
                  </p>
                  <p className="text-sm text-slate-500">{item.subDetail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE: THE MAP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white shadow-blue-100/50"
        >
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2157071441224!2d-73.98784892425852!3d40.75797477138661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className=" transition-all duration-700"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
