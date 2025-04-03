import {
  ADD_PROFILE,
  DELETE_PROFILE,
  UPDATE_PROFILE,
} from "../actions/profileActions";

const initialState = {
  profiles: [
    {
      id: 1,
      name: "John Doe",
      location: { lat: 40.7128, lng: -74.006 },
      address: "New York, NY, USA",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Software Engineer with 5 years of experience",
    },
    {
      id: 2,
      name: "Jane Smith",
      location: { lat: 34.0522, lng: -118.2437 },
      address: "Los Angeles, CA, USA",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "UX Designer passionate about creating beautiful interfaces",
    },
    {
      id: 3,
      name: "Mike Johnson",
      location: { lat: 41.8781, lng: -87.6298 },
      address: "Chicago, IL, USA",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      bio: "Product Manager with a technical background",
    },
  ],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
      };
    case DELETE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter(
          (profile) => profile.id !== action.payload
        ),
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile.id === action.payload.id ? action.payload : profile
        ),
      };
    default:
      return state;
  }
};

export default profileReducer;
