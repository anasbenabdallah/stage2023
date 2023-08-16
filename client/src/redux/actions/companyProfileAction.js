// EditProfileActions.js
import axios from "axios";

export const companyEditProfile = (formData, myData) => async (dispatch) => {
  try {
    console.log("edit profile data:", formData);

    const { data } = await axios.put(
      ` http://localhost:8000/company/${myData._id}`,
      formData,
      {
        withCredentials: true,
      }
    );

    console.log("edit profile response:", JSON.stringify(data));
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({
      type: "edit_profile_success",
    });
    return data;
  } catch (error) {
    console.log("edit profile error:", error.response.data);

    dispatch({
      type: "edit_profile_error",
    });
  }
};
