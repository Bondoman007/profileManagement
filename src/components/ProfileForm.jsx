import React, { useState, useEffect } from "react";

const ProfileForm = ({ profile, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
    image: "",
    bio: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        address: profile.address,
        lat: profile.location.lat,
        lng: profile.location.lng,
        image: profile.image,
        bio: profile.bio,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      location: {
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
      },
    });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-90 border border-gray-100 transform transition-all duration-300 hover:shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
        {profile ? "Edit Profile" : "Create New Profile"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 group-focus-within:text-blue-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:border-blue-300"
              required
              placeholder="Enter full name"
            />
          </div>

          {/* Image URL Field */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 group-focus-within:text-blue-600">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:border-blue-300"
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Address Field */}
          <div className="relative group md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 group-focus-within:text-blue-600">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:border-blue-300"
              required
              placeholder="Street, City, Country"
            />
          </div>

          {/* Latitude Field */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 group-focus-within:text-blue-600">
              Latitude
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:border-blue-300 pr-10"
                required
                placeholder="e.g. 40.7128"
              />
              <span className="absolute right-3 top-3.5 text-gray-400">°N</span>
            </div>
          </div>

          {/* Longitude Field */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 group-focus-within:text-blue-600">
              Longitude
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:border-blue-300 pr-10"
                required
                placeholder="e.g. -74.0060"
              />
              <span className="absolute right-3 top-3.5 text-gray-400">°W</span>
            </div>
          </div>

          {/* Bio Field */}
          <div className="relative group md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300 group-focus-within:text-blue-600">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:border-blue-300 min-h-[120px]"
              rows="3"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 font-medium border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 font-medium relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              {profile ? "Update Profile" : "Create Profile"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
