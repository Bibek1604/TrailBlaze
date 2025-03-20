import np from '../../assets/np.png';
import facebookIcon from '../../assets/facebook.png'; // Add the Facebook icon
import instagramIcon from '../../assets/instagram.png'; // Add the Instagram icon
import twitterIcon from '../../assets/twitter.png'; // Add the Twitter icon
import linkedinIcon from '../../assets/linkedin.png'; // Add the LinkedIn icon

function Footer() {
  return (
    <>
      <div className="relative w-full h-64 ">
        <img
          src={np}
          alt="Nepal"
          className="object-cover w-full h-full opacity-70"
        />
        <footer className="py-10 bg-main">
          <div className="container px-6 mx-auto md:px-12">
            <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2 lg:grid-cols-4">
              {/* Contacts Section */}
              <div>
                <h2 className="mb-4 font-serif text-2xl text-green-800">Contacts</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="transition duration-200 ">Kathmandu, Nepal</li>
                  <li className="transition duration-200 ">Calltobibek@gmail.com</li>
                  <li className="transition duration-200 ">+977 9860056658</li>
                </ul>
              </div>

              {/* Explore Section */}
              <div>
                <h2 className="mb-4 font-serif text-2xl text-green-800">Explore</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="transition duration-200 ">Category</li>
                  <li className="transition duration-200 ">Feature</li>
                  <li className="transition duration-200 =">Search</li>
                </ul>
              </div>

              {/* Company Section */}
              <div>
                <h2 className="mb-4 font-serif text-2xl text-green-800">Company</h2>
                <p className="text-gray-600 transition duration-200 ">
                  The company is registered under Bibek Pandye.
                </p>
              </div>

              {/* Help Center Section */}
              <div>
                <h2 className="mb-4 font-serif text-2xl text-green-800">Help Center</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="transition duration-200">Contact</li>
                  <li className="transition duration-200">Terms & Conditions</li>
                  <li className="transition duration-200">Feedback</li>
                  <li className="transition duration-200">Join Our Team</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center mt-10 md:flex-row md:justify-between">
              {/* Left Section */}
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Bibek Pandye. All rights reserved.
                </p>
              </div>

              {/* Social Media Section */}
              <div className="flex mt-4 space-x-4 md:mt-0">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src={facebookIcon}
                    alt="Facebook"
                    className="w-10 h-10 transition duration-200 ease-in-out transform hover:scale-[1.3] hover:rotate-[15deg]"
                  />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="w-10 h-10 transition duration-200 ease-in-out transform hover:scale-[1.3] hover:rotate-[15deg]"
                  />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src={twitterIcon}
                    alt="Twitter"
                    className="w-10 h-10 transition duration-200 ease-in-out transform hover:scale-[1.3] hover:rotate-[15deg]"
                  />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <img
                    src={linkedinIcon}
                    alt="LinkedIn"
                    className="w-10 h-10 transition duration-200 ease-in-out transform hover:scale-[1.3] hover:rotate-[15deg]"
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
