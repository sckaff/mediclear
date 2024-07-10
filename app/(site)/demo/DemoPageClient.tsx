"use client";

import { useState } from 'react';
import axios from 'axios';

interface IcdCode {
  code: string;
  description: string;
  similarity: number;
}

const DemoPageClient = () => {
  const [clinicalNote, setClinicalNote] = useState('');
  const [icdCodes, setIcdCodes] = useState<IcdCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateCode = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://api.mediclear.ai/demo', {
        clinical_note: clinicalNote,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIcdCodes(response.data);
      setClinicalNote('');
    } catch (error) {
      console.error('Error fetching ICD codes:', error);
      setError('Failed to fetch ICD codes. Please try again.');
    } finally {
      setLoading(false);
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleGenerateCode();
              }
            }}
          ></textarea>
        </div>

        <button
          onClick={handleGenerateCode}
          className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out bg-primary hover:bg-blue-400 active:scale-95"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Code'}
        </button>

        {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}

        {icdCodes && icdCodes.length > 0 && (
          <div className="mt-7.5 text-left">
            <h3 className="mb-5 pt-8 text-xl font-semibold text-center text-black dark:text-white md:text-4xl">
              Suggested Codes
            </h3>
            {icdCodes.map((code, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-blue-500 mb-2">{code.code}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{code.description}</p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 border border-green-500 rounded-md p-2">
                  {(code.similarity * 100).toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        )}

        {(!icdCodes || icdCodes.length === 0) && !loading && (
          <p className="mt-7.5 text-gray-500">No codes were found.</p>
        )}
      </div>
    </section>
  );
};

export default DemoPageClient;
