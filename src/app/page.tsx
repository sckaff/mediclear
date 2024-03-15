"use client";

import { AnimatePresence, motion } from "framer-motion";
import { gradient } from "@/components/Gradient";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

export default function Home() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

  useEffect(() => {
    gradient.initGradient("#gradient-canvas");
  }, []);

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const toggleContactModal = () => setIsContactModalVisible(!isContactModalVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = {
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
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
      // You can reset the form or show a success message
    } else {
      console.log('Failed to send message');
      // Handle errors or show an error message
    }
};


  return (
    <AnimatePresence>
      <div className="min-h-[100vh] sm:min-h-screen w-screen flex flex-col relative bg-[#F2F3F5] font-inter overflow-hidden">
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
        <main className="flex flex-col justify-center h-[90%] static md:fixed w-screen overflow-hidden grid-rows-[1fr_repeat(3,auto)_1fr] z-[100] pt-[30px] pb-[320px] px-4 md:px-20 md:py-0">
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
            className="flex flex-row justify-center z-20 mx-0 mb-0 mt-8 md:mt-0 md:mb-[35px] max-w-2xl md:space-x-8"
          >
            <div className="w-1/2">
              <h2 className="flex items-center font-semibold text-[1em] text-[#1a2b3b]">
                Hospitals
              </h2>
              <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal">
                Streamline your billing cycle, reduce errors, and improve reimbursement rates with our AI-powered platform.
              </p>
            </div>
            <div className="w-1/2">
              <h2 className="flex items-center font-semibold text-[1em] text-[#1a2b3b]">
                Individuals
              </h2>
              <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal">
                Navigate your insurance claims with ease and gain clarity on your coverage benefits with our automated assistance.
              </p>
            </div>
          </motion.div>

          <div className="flex gap-[15px] mt-8 md:mt-0">
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
                className="group rounded-full pl-[8px] min-w-[180px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-20 scale-100 duration-75"
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
                Contact Us
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
          className="z-50 fixed top-0 right-[-2px] w-[80%] md:w-1/2 h-screen bg-[#c3e4ff]"
        ></motion.canvas>
        <div className="h-[60px] bg-[#1D2B3A] fixed bottom-0 z-20 w-full flex flex-row items-center justify-start text-white text-sm font-mono p-8">
          Pre-launch website - currently under development
        </div>
      </div>
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
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" required rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
          </div>
          <button 
            type="submit" 
            className="mt-6 w-full bg-darkblue hover:bg-hoverblue text-white font-bold py-2 px-4 rounded transition-colors duration-150 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </Modal>
    </AnimatePresence>
  );
}
