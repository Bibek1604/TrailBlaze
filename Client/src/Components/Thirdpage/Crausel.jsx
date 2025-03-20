function Crausel() {
  const imagePath = "https://www.holidaystonepal.in/media/files/Blogs/Pashupatinath-Temple-Photos/Pashupatinath-Temple.png"

  return (
    <div>
      <div className="w-full bg-white">
        <section className="w-full bg-white">
          <div className="grid max-w-screen-xl gap-4 px-4 py-8 mx-auto sm:grid-cols-2 md:grid-cols-5">
            {/* Pokhara Card */}
            <div className="flex flex-col col-span-2 bg-gray-50">
              <a
                href="#"
                className="relative flex flex-col flex-grow px-4 pt-40 pb-4 overflow-hidden rounded-lg group"
              >
                <img
                  src={imagePath}
                  alt="Pokhara"
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white">
                  Pokhara
                </h3>
              </a>
            </div>

            {/* Rotang La Pass with Manang & Mustang */}
            <div className="flex flex-col col-span-2 gap-4">
              <a
                href="#"
                className="relative flex flex-col px-4 pt-40 pb-4 mb-4 overflow-hidden rounded-lg group"
              >
                <img
                  src={imagePath}
                  alt="Rotang La Pass"
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white">
                  Rotang La Pass
                </h3>
              </a>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="relative flex flex-col px-4 pt-40 pb-4 overflow-hidden rounded-lg group"
                >
                  <img
                    src={imagePath}
                    alt="Manang"
                    className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white">
                    Manang
                  </h3>
                </a>
                <a
                  href="#"
                  className="relative flex flex-col px-4 pt-40 pb-4 overflow-hidden rounded-lg group"
                >
                  <img
                    src={imagePath}
                    alt="Mustang"
                    className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white">
                    Mustang
                  </h3>
                </a>
              </div>
            </div>

            {/* Sagarmatha Card */}
            <div className="flex flex-col bg-gray-50">
              <a
                href="#"
                className="relative flex flex-col flex-grow px-4 pt-40 pb-4 overflow-hidden rounded-lg group"
              >
                <img
                  src={imagePath}
                  alt="Sagarmatha"
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white">
                  Sagarmatha
                </h3>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Crausel;
