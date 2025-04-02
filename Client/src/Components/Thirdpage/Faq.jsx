import { useState } from "react";
import Footer from "../navbar/Footer";

function Faq({ faqs }) {
  const [open, setOpen] = useState(null); // Changed "null" string to null value
  const toggleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  // Use faqs prop from backend, with fallback to empty array if undefined
  const faqData = faqs || [];

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.length > 0 ? (
            faqData.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden bg-white rounded-lg shadow-lg"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="flex items-center justify-between w-full p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-expanded={open === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform transform ${
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
                    id={`faq-answer-${index}`}
                    className="p-4 text-gray-700 border-t border-gray-200 bg-gray-50"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center">
              No FAQs available for this place.
            </p>
          )}
        </div>

        {/* About Section - Optional: You could make this dynamic too */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900">About This Place</h3>
          <p className="mt-4 text-gray-700">
            {/* You could pass a description prop here if available */}
            Details about this place will be updated based on the selected location.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Faq;