import React from "react";
import ContactBanner from "./ContactBanner";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div>
      <ContactBanner></ContactBanner>
      <ContactInfo></ContactInfo>
      <ContactForm></ContactForm>
    </div>
  );
};

export default Contact;
