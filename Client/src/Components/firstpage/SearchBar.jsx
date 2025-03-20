import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDestination: "",
      selectedActivity: "",
      selectedDuration: "",
    };
  }

  // Sample static data for destinations, activities, and durations
  items = [
    { id: 1, name: "Annapurna Circuit", activity: "Trekking", traveltimeinday: "5 days" },
    { id: 2, name: "Everest Base Camp", activity: "Hiking", traveltimeinday: "10 days" },
    { id: 3, name: "Langtang Valley", activity: "Sightseeing", traveltimeinday: "7 days" },
    { id: 4, name: "Pokhara", activity: "Relaxation", traveltimeinday: "3 days" },
    { id: 5, name: "Chitwan National Park", activity: "Wildlife Safari", traveltimeinday: "4 days" },
  ];

  // Unique destinations, activities, and durations
  destinations = [...new Set(this.items.map((item) => item.name))];
  activities = [...new Set(this.items.map((item) => item.activity))];
  durations = [...new Set(this.items.map((item) => item.traveltimeinday))];

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  handleSearch = () => {
    console.log("Search with:", this.state);
    // Implement search functionality here
  };

  render() {
    const { selectedDestination, selectedActivity, selectedDuration } = this.state;

    return (
      <div className="max-w-6xl mx-auto mt-12 px-6 py-8 bg-gradient-to-br from-teal-50 via-white to-teal-50 rounded-3xl shadow-xl border border-teal-100 transform transition-all hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
          Plan Your Dream Adventure
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg">Explore breathtaking destinations tailored to your style</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Destination Dropdown */}
          <div className="relative group">
            <label
              htmlFor="destination"
              className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-teal-600"
            >
              Destination
            </label>
            <select
              id="destination"
              value={selectedDestination}
              onChange={(e) => this.handleChange(e, "selectedDestination")}
              className="block w-full pl-4 pr-10 py-4 text-base bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm hover:border-teal-300 transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="">All Destinations</option>
              {this.destinations.map((destination, index) => (
                <option key={index} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Activity Dropdown */}
          <div className="relative group">
            <label
              htmlFor="activity"
              className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-teal-600"
            >
              Activity
            </label>
            <select
              id="activity"
              value={selectedActivity}
              onChange={(e) => this.handleChange(e, "selectedActivity")}
              className="block w-full pl-4 pr-10 py-4 text-base bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm hover:border-teal-300 transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="">All Activities</option>
              {this.activities.map((activity, index) => (
                <option key={index} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Duration Dropdown */}
          <div className="relative group">
            <label
              htmlFor="duration"
              className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-teal-600"
            >
              Duration
            </label>
            <select
              id="duration"
              value={selectedDuration}
              onChange={(e) => this.handleChange(e, "selectedDuration")}
              className="block w-full pl-4 pr-10 py-4 text-base bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm hover:border-teal-300 transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="">Any Duration</option>
              {this.durations.map((duration, index) => (
                <option key={index} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={this.handleSearch}
              className="w-full flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-teal-600 to-green-600 rounded-lg hover:from-teal-700 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-teal-300 shadow-md transform transition-all duration-300 hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar;