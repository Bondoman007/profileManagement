import React from "react";
import {
  XIcon,
  LocationMarkerIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

const ProfileModal = ({ profile, onClose, onEdit, onLocate }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 backdrop-blur-xs bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal Content */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
          >
            <XIcon className="h-6 w-6 text-gray-600" />
          </button>

          {/* Profile Image */}
          <div className="relative h-48 w-full bg-gradient-to-r from-blue-100 to-purple-100 overflow-hidden">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=Profile+Image";
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-5xl text-gray-400 font-bold">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="px-6 py-5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-500">{profile.address}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ID: {profile.id}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Location Coordinates
                </h3>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Latitude</p>
                    <p className="font-medium">
                      {profile.location?.lat || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Longitude</p>
                    <p className="font-medium">
                      {profile.location?.lng || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Bio
                </h3>
                <p className="mt-1 text-gray-700 whitespace-pre-line">
                  {profile.bio || "No bio provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
            <div className="flex space-x-3">
              <button
                onClick={(e) => {
                  onEdit();
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <PencilAltIcon className="-ml-1 mr-2 h-5 w-5" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  onLocate();
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LocationMarkerIcon className="-ml-1 mr-2 h-5 w-5" />
                Locate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
