
function VisitCountry() {
  return (
    <div>
            <div className='ml-10 text-4xl text-green-800 mt-14 font-poppins'>
                Travel Nepal
            </div>
            <div className='mt-10 ml-10 text-sm text-blue-800'>
                At your own pace
                </div>
                <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <button className="px-6 py-2 font-bold text-white transition bg-green-500 rounded shadow-md hover:bg-green-600">
        Province
      </button>
      <button className="px-6 py-2 font-bold text-white transition bg-yellow-500 rounded shadow-md hover:bg-yellow-600">
        District
      </button>
      <button className="px-6 py-2 font-bold text-white transition bg-blue-500 rounded shadow-md hover:bg-blue-600">
        City
      </button>
      <button className="px-6 py-2 font-bold text-white transition bg-red-500 rounded shadow-md hover:bg-red-600">
        Village
      </button>
    </div>
    </div>
  )
}

export default VisitCountry