import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import { addProfile, updateProfile } from "../redux/actions/profileActions";

const ProfileList = () => {
  const profiles = useSelector((state) => state.profiles.profiles);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleAddProfile = () => {
    setEditingProfile(null);
    setShowForm(true);
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    setShowForm(true);
  };

  const handleSubmit = (profileData) => {
    if (editingProfile) {
      dispatch(
        updateProfile({
          ...profileData,
          id: editingProfile.id,
        })
      );
    } else {
      const newId = Math.max(...profiles.map((p) => p.id), 0) + 1;
      dispatch(
        addProfile({
          ...profileData,
          id: newId,
        })
      );
    }
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex justify-center flex-col">
      {/* Header with animated gradient border */}
      <div className="relative mb-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <div className="relative flex justify-between items-center bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profile Dashboard
          </h1>
          <button
            onClick={handleAddProfile}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 font-medium relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Add New Profile
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
          </button>
        </div>
      </div>

      {/* Form Section with smooth entrance animation */}
      {showForm && (
        <div className="mb-10 animate-fade-in-up">
          <ProfileForm
            profile={editingProfile}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Profile Cards Grid */}
      {profiles.length > 0 ? (
        <div className="flex flex-col my-6 w-full justify-center">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className=" hover:-translate-y-2 hover:shadow-xl my-2"
            >
              <ProfileCard profile={profile} onEdit={handleEditProfile} />
            </div>
          ))}
        </div>
      ) : (
        // Empty State with animation
        <div className="text-center py-16 animate-pulse-slow">
          <div className="mx-auto h-48 w-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No profiles found
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first profile
          </p>
          <button
            onClick={handleAddProfile}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md"
          >
            Create Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileList;
