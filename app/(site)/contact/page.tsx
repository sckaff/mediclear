// pages/contact.tsx

"use client";

import React, { useEffect } from "react";
import Contact from "@/components/Contact";
import { InlineWidget } from "react-calendly";

const ContactPage = () => {
  // Use useEffect to dynamically set the document title
  useEffect(() => {
    document.title = "Contact Us";
  }, []); // The empty dependency array ensures the title is set once when the component mounts

  return (
    <>
      <div className="pt-40">
        {/* Contact form component */}
        <Contact />

        {/* Calendly inline widget */}
        <div className="mt-8">
          <h2 className="mx-auto mb-8 text-center text-3xl font-bold text-black dark:text-white md:w-4/5 xl:w-1/2 xl:text-sectiontitle3">
            Or schedule a meeting!
          </h2>
          <InlineWidget
            styles={{ colorScheme: "white", height: '750px', width: '100%' }}
            url="https://calendly.com/contact-mediclear/30min?hide_event_type_details=1&hide_gdpr_banner=1"
          />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
