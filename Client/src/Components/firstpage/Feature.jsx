import phoneImage from '../../assets/phone.png';  // Replace with your image path
import camp from '../../assets/camp.svg';          // Replace with your image paths for the icons
import map from '../../assets/map.svg';
import future from '../../assets/futurebg.png';  // Background pattern image

const Features = () => {
  return (
    <section className="relative flex-col py-24 overflow-hidden bg-center bg-no-repeat flexCenter max-container padding-container lg:mb-10 font-poppins">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-90">  {/* Adjust opacity for better blending */}
        <img
          src={future} // Insert your background image here
          alt="background pattern"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative z-10 flex justify-end w-full">
        {/* Left Phone Image */}
        <div className="flex flex-1 lg:min-h-[900px] items-center justify-center">
          <img
            src={phoneImage} // Insert your phone image here
            alt="phone"
            width={440}
            height={1000}
            className="feature-phone"
          />
        </div>

        {/* Right Side with Features */}
        <div className="z-20 flex flex-col w-full lg:w-[60%]">
          <div className="relative">
            <img
              src={camp} // Placeholder for camp image
              alt="camp"
              width={50}
              height={50}
              className="absolute left-[-5px] top-[-28px] w-10 lg:w-[50px]"
            />
            <h2 className="text-4xl font-bold lg:text-6xl">Our Features</h2> {/* Adjusted font size */}
          </div>

          {/* Feature List */}
          <ul className="grid gap-10 mt-10 sm:grid-cols-2 lg:mt-20 lg:gap-20">
            <FeatureItem
              title="Real Maps Can Be Offline"
              icon={map} // Replace with your first icon image
              description="We provide a solution for you to be able to use our application when climbing, yes offline maps you can use at any time there is no signal at the location."
            />
            <FeatureItem
              title="Set An Adventure Schedule"
              icon={map} // Replace with your second icon image
              description="Schedule an adventure with friends. On holidays, there are many interesting offers from Hilink. That way, there's no more discussion."
            />
            <FeatureItem
              title="Technology Using Augment Reality"
              icon={map} // Replace with your third icon image
              description="Technology uses augmented reality as a guide to your hiking trail in the forest to the top of the mountain. Already supported by the latest technology without an internet connection."
            />
            <FeatureItem
              title="Many New Locations Every Month"
              icon={map} // Replace with your fourth icon image
              description="Lots of new locations every month, because we have a worldwide community of climbers who share their best experiences with climbing."
            />
          </ul>
        </div>
      </div>
    </section>
  );
};

// eslint-disable-next-line react/prop-types
const FeatureItem = ({ title, icon, description }) => {
  return (
    <li className="flex flex-col items-start flex-1 w-full">
      <div className="p-4 bg-green-800 rounded-full lg:p-5">
        <img src={icon} alt={title} width={30} height={30} />
      </div>
      <h2 className="mt-5 text-lg font-bold capitalize lg:text-2xl">{title}</h2> {/* Adjusted font size */}
      <p className="mt-5 regular-16 text-gray-700 lg:mt-[30px] lg:bg-none">
        {description}
      </p>
    </li>
  );
};

export default Features;
