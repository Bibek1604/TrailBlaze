"use client"

import { useState } from "react"

export default function TopBar() {
  const [activeLocation, setActiveLocation] = useState(0)

  const locations = [
    { name: "Annapurna", rating: 4.9, reviews: 128 },
    { name: "Everest Region", rating: 4.8, reviews: 156 },
    { name: "Pokhara", rating: 4.7, reviews: 112 },
  ]

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <CloudIcon className="absolute right-[10%] top-[15%] h-24 w-24 text-white/20" />
        <CloudIcon className="absolute left-[5%] top-[35%] h-16 w-16 text-white/20" />
        <TreePineIcon className="absolute bottom-[10%] left-[8%] h-32 w-32 text-green-200/30" />
        <TreePineIcon className="absolute bottom-[15%] left-[12%] h-20 w-20 text-green-200/30" />
        <MountainIcon className="absolute -bottom-10 right-0 h-64 w-64 rotate-6 text-emerald-200/30" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-12 md:gap-12 md:px-8 md:py-20 lg:py-24">
        {/* Content Side */}
        <div className="relative z-10 md:col-span-5 lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
            <TreePineIcon className="h-4 w-4" />
            Discover Nepal's Natural Beauty
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-5xl md:text-6xl">
            Explore the{" "}
            <span className="relative">
              Himalayas
              <span className="absolute -bottom-2 left-0 h-3 w-full bg-emerald-300/40"></span>
            </span>{" "}
            in Nepal
          </h1>

          <p className="mt-6 max-w-lg text-lg text-emerald-800/80">
            Journey through breathtaking mountain landscapes, ancient temples, and vibrant cultures in one of the
            world's most beautiful countries.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="group flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700">
              Start Your Journey
              <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button className="rounded-md border border-emerald-200 bg-white/80 px-4 py-2 font-medium text-emerald-800 backdrop-blur-sm transition-colors hover:bg-emerald-50">
              View Popular Trails
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              {
                icon: <MountainIcon className="h-6 w-6" />,
                label: "8 Mountain Ranges",
                color: "bg-amber-100 text-amber-700",
              },
              { icon: <MapPinIcon className="h-6 w-6" />, label: "1,000+ Trails", color: "bg-blue-100 text-blue-700" },
              {
                icon: <UsersIcon className="h-6 w-6" />,
                label: "Expert Guides",
                color: "bg-emerald-100 text-emerald-700",
              },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.color}`}>
                  {feature.icon}
                </div>
                <div className="text-sm font-medium text-emerald-800">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Map & Image Side */}
        <div className="relative z-10 md:col-span-7 lg:col-span-7">
          <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-2xl md:h-[500px] lg:h-[600px]">
            {/* This would be where you'd place your actual map of Nepal */}
            <div className="absolute inset-0 bg-emerald-200/30 backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <CompassIcon className="h-16 w-16 animate-pulse text-emerald-700/50" />
              </div>

              {/* Map Placeholder - Replace with actual map */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c0/New-Map-of-Nepal-Vector-Map.svg"
                alt="Map of Nepal"
                className="h-full w-full object-cover opacity-80"
              />

              {/* Map Markers */}
              {[
                { top: "30%", left: "40%", pulse: true },
                { top: "45%", left: "60%", pulse: false },
                { top: "60%", left: "30%", pulse: false },
              ].map((marker, i) => (
                <div
                  key={i}
                  className="absolute z-20 cursor-pointer"
                  style={{ top: marker.top, left: marker.left }}
                  onClick={() => setActiveLocation(i)}
                >
                  <div className="relative">
                    <MapPinIcon
                      className={`h-8 w-8 ${activeLocation === i ? "text-rose-500" : "text-emerald-700"}`}
                      fill={activeLocation === i ? "rgba(244, 63, 94, 0.2)" : "rgba(4, 120, 87, 0.2)"}
                    />
                    {marker.pulse && (
                      <span className="absolute -inset-1 animate-ping rounded-full bg-rose-400 opacity-75"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-6 right-6 w-64 rounded-lg border-none bg-white/80 p-4 shadow-lg backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-semibold uppercase text-emerald-600">Featured Location</div>
                <div className="flex items-center gap-1 text-amber-500">
                  <StarIcon className="h-3 w-3 fill-amber-500" />
                  <span className="text-xs font-medium">{locations[activeLocation].rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-emerald-900">{locations[activeLocation].name}</h3>

              <div className="mt-3 flex items-center gap-3 text-sm text-emerald-700">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>Best: Oct-Nov</span>
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="h-3.5 w-3.5" />
                  <span>{locations[activeLocation].reviews}</span>
                </div>
              </div>

              <button className="mt-2 p-0 text-sm font-medium text-emerald-600 hover:underline">View Details</button>
            </div>
          </div>


        </div>
      </div>

      {/* Bottom Feature Bar */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 md:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-white/60 p-4 shadow-lg backdrop-blur-md md:grid-cols-4 md:gap-8 md:p-6">
          {[
            { icon: <CompassIcon className="h-6 w-6" />, label: "Guided Tours" },
            { icon: <WindIcon className="h-6 w-6" />, label: "Eco Tourism" },
            { icon: <MountainIcon className="h-6 w-6" />, label: "Trekking Packages" },
            { icon: <CameraIcon className="h-6 w-6" />, label: "Photography Tours" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-emerald-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                {feature.icon}
              </div>
              <div className="text-sm font-medium md:text-base">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Icon Components
function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}

function TreePineIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
      <path d="M12 22v-3" />
    </svg>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function CompassIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function CloudRainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  )
}

function WindIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  )
}

function CameraIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}

