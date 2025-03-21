import { useState } from "react";
import Footer from "../navbar/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchDetails } from "../api/Details";

function Faq() {
  const [open, setOpen] = useState(null); // Correct initial state
  const toggleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  const { data: faqData, isLoading, error } = useQuery(["details"], fetchDetails);

  // Handle loading state
  if (isLoading) {
    return <p className="text-center text-gray-600">Loading FAQs...</p>;
  }

  // Handle error state
  if (error) {
    return <p className="text-center text-red-600">Failed to load FAQs. Please try again.</p>;
  }

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData?.map((faq, index) => (
            <div key={index} className="overflow-hidden bg-white rounded-lg shadow-lg">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === index && (
                <div id={`faq-answer-${index}`} className="p-4 text-gray-700 border-t border-gray-200 bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Faq;
