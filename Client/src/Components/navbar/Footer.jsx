import np from '../../assets/np.png';
import facebookIcon from '../../assets/facebook.png';
import instagramIcon from '../../assets/instagram.png';
import twitterIcon from '../../assets/twitter.png';
import linkedinIcon from '../../assets/linkedin.png';
import { useLocation } from 'react-router-dom';
function Footer() {

  return (
    <>
        <img
          src={np}
          alt="Nepal"
          className="object-cover w-full h-full opacity-50 mt-14"
        />      <div className="relative w-full h-80 bg-gradient-to-b from-green-700 to-green-500">

        <footer className="py-16 bg-gray-50">
          <div className="container px-6 mx-auto md:px-12">
            <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2 lg:grid-cols-4">
              {/* Contacts Section */}
              <div>
                <h2 className="mb-4 font-serif text-3xl text-green-800">Contacts</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="transition duration-200">Kathmandu, Nepal</li>
                  <li className="transition duration-200">Calltobibek@gmail.com</li>
                  <li className="transition duration-200">+977 9860056658</li>
                </ul>
              </div>

              {/* Explore Section */}
              <div>
                <h2 className="mb-4 font-serif text-3xl text-green-800">Explore</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="transition duration-200">Category</li>
                  <li className="transition duration-200">Feature</li>
                  <li className="transition duration-200">Search</li>
                </ul>
              </div>

              {/* Company Section */}
              <div>
                <h2 className="mb-4 font-serif text-3xl text-green-800">Company</h2>
                <p className="text-gray-600 transition duration-200">
                  The company is registered under Bibek Pandey. Our mission is to promote Nepal's
                  tourism and showcase the beauty and culture of the Himalayas.
                </p>
              </div>

              {/* Help Center Section */}
              <div>
                <h2 className="mb-4 font-serif text-3xl text-green-800">Help Center</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="transition duration-200">Contact</li>
                  <li className="transition duration-200">Terms & Conditions</li>
                  <li className="transition duration-200">Feedback</li>
                  <li className="transition duration-200">Join Our Team</li>
                </ul>
              </div>
            </div>

            {/* New Content Section (Call to Action) */}
            <div className="mt-12 text-center">
              <h3 className="text-4xl font-serif text-gray-800 mb-4">Join Our Adventure!</h3>
              <p className="text-lg text-gray-600 mb-6">
                Be part of an exciting journey! Explore the majestic mountains and the rich culture
                of Nepal.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-green-600 text-white text-xl rounded-lg hover:bg-green-700 transition duration-300"
              >
                Get in Touch
              </a>
            </div>

            <div className="flex flex-col items-center mt-16 md:flex-row md:justify-between">
              {/* Left Section */}
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Bibek Pandey. All rights reserved.
                </p>
              </div>

              {/* Social Media Section */}
              <div className="flex mt-4 space-x-6 md:mt-0">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src={facebookIcon}
                    alt="Facebook"
                    className="w-12 h-12 transition duration-200 ease-in-out transform hover:scale-110 hover:rotate-[10deg]"
                  />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="w-12 h-12 transition duration-200 ease-in-out transform hover:scale-110 hover:rotate-[10deg]"
                  />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src={twitterIcon}
                    alt="Twitter"
                    className="w-12 h-12 transition duration-200 ease-in-out transform hover:scale-110 hover:rotate-[10deg]"
                  />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src={linkedinIcon}
                    alt="LinkedIn"
                    className="w-12 h-12 transition duration-200 ease-in-out transform hover:scale-110 hover:rotate-[10deg]"
                  />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
