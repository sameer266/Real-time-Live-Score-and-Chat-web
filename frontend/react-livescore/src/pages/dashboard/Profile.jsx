import React, { useEffect, useState } from "react";
import { Profile_Data, Update_Profile } from "../../data/AllProfile_Follower"; // Add an API for updating profile data
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import "./profile.css"; // Add your custom CSS styles here

export default function Profile() {
  const [data, setData] = useState(null); // data of profile
  const [images, setImages] = useState([]); // images of all post
  const [oldProfileImg, setOldProfileImg] = useState(); // old images of Profile
  const [isEditing, setIsEditing] = useState(false); // editing button
  const [updatedBio, setUpdatedBio] = useState(""); //  update bio
  const [newAvatar, setNewAvatar] = useState(null); // newer Avatar
  const { username } = useSelector((state) => state.auth);


  // ==== Notification ========
  const notify =(msg)=>toast.success(msg)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Profile_Data(username);
        setData(response);
    
        setImages(response.images || []);

        setOldProfileImg(response.profile_user.avatar);
       
        setUpdatedBio(response.profile_user.bio || "");
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, [username]);



  //  ======   Show edit Option ======
  const handleEdit = () =>{ 
    setIsEditing(!isEditing);
  }


  // ====== Save when click on Save =======
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", updatedBio);

      if (newAvatar) {
        formData.append("avatar", newAvatar);
        console.log("Avatar file being uploaded:", newAvatar);
      } else {
        console.log("No avatar selected. Skipping avatar update.");
      }
    
      const response = await Update_Profile(formData, oldProfileImg);
      console.log(response)
      if (response.success){
        notify(response.message) // show norification
      }

      // Update the local state with the new profile data
      setData((prev) => ({
        ...prev,
        profile_user: {
          ...prev.profile_user,
          bio: updatedBio,
          avatar: response.avatar || prev.profile_user.avatar,
        },
      }));

      
      setNewAvatar(null); // Clear the new avatar state
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  //  ====== New image Change ===========
  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewAvatar(event.target.files[0]);
    }
  };

  return (
    <div className="profile-container">
      
      <ToastContainer  theme="dark" autoClose={2000}/>

      {data ? (
        <>
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar-container">
              <img
                src={data.profile_user.avatar}
                alt="User Avatar"
                className="profile-avatar"
              />
              {isEditing && (
                <div>
                  <label
                    htmlFor="avatar-upload"
                    className="avatar-upload-label"
                  >
                    Change Avatar
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    className="avatar-upload-input"
                    onChange={handleAvatarChange}
                  />
                </div>
              )}
            </div>
            <h1 className="profile-username">{username}</h1>
            {isEditing ? (
              <textarea
                className="edit-bio"
                value={updatedBio}
                onChange={(e) => setUpdatedBio(e.target.value)}
              />
            ) : (
              <p className="profile-bio">
                {data.profile_user.bio || "No bio available"}
              </p>
            )}
          </div>

          {/* Edit/Save Button */}
          <div className="edit-save-buttons">
            {isEditing ? (
              <button onClick={handleSave} className="save-button">
                Save
              </button>
            ) : (
              <button onClick={handleEdit} className="edit-button">
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Stats */}
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-count">{data.follower}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">{data.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>

          {/* Profile Gallery */}
          <div className="profile-gallery">
            <h2 className="gallery-title">Your Posts</h2>
            <div className="gallery-grid">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img
                      src={image}
                      alt={`Post ${index + 1}`}
                      className="gallery-image"
                    />
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
}
