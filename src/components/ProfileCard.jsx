import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProfile } from "../redux/actions/profileActions";
import { useNavigate } from "react-router-dom";
import {
  LocationMarkerIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import ProfileModal from "./ProfileModal";

const ProfileCard = ({ profile, onEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this profile?")) {
      dispatch(deleteProfile(profile.id));
    }
  };

  const handleLocate = (e) => {
    e.stopPropagation();
    navigate(`/map/${profile.id}`);
  };

  const handleEdit = (e) => {
    // e.stopPropagation();
    onEdit(profile);
    setShowModal(false);
  };

  return (
    <>
      {/* Profile Card */}
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="p-5">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={profile.image || "https://via.placeholder.com/150"}
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                #{profile.id}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">
                {profile.name}
              </h3>
              <p className="text-gray-600 text-sm">{profile.address}</p>
              <p className="mt-2 text-gray-700 line-clamp-2">
                {profile.bio || "No bio provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 flex justify-between border-t border-gray-200">
          <button
            onClick={handleLocate}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center group"
          >
            <LocationMarkerIcon className="h-5 w-5 mr-1 group-hover:animate-bounce" />
            Locate
          </button>

          <div className="flex space-x-2">
            {/* <button
              onClick={() => handleEdit()}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center group"
            >
              <PencilAltIcon className="h-5 w-5 mr-1 group-hover:animate-pulse" />
              Edit
            </button> */}

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center group"
            >
              <TrashIcon className="h-5 w-5 mr-1 group-hover:animate-wiggle" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
