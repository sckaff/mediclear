"use client";

import { useState } from 'react';
import axios from 'axios';

const DemoPage = () => {

  interface IcdCode {
    code: string;
    description: string;
  }
  
  // Then, ensure that wherever selectedCode is defined or updated, it conforms to this type
  
  const [clinicalNote, setClinicalNote] = useState('');
  const [icdCodes, setIcdCodes] = useState<IcdCode[]>([]);

  const handleGenerateCode = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict_icd', {
        clinical_note: clinicalNote,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIcdCodes(response.data);
    } catch (error) {
      console.error('Error fetching ICD codes:', error);
    }
  };

  return (
    <section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="animate_top mx-auto max-w-[1000px] text-center">
        <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white md:text-4xl">
          Product Demo
        </h2>
        <p className="mb-7.5">
          Generate ICD-10-CM codes by entering a clinical note or a description of a diagnosis.
        </p>

        <div className="mb-7.5">
          <textarea
            id="personalized-input"
            name="personalized-input"
            className="block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-y"
            placeholder="Type here..."
            rows={4}
            value={clinicalNote}
            onChange={(e) => setClinicalNote(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleGenerateCode}
          className="inline-flex items-center gap-2.5 rounded-full bg-gray-200 px-6 py-3 font-medium text-grey duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
          disabled
        >
          Generate Code
        </button>

        <div className="mt-4 p-4 max-w-xl mx-auto bg-yellow-200 text-yellow-800 border border-yellow-300 rounded-xl">
          <p>⚠ The service is currently in maintenance. Please try again later.</p>
        </div>

        {icdCodes && icdCodes.length > 0 && (
          <div className="mt-7.5 text-left">
            <h3 className="mb-5 pt-8 text-xl font-semibold text-center text-black dark:text-white md:text-4xl">Suggested Codes</h3>
            {icdCodes.map((code, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
                <p className="text-lg font-medium text-blue-500 mb-2">{code.code}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{code.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* {!icdCodes || icdCodes.length === 0 && (
          <p className="mt-7.5 text-gray-500">No ICD codes available. Enter a clinical note and click &quot;Generate Code&quot;.</p>
        )} */}
      </div>
    </section>
  );
};

export default DemoPage;
