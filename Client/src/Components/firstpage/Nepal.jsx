import npl from '../../assets/npl.png';

function Nepal() {
  return (
    <div className="relative w-screen h-screen">
      {/* Full-screen background image */}
      <img
        src={npl}
        alt="background pattern"
        className="absolute inset-0 object-cover w-full h-full"
      />
      {/* Overlay for darkening effect */}
      <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-white to-transparent" />                        {/* Bottom gradient overlay */}

      <div className="absolute inset-0 bg-white opacity-50" />
      {/* Optional content on top of the image */}
      <div className="relative z-10 flex items-center justify-center h-full text-white">
      <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-white to-transparent" />                        {/* Bottom gradient overlay */}

        {/* <h1 className="text-5xl font-bold">Welcome to Nepal</h1> */}
      </div>
    </div>
  );
}

export default Nepal;
