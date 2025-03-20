import { useState } from "react";
import Footer from "../navbar/Footer";

function Faq() {
  const [open, setOpen] = useState("null");
  const toggleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  const faqData = [

    {
      question: "What is Pashupatinath Temple?",
      answer:
        "Pashupatinath Temple is one of the holiest temples in Nepal, dedicated to Lord Shiva. It is located in Kathmandu and is a UNESCO World Heritage Site. The temple complex consists of several shrines, including the main temple, believed to be over 2,000 years old. It is an important pilgrimage site for Hindus worldwide.",
    },
    {
      question: "When is the best time to visit Pashupatinath?",
      answer:
        "The best time to visit Pashupatinath is during the Maha Shivaratri festival, typically held in February or March. This is when the temple sees a large influx of visitors and devotees, but it can be visited year-round.",
    },
    {
      question: "Can non-Hindus enter the Pashupatinath temple?",
      answer:
        "Non-Hindus are not allowed to enter the main temple, but they can visit the outer areas and witness the religious activities. The temple complex is open to all visitors, and there are other shrines and areas that non-Hindus can explore.",
    },
    {
      question: "What is the significance of the Bagmati River at Pashupatinath?",
      answer:
        "The Bagmati River holds significant religious value in Hinduism. It is the site of cremation rituals, and the ashes of the deceased are often scattered in the river. The river symbolizes the cycle of life, death, and rebirth.",
    },
    {
      question: "How old is Pashupatinath Temple?",
      answer:
        "Pashupatinath Temple is believed to be over 2,000 years old. While the exact date of its construction is unclear, it has been a center of worship for centuries and remains a key religious site in Nepal.",
    },
  ];

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
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
          ))}
        </div>

        {/* About Pashupatinath Section */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900">About Pashupatinath</h3>
          <p className="mt-4 text-gray-700">
            Pashupatinath is one of the holiest temples in Nepal and an important pilgrimage site for Hindus around the world. Located in Kathmandu, it is dedicated to Lord Shiva and is a UNESCO World Heritage Site. The temple complex consists of several shrines, including the main temple, which is believed to be over 2,000 years old. Pashupatinath is known for its magnificent architecture, peaceful surroundings, and the sacred Bagmati River, where cremation rituals take place. Visitors can experience the spirituality, culture, and traditions of Nepal by visiting Pashupatinath.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Faq;
