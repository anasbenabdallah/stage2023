// EditProfileReducer.js
const init = {
  editedProfile: {},
  error: null,
};

const EditProfileReducer = (state = init, action) => {
  switch (action.type) {
    case "edit_profile_success":
      return {
        ...state,
        editedProfile: action.payload,
        error: null,
      };
    case "edit_profile_error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EditProfileReducer;
