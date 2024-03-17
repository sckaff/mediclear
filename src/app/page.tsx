"use client";

import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { AnimatePresence, motion } from "framer-motion";
import { gradient } from "@/components/Gradient";
import { useEffect, useState } from "react";
import 'react-phone-number-input/style.css';
import Modal from "@/components/Modal";

export default function Home() {

  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    gradient.initGradient("#gradient-canvas");
  }, []);

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const toggleContactModal = () => setIsContactModalVisible(!isContactModalVisible);

  const handlePhoneChange = (value: string | undefined) => {
    // Here, you could add additional logic if needed,
    // for example, validating the phone number format.
    if (value) { // If value is not undefined, update the state
      setPhoneNumber(value);
    } else { // Clear the state if the input is cleared
      setPhoneNumber('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(false);
    setIsError(false);

    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLTextAreaElement).value,
      email: (form.elements.namedItem('email') as HTMLTextAreaElement).value,
      phone: phoneNumber, // Since this is optional, it's okay if it's empty
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      source: (form.elements.namedItem('source') as HTMLTextAreaElement).value, // This is also optional
    };

    console.log(formData);

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Message sent successfully');
      form.reset();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 10000); // Hide after 10 seconds
    } else {
      console.log('Failed to send message');
      setIsError(true);
      setTimeout(() => setIsError(false), 10000); 
    }
}

  return (
    <AnimatePresence>
  <div className="min-h-[100vh] sm:min-h-screen w-screen flex flex-col relative bg-[#F2F3F5] font-inter overflow-hidden">
        {/* Noise SVG filter */}
        <svg
          style={{ filter: "contrast(125%) brightness(110%)" }}
          className="fixed z-[1] w-full h-full opacity-[35%]"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".7"
              numOctaves="3"
              stitchTiles="stitch"
            ></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"></rect>
        </svg>

        <div className="relative scrollable-container z-[100]">
          {/* Main content */}
          <main className="flex flex-col relative justify-center min-h-[calc(100vh-184px)] static md:fixed w-screen overflow-hidden grid-rows-[1fr_repeat(3,auto)_1fr] px-4 md:px-20 md:py-0 pb-8">
            <motion.svg
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              className="block w-[100px] row-start-2 mb-8 md:mb-6"
              viewBox="0 0 87 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
            </motion.svg>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              className="relative md:ml-[-10px] md:mb-[37px] font-extrabold text-[4vw] md:text-[32px] font-inter text-[#1E2B3A] leading-[0.9] tracking-[-2px] z-[100]"
            >
              MEDICLEAR
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              className="relative md:ml-[-10px] md:mb-[37px] font-extrabold text-[16vw] md:text-[130px] font-inter text-[#1E2B3A] leading-[0.9] tracking-[-2px] z-[100]"
            >
              Reduce your <br />
              claim <span className="text-[#407BBF]">denials</span>
              <span className="font-inter text-[#407BBF]">.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              className="flex flex-col md:flex-row justify-center items-center z-20 mx-0 mb-0 mt-8 md:mt-0 md:mb-[35px] max-w-2xl md:space-x-8 space-y-4 md:space-y-0"
            >
              <div className="w-full md:w-1/2 text-left z-30">
                <h2 className="font-semibold text-lg md:text-[1em] text-[#1a2b3b]">
                  Hospitals
                </h2>
                <p className="text-lg leading-relaxed text-[#1a2b3b] font-normal">
                  Streamline your billing cycle, reduce errors, and improve reimbursement rates with our AI-powered platform.
                </p>
              </div>
              <div className="w-full md:w-1/2 text-left">
                <h2 className="font-semibold text-lg md:text-[1em] text-[#1a2b3b]">
                  Individuals
                </h2>
                <p className="text-lg leading-relaxed text-[#1a2b3b] font-normal">
                  Navigate your insurance claims with ease and gain clarity on your coverage benefits with our automated assistance.
                </p>
              </div>
            </motion.div>
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-[15px] mt-8 md:mt-0 items-center md:items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.55,
                  duration: 0.55,
                  ease: [0.075, 0.82, 0.965, 1],
                }}
              >
                <button
                  onClick={toggleContactModal} // Toggle the "Contact Us" modal visibility
                  className="group rounded-full pl-[8px] min-w-[160px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-20 scale-100 duration-75"
                  style={{
                    boxShadow: "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <span className="w-5 h-5 rounded-full bg-[#407BBF] flex items-center justify-center">
                    <svg
                      className="w-[16px] h-[16px] text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.75 7.75C4.75 6.64543 5.64543 5.75 6.75 5.75H17.25C18.3546 5.75 19.25 6.64543 19.25 7.75V16.25C19.25 17.3546 18.3546 18.25 17.25 18.25H6.75C5.64543 18.25 4.75 17.3546 4.75 16.25V7.75Z"
                      ></path>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.5 6.5L12 12.25L18.5 6.5"
                      ></path>
                    </svg>
                  </span>
                  Get Updates
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.65,
                  duration: 0.55,
                  ease: [0.075, 0.82, 0.965, 1],
                }}
              >
                <button
                  onClick={toggleModal} // Toggle modal visibility
                  className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-70 scale-100 duration-75"
                  style={{
                    boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                  }}
                >
                  <span>Learn more</span>
                </button>
              </motion.div>
            </div>
          </main>
          
          {/* Gradient canvas */}
          <div
            className="fixed top-0 right-0 w-[80%] md:w-1/2 h-screen bg-[#1F2B3A]/20"
            style={{
              clipPath:
                "polygon(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)",
            }}
          ></div>
          <motion.canvas
                  initial={{
                    filter: "blur(20px)",
                  }}
                  animate={{
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.075, 0.82, 0.965, 1],
                  }}
                  style={{
                    clipPath:
                      "polygon(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)",
                  }}
                  id="gradient-canvas"
                  data-transition-in
                  className="z-10 fixed top-0 right-[-2px] w-[80%] md:w-1/2 h-screen bg-[#c3e4ff]"
                ></motion.canvas>
          </div>

          {/* Fixed Footer */}
          <div className="bg-[#1D2B3A] fixed bottom-0 z-20 w-full flex items-center justify-between text-white text-sm font-mono px-4 py-2">
            <button
              onClick={toggleContactModal}
              className="rounded-md px-3 py-1 text-[11px] transition-all text-white font-mono bg-transparent border border-[#2e4053] hover:bg-[#305f8a] duration-300 ease-in-out"
            >
              Contact Us
            </button>
            <span className="text-xs text-left flex-1 pl-4 overflow-hidden whitespace-nowrap text-ellipsis">
              Pre-launch landing page - Software under development.
            </span>
          </div>
        </div>


      {/*- MODALS -*/}

      <Modal isVisible={isModalVisible} onClose={toggleModal}>
        <h2 className="text-xl font-semibold text-center mb-4">Our Services</h2>
      
        <div className="space-y-6">
          {/* Automated CPT Code and Billing Error Identification */}
          <div>
            <h3 className="text-lg font-semibold">Automated CPT Code and Billing Error Identification</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Reduces the risk of claim denials due to coding errors, improving claim acceptance rates.</li>
            </ul>
          </div>

          {/* Pre-Authorization Request Automation */}
          <div>
            <h3 className="text-lg font-semibold">Pre-Authorization Request Automation</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Streamlines the pre-authorization process, reducing denials due to lack of prior authorization.</li>
            </ul>
          </div>

          {/* Real-Time Eligibility and Benefits Verification */}
          <div>
            <h3 className="text-lg font-semibold">Real-Time Eligibility and Benefits Verification</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Prevents claim denials due to coverage issues, ensuring services are covered.</li>
            </ul>
          </div>

          {/* Automated Appeal Letters for Denied Claims */}
          <div>
            <h3 className="text-lg font-semibold">Automated Appeal Letters for Denied Claims</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Simplifies the appeal process, potentially reversing denials and recovering revenue.</li>
            </ul>
          </div>

          {/* Integration with EMR/EHR Systems */}
          <div>
            <h3 className="text-lg font-semibold">Integration with EMR/EHR Systems</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Reduces manual data entry errors and streamlines the claim submission process, making it more efficient.</li>
            </ul>
          </div>
        </div>
      </Modal>
      <Modal isVisible={isContactModalVisible} onClose={toggleContactModal}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
            </div>

            {/* Phone Field (Optional) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
              <PhoneInput
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                defaultCountry="US"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="mt-1 block w-full rounded-md shadow-sm"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" required rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>

            {/* Source Field (Optional) */}
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700">How did you hear about us? (Optional)</label>
              <input type="text" id="source" name="source" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
            </div>
          </div>
          <button type="submit" className="mt-6 w-full bg-darkblue hover:bg-hoverblue text-white font-bold py-2 px-4 rounded transition-colors duration-150 ease-in-out">
            Send Message
          </button>
          {isSubmitted && <div style={{ color: 'green', marginTop: '10px', fontFamily: 'Verdana, sans-serif', fontSize: '14px' }}>Message submitted successfully!</div>}
          {isError && <div style={{ color: 'red', marginTop: '10px', fontFamily: 'Verdana, sans-serif', fontSize: '14px' }}>Failed to send message. Please try again later.</div>}
        </form>
      </Modal>
    </AnimatePresence>
  );
}
