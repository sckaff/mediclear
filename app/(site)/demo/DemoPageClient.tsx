"use client";

import { useState, useRef } from 'react';
import axios from 'axios';
import PasswordModal from './PasswordModal';
import Feature from "@/components/Features";
import Hero from '@/components/Hero';

interface IcdCode {
  code: string;
  description: string;
  similarity: number;
}

const dev_mode = false; // SET TO FALSE WHEN DEPLOYING TO PRODUCTION

const DemoPageClient = () => {
  const [clinicalNote, setClinicalNote] = useState('');
  const [displayedNote, setDisplayedNote] = useState('');
  const [medicalCodes, setMedicalCodes] = useState<IcdCode[]>([]);
  const [suggestedCodes, setSuggestedCodes] = useState<IcdCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSuggestedCodes, setShowSuggestedCodes] = useState(false);

  const notesRef = useRef<HTMLDivElement>(null);

  // Fake data generator
  const generateFakeData = () => {
    const fakeMedicalCodes: IcdCode[] = [
      { code: "A00.0", description: "Cholera due to Vibrio cholerae 01, biovar cholerae", similarity: 1 },
      { code: "A00.1", description: "Cholera due to Vibrio cholerae 01, biovar eltor", similarity: 1 },
      { code: "A00.9", description: "Cholera, unspecified", similarity: 1 },
    ];
    
    const fakeSuggestedCodes: IcdCode[] = [
      { code: "A01.0", description: "Typhoid fever", similarity: 0.85 },
      { code: "A01.1", description: "Paratyphoid fever A", similarity: 0.75 },
      { code: "A01.2", description: "Paratyphoid fever B", similarity: 0.70 },
      { code: "A01.3", description: "Paratyphoid fever C", similarity: 0.65 },
      { code: "A01.4", description: "Paratyphoid fever, unspecified", similarity: 0.60 },
    ];

    return { medicalCodes: fakeMedicalCodes, suggestedCodes: fakeSuggestedCodes };
  };

  const handleGenerateCode = async () => {
    setLoading(true);
    setError('');
    try {

      // const apiUrl = dev_mode ? 'http://localhost:5000/demo' : 'https://api.mediclear.ai/demo';
      // const response = await axios.post(apiUrl, {
      //   clinical_note: clinicalNote,
      // }, {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });

      // Instead of making an API call, we're using our fake data generator
      const { medicalCodes, suggestedCodes } = generateFakeData();
      setMedicalCodes(medicalCodes);
      setSuggestedCodes(suggestedCodes);
      setDisplayedNote(clinicalNote);
      setClinicalNote('');
      setShowNotes(false);
      setShowSuggestedCodes(false);
    } catch (error) {
      console.error('Error generating codes:', error);
      setError('Failed to generate codes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleNotes = () => {
    setShowNotes(!showNotes);
    if (!showNotes && notesRef.current) {
      notesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSuggestedCodes = () => {
    setShowSuggestedCodes(!showSuggestedCodes);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <main>
        <PasswordModal onAuthenticated={handleAuthenticated} />
        <Hero />
        <Feature />
      </main>
    );
  }

  return (
    <section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="animate_top mx-auto max-w-[1500px] pl-8 pr-8">
        <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white md:text-4xl text-center">
          Product Demo
        </h2>
        <p className="mb-15 text-center">
          Generate ICD-10-CM codes by entering a clinical note or a description of a diagnosis.
        </p>

        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="mb-7.5 lg:flex-1">
            <textarea
              id="personalized-input"
              name="personalized-input"
              className="block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-y min-h-[400px] focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Type here..."
              rows={4}
              value={clinicalNote}
              onChange={(e) => setClinicalNote(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleGenerateCode();
                }
              }}
            ></textarea>
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleGenerateCode}
                className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out bg-primary hover:bg-blue-400 active:scale-95"
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Code'}
              </button>

              {medicalCodes.length > 0 && (
                <div className="group">
                  <button
                    onClick={handleToggleNotes}
                    className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-medium text-white relative overflow-hidden"
                    disabled={loading || !displayedNote}
                  >
                    {showNotes ? 'Hide Notes' : 'See Notes'}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </button>
                </div>
              )}
            </div>

            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>

          <div className="mt-7.5 lg:mt-0 lg:flex-1 lg:pl-10 lg:border-l lg:border-gray-300">
            {medicalCodes.length > 0 && (
              <div className="text-left">
                <h3 className="mb-5 pt-8 lg:pt-0 text-xl font-semibold text-center text-black dark:text-white md:text-4xl">
                  Medical Codes
                </h3>
                {medicalCodes.map((code, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium text-blue-500 mb-2">{code.code}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{code.description}</p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleToggleSuggestedCodes}
                  className="mt-4 inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-medium text-white bg-secondary hover:bg-opacity-90 transition-all duration-300 ease-in-out"
                >
                  {showSuggestedCodes ? 'Hide Suggested Codes' : 'View Suggested Codes'}
                </button>
              </div>
            )}

            {showSuggestedCodes && suggestedCodes.length > 0 && (
              <div className="text-left mt-8">
                <h3 className="mb-5 text-xl font-semibold text-center text-black dark:text-white md:text-4xl">
                  Suggested Codes
                </h3>
                {suggestedCodes.map((code, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium text-blue-500 mb-2">{code.code}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{code.description}</p>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 border border-green-500 rounded-md p-2">
                      {(code.similarity * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            )}

            {!loading && medicalCodes.length === 0 && (
              <p className="text-gray-500">No codes were found.</p>
            )}
          </div>
        </div>

        <div ref={notesRef}>
          {showNotes && displayedNote && (
            <div className="mt-7.5 text-left">
              <h3 className="mb-2 pt-8 text-m font-semibold text-center text-black dark:text-white md:text-4xl">
                Clinical Notes
              </h3>
              <p className="mb-5 text-sm text-center text-gray-700 dark:text-gray-300">{displayedNote}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoPageClient;