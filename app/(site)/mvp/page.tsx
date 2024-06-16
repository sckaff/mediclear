// app/site/mvp/page.js
'use client';

import { useState } from 'react';

const MVPPage = () => {
  const [patientName] = useState('Lou LeFortaeui');
  const [dob] = useState('04/01/1968');
  const [age] = useState('48 years, 21 days');
  const [insurance] = useState('Mediclear Rural Optimus');
  const [appt_date] = useState('06/16/2024');
  const [notes, setNotes] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [pastReports, setPastReports] = useState({});

  const handleButtonClick = () => {
    setGeneratedText(`Generated text from notes: ${notes}`);
    setIsGenerated(true);
    const today = new Date().toLocaleDateString('en-GB');
    setPastReports((prevReports) => ({
      ...prevReports,
      [today]: patientName,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-8">
        {/* Past Reports */}
        <div className="w-[10vw] h-[80vh] p-6 bg-white border border-gray-300 rounded-lg">
          <p className="text-lg text-gray-700">Past Reports</p>
          <div className="mt-4">
            {Object.keys(pastReports).map((reportDate) => (
              <details key={reportDate} className="mb-2">
                <summary className="cursor-pointer text-gray-800 hover:text-black font-bold">
                  {reportDate}
                </summary>
                <p className="ml-4 text-gray-600">{pastReports[reportDate]}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="relative">
          <div className="w-[25vw] h-[80vh] p-6 bg-white border border-gray-300 rounded-lg">
            <div className="mb-4">
              <p className="text-2xl font-bold text-black mb-2">Patient: {patientName}</p>
              <div className="border-t border-timberwolf mb-2"></div>
              <p className="text-timberwolf mb-2">DOB: {dob}</p>
              <p className="text-timberwolf mb-2">Age: {age}</p>
              <p className="text-timberwolf mb-2">Insurance: {insurance}</p>
              <p className="text-timberwolf mb-2">Date: {appt_date}</p>
            </div>
            <label className="block mb-2 text-xl font-bold text-black">Notes</label>
            <textarea
              placeholder="Enter notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-[50%] p-4 mb-4 bg-gray-50 border border-gray-300 rounded-lg resize-none"
            />
            <button
              onClick={handleButtonClick}
              className="w-full p-2 text-white rounded bg-[#12aff1] hover:bg-[#0d97cf]"
            >
              Generate Text
            </button>
          </div>
          <div className="absolute left-0 top-0 h-full border-r-2 border-timberwolf"></div>
        </div>

        {/* Output Box */}
        <div className="w-[20vw] h-[80vh] p-6 bg-white border border-gray-300 rounded-lg overflow-y-auto">
          <div className="flex justify-between mb-4">
            <p className="text-2xl font-bold text-black">Codes Generated</p>
            <p className="text-2xl font-bold text-black">%</p>
          </div>
          <div className="border-t border-timberwolf mb-2"></div>
          <p className="text-xl font-bold text-black mb-2">Codes</p>
          {isGenerated ? (
            <p className="text-timberwolf">{generatedText}</p>
          ) : (
            <div>
              <p className="text-timberwolf mb-2">Code: suggested medical code</p>
              <p className="text-timberwolf mb-2">Description: formal description of code</p>
              <p className="text-timberwolf mb-2">Reference: clinical note reference code is sourced from</p>
              <p className="text-timberwolf mb-2">Alternatives: alternative code suggestions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MVPPage;
