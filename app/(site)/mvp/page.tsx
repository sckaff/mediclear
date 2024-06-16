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
  const [confidenceLevel, setConfidenceLevel] = useState('');

  const [codesGenerated, setCodesGenerated] = useState([
    {
      code: 'V91.07',
      confidence: '99.99%',
      details: {
        description: 'Burn due to water-skis on fire',
        reference: 'Burn injuries to bilateral lower extremities from water-skiing accident where skis caught fire',
        alternatives: [
          {
            code: 'X12',
            confidence: '37.09%',
            description: 'Contact with hot water, steam, gases or objects'
          },
          {
            code: 'X00-X08',
            confidence: '23.45%',
            description: 'Exposure to smoke, fire and flames'
          }
        ]
      },
      expanded: false
    },
    {
      code: 'V61.6XXD',
      confidence: '99.82%',
      details: {
        description: 'Passenger in heavy transport vehicle injured in collision with pedal cycle in traffic accident, subsequent encounter',
        reference: 'Blunt trauma and fractures after being a restrained passenger in a semi-truck that collided with a bicycle',
        alternatives: [
          {
            code: 'V47.6XXD',
            confidence: '90.43%',
            description: 'Passenger injured in collision with pedal cycle, subsequent encounter'
          },
          {
            code: 'V43.64XD',
            confidence: '89.67%',
            description: 'Car occupant injured in collision with pedestrian/cyclist, subsequent encounter'
          }
        ]
      },
      expanded: false
    },
    {
      code: 'V97.33XD',
      confidence: '98.99%',
      details: {
        description: 'Sucked into jet engine subsequent encounter',
        reference: 'Partial avulsion injuries to right arm from being briefly sucked into a jet engine',
        alternatives: [
          {
            code: 'W28.XXXD',
            confidence: '96.13%',
            description: 'Contact with other powered hand tools and household machinery, subsequent encounter'
          },
          {
            code: 'W24.XXXD',
            confidence: '90.89%',
            description: 'Contact with lifting and transmission devices, subsequent encounter'
          }
        ]
      },
      expanded: false
    },
    {
      code: 'W58.12',
      confidence: '98.20%',
      details: {
        description: 'Struck by crocodile',
        reference: 'Lacerations and bite wounds to left leg from crocodile attack',
        alternatives: [
          {
            code: 'W58.03',
            confidence: '56.89%',
            description: 'Bitten by crocodile or alligator'
          },
          {
            code: 'W59.22',
            confidence: '12.89%',
            description: 'Struck by other mammals, subsequent encounter'
          }
        ]
      },
      expanded: false
    },
    {
      code: 'R46.0',
      confidence: '100.00%',
      details: {
        description: 'Very low level of personal hygiene',
        reference: 'Poor hygiene noted, malodor present',
        alternatives: [
          {
            code: 'R46.1',
            confidence: '91.56%',
            description: 'Bizarre personal appearance'
          },
          {
            code: 'R46.0',
            confidence: '90.89%',
            description: 'Very low level of personal hygiene'
          }
        ]
      },
      expanded: false
    },
    {
      code: 'W51.XXXA',
      confidence: '97.98%',
      details: {
        description: 'Accidental striking against or bumped into by another person, sequela',
        reference: 'Bruising and contusions present, per patient "someone bumped into me"',
        alternatives: [
          {
            code: 'W22.XXXA',
            confidence: '98.56%',
            description: 'Striking against or struck by other objects, sequela'
          },
          {
            code: 'W51.XXXD',
            confidence: '98.52%',
            description: 'Striking against or bumped into by another person, subsequent encounter'
          }
        ]
      },
      expanded: false
    },
    {
      code: 'Y93.D',
      confidence: '99.57%',
      details: {
        description: 'Activities involved arts and handcrafts',
        reference: 'Calloused hands bilaterally from arts/crafts hobbies',
        alternatives: [
          {
            code: '72.8',
            confidence: '99.73%',
            description: 'Other problems related to lifestyle'
          },
          {
            code: 'Z55.9',
            confidence: '0.05%',
            description: 'Problems related to education and literacy, unspecified'
          }
        ]
      },
      expanded: false
    }
  ]);

  const handleButtonClick = () => {
    setGeneratedText(`Generated text from notes: ${notes}`);
    setIsGenerated(true);
    const today = new Date().toLocaleDateString('en-GB');
    setPastReports((prevReports) => ({
      ...prevReports,
      [today]: patientName,
    }));

    if (notes.includes('Patient presents with various injuries')) {
      setConfidenceLevel('99.87%');
    } else {
      setConfidenceLevel('');
    }
  };

  const toggleCodeDetails = (index) => {
    setCodesGenerated(codesGenerated.map((code, idx) => ({
      ...code,
      expanded: idx === index ? !code.expanded : false
    })));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-8">
        {/* Past Reports */}
        <div className="w-1/6 h-[80vh] p-6 bg-white border border-gray-300 rounded-lg">
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
          <div className="w-[28vw] h-[80vh] p-6 bg-white border border-gray-300 rounded-lg">
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
              Generate Codes
            </button>
          </div>
          <div className="absolute left-0 top-0 h-full border-r-2 border-timberwolf"></div>
        </div>

        {/* Output Box */}
        <div className="w-[20vw] h-[80vh] p-6 bg-white border border-gray-300 rounded-lg overflow-y-auto">
          <div className="flex justify-between mb-4">
            <p className="text-2xl font-bold text-black">Codes Generated</p>
            {confidenceLevel && (
              <p className="text-2xl font-bold text-black">{confidenceLevel}</p>
            )}
          </div>
          <div className="border-t border-timberwolf mb-2"></div>
          {isGenerated ? (
            <div>
              {codesGenerated.map((code, index) => (
                <div key={index} className="mb-4">
                  <p
                    onClick={() => toggleCodeDetails(index)}
                    className="cursor-pointer text-timberwolf"
                    >
                    <strong>{code.code}</strong> - {code.confidence}
                  </p>
                  {code.expanded && (
                    <div className="ml-4">
                      <p className="text-charcoal font-bold mb-2">Description:</p>
                      <p className="text-charcoal mb-2">{code.details.description}</p>
                      <p className="text-charcoal font-bold mb-2">Reference:</p>
                      <p className="text-charcoal mb-2">{code.details.reference}</p>
                      <p className="text-charcoal font-bold mb-2">Alternatives:</p>
                      {code.details.alternatives.length > 0 ? (
                        code.details.alternatives.map((alt, altIndex) => (
                          <div key={altIndex} className="ml-4">
                            <p className="text-charcoal mb-2">
                              <strong>{alt.code}</strong> - {alt.confidence}
                            </p>
                            <p className="text-charcoal mb-2">{alt.description}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-charcoal mb-2">No alternatives found.</p>
                      )}
                    </div>
                  )}
                  <hr className="border-t border-timberwolf" />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-timberwolf mb-2">Description: overview of medical code</p>
              <p className="text-timberwolf mb-2">Refernce: code citation within patient notes</p>
              <p className="text-timberwolf mb-2">Alternatives: alternative code suggestions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MVPPage;

