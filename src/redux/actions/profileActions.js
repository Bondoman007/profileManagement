export const ADD_PROFILE = "ADD_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const addProfile = (profile) => ({
  type: ADD_PROFILE,
  payload: profile,
});

export const deleteProfile = (id) => ({
  type: DELETE_PROFILE,
  payload: id,
});

export const updateProfile = (profile) => ({
  type: UPDATE_PROFILE,
  payload: profile,
});
