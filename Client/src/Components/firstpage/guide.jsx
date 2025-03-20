import boat from '../../assets/boat.jpg';
import camp from '../../assets/camp.svg';
import step from '../../assets/Step.png';

const Guide = () => {
  return (
    <section className="flex-col bg-white flexCenter">
      <div className="w-full pb-24 padding-container max-container ml-14">
        <img src={camp} alt="camp" width={50} height={50} />
        <p className="text-4xl font-bold text-green-800 lg:text-6xl">
          We are here for you
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px] text-gray-800">
            Guide You to Easy Path
          </h2>
          <p className="regular-16 text-gray-600 xl:max-w-[520px]">
            With the Hilink application, you will no longer get lost in the wilderness. 
            We support offline maps for when there is no internet connection. 
            Invite your friends and family to explore the valleys and reach the peaks together!
          </p>
        </div>
      </div>

      <div className="relative w-full flexCenter max-container">
        <img 
          src={boat}
          alt="boat"
          width={1440}
          height={580}
          className="object-cover object-center w-full shadow-lg rounded-xl opacity-15"
        />
        
        <div className="absolute flex flex-wrap gap-3 md:left-[5%] lg:top-20">
          <div className="flex items-center p-1 bg-yellow-200 border border-gray-300 rounded shadow-md W-54">
            <img 
              src={step}
              alt="step"
              width={30}
              height={30}
              className="w-auto h-auto border-none" // Remove border
            />
            <div className="flex flex-col ml-2">
              <p className="text-gray-800 bold-20">Your Note Here</p> {/* Placeholder for your note */}
            </div>
          </div>
          {/* You can duplicate the above div to add more notes if needed */}
        </div>
      </div>
    </section>
  );
};

export default Guide;
