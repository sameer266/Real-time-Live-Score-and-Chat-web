import axios from "axios";
import {
  Profile_UploadFile,
  Profile_DeleteFile,
} from "./appWrite/ProfileImg_appwrite";
axios.defaults.baseURL = "http://127.0.0.1:8000";

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  let csrfToken = null;
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    if (cookie.trim().startsWith("csrftoken=")) {
      csrfToken = cookie.trim().split("=")[1];
    }
  });
  return csrfToken;
};

const csrfToken = getCSRFToken();

// ========  fetch Profile Data ============
const Profile_Data = async (user) => {
  try {
    const response = await axios.get(`/profile/profile-data?q=${user}`, {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    alert("error in fetching profile data");
  }
};

// ====================================
// =============Update profile ========
const Update_Profile = async (formData, oldImageUrl) => {
  /* -----formData is a object  formData=new Form- ---
   */
  try {
    console.log("Old Image URL:", oldImageUrl);

    // Delete the old image file
    await Profile_DeleteFile(oldImageUrl);

    // Get the new file (avatar) from the form data
    const file = formData.get("avatar");

    // Upload the new avatar and get the new URL
    const img_url = await Profile_UploadFile(file);
    console.log("New image URL:", img_url);

    // Update the formData with the new avatar URL
    formData.set("avatar", img_url);

    // Send the form data to the backend
    const response = await axios.put(`/profile/update-data/`, formData, {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export { Profile_Data, Update_Profile };
