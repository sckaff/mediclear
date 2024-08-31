import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "This is the Contact page for Mediclear AI. Contact us for a demo request.",
};

const ContactPage = () => {
  return (
    
    // READ BEFORE INTEGRATING CALENDLY: https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-3-migrating-nexthead
    <>
      {/* <Head>   
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>
      </Head> */}
      <div className="pb-20 pt-40">
        {/* Contact form component */}
        <Contact />

        {/* Calendly inline widget */}
        {/* <div className="mt-20 mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold text-center text-black dark:text-white mb-10">
            Schedule a Meeting with Us
          </h2>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/contact-mediclear/30min"
            style={{ minWidth: '320px', height: '630px' }}
          ></div>
        </div> */}
      </div>
    </>
  );
};

export default ContactPage;
