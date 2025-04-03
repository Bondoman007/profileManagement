import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const MapPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profiles = useSelector((state) => state.profiles.profiles);
  const [profile, setProfile] = useState(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Changed to useRef
  const markerInstance = useRef(null); // Changed to useRef
  const [mapError, setMapError] = useState(null);

  // Find the profile
  useEffect(() => {
    const foundProfile = profiles.find((p) => p.id === parseInt(id));
    if (foundProfile) {
      setProfile(foundProfile);
    } else {
      navigate("/");
    }
  }, [id, profiles, navigate]);

  // Initialize map
  useEffect(() => {
    if (!profile || !window.google || !mapRef.current) return;

    let map;
    let marker;

    try {
      // Create map instance
      map = new window.google.maps.Map(mapRef.current, {
        center: profile.location,
        zoom: 12,
      });

      // Create marker
      marker = new window.google.maps.Marker({
        position: profile.location,
        map: map,
        title: profile.name,
      });

      // Store instances in refs
      mapInstance.current = map;
      markerInstance.current = marker;
      setMapError(null);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Failed to load map. Please try again later.");
    }

    // Cleanup function
    return () => {
      if (marker) {
        marker.setMap(null); // Remove marker from map
      }
      if (map) {
        // Clean up map event listeners if any were added
        window.google.maps.event.clearInstanceListeners(map);
      }
    };
  }, [profile]);

  const handleBack = () => {
    navigate("/");
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Location of {profile.name}
          </h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Back to Profiles
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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
        </div>

        {mapError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {mapError}
          </div>
        ) : (
          <div
            ref={mapRef}
            className="w-full h-96 rounded-lg shadow-md bg-gray-200"
          >
            {!mapInstance.current && (
              <div className="flex items-center justify-center h-full">
                Loading map...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
