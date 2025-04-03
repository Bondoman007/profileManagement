import React from "react";
import { useDispatch } from "react-redux";
import { deleteProfile } from "../redux/actions/profileActions";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profile, onEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteProfile(profile.id));
  };

  const handleLocate = () => {
    navigate(`/map/${profile.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {profile.name}
            </h3>
            <p className="text-gray-600">{profile.address}</p>
          </div>
        </div>
        <p className="mt-3 text-gray-700">{profile.bio}</p>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex justify-between">
        <button
          onClick={handleLocate}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Locate
          <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>

        <div className="space-x-3">
          <button
            onClick={() => onEdit(profile)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 group"
          >
            Edit
            <span className="ml-1 inline-block transition-transform group-hover:rotate-45">
              ✎
            </span>
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 group relative overflow-hidden"
          >
            <span className="relative z-10">Delete</span>
            <span className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            <span className="ml-1 inline-block transition-transform group-hover:scale-125">
              ×
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
