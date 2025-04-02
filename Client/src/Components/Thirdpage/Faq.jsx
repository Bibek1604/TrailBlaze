import { useState } from "react";
import Footer from "../navbar/Footer";

function Faq({ faqs }) {
  const [open, setOpen] = useState(null);

  // Handle faqs prop with fallback to empty array
  const faqData = Array.isArray(faqs) ? faqs : [];

  // Toggle FAQ accordion
  const toggleOpen = (index) => {
    setOpen((prevOpen) => (prevOpen === index ? null : index));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="max-w-4xl p-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqData.length > 0 ? (
            faqData.map((faq, index) => (
              <div
                key={faq.id || index} // Use faq.id if available from backend, fallback to index
                className="overflow-hidden bg-white rounded-lg shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                  aria-expanded={open === index}
                  aria-controls={`faq-answer-${faq.id || index}`}
                >
                  <span className="text-lg font-medium text-gray-800 pr-4">
                    {faq.question || "Unnamed Question"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      open === index ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {open === index && (
                  <div
                    id={`faq-answer-${faq.id || index}`}
                    className="p-4 text-gray-600 bg-white border-t border-gray-200 animate-fade-in"
                  >
                    {faq.answer || "No answer provided"}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <p className="text-gray-600">
                No FAQs available for this place yet.
              </p>
            </div>
          )}
        </div>

        {/* About Section - Could be made dynamic with a prop */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900">About This Place</h3>
          <p className="mt-4 text-gray-600">
            {/* This could be passed as a prop from the parent component */}
            Additional details about this location will be displayed here when available.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Faq;