import React, { useEffect, useState } from "react";
import { UploadFile, DeleteFile } from "../../data/appWrite/PostImg_appwrite";
import { useSelector } from "react-redux";
import { Send_Posts_Data, Get_OneUser_Data, DeletePost } from "../../data/AllPostData";
import { ToastContainer, toast } from "react-toastify";
import "../dashboard/dashboard.css";  // Assuming the CSS is saved in 'dashboard.css'

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { username } = useSelector((state) => state.auth);

  const notify = (msg) => toast(msg);

  //============== Fetch user posts ============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Get_OneUser_Data(username);
        if (response && response.data) {
          setPosts(response.data);
        } else {
          setPosts([]);
          alert("No posts found for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user posts.");
      }
    };
    fetchData();
  }, [username]);

  //======== Add new post =========
  const handleAddPost = async () => {
    if (!title || !file) {
      alert("Title and file are required!");
      return;
    }

    try {
      setLoading(true);
      const uploadedFile = await UploadFile(file);

      const newPost = {
        title,
        image: uploadedFile.url,
        username: username,
      };

      const sendData = await Send_Posts_Data(newPost);
      if (sendData.success) {
        notify("Post added successfully");
        window.location.reload();
      } else {
        alert("Error", sendData.error);
      }

      setTitle("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //========= Delete post===========
  const handleDeletePost = async (id, fileUrl) => {
    try {
      const response = await DeletePost(id);
      if (response.success) {
        await DeleteFile(fileUrl);
        alert("Deleted Post");
      } else {
        alert("Error deleting post");
      }
    } catch (error) {
      console.log("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  //============ Edit post =============
  const handleEditPost = (post) => {
    setTitle(post.title);
    setFile(post.image);  // Optional: If you're using the same file for editing
    setEditingPost(post);  // Set the post being edited
  };

  const handleUpdatePost = async () => {
    
  };



  return (
    <>
      <ToastContainer autoClose={2000} theme="colored" />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome {username}</h1>

        {/*====== Add Post Section ======== */}
        <div className="add-post-section">
          <h2 className="add-post-title">Create a Post</h2>
          <div className="form">
            <input
              type="text"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="input-field"
            />
            <button
              onClick={handleAddPost}
              className="add-post-button"
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : "Post"}
            </button>
          </div>
        </div>

        {/*==== Display Posts Section ===== */}
        <div className="posts-section">
          <h2 className="add-post-title">Your Posts</h2>
          {posts.length === 0 ? (
            <p>No posts available. Add your first post!</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-item">
                <div className="post-header">
                  <p className="post-title" onClick={() => handleEditPost(post)}>
                    {post.title}
                  </p>
                  <button
                    onClick={() => handleDeletePost(post.id, post.image)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Uploaded file"
                    className="post-image"
                  />
                )}
                <p>{post.created_at}</p>
                {editingPost && editingPost.id === post.id && (
                  <button
                    onClick={handleUpdatePost}
                    className="update-button"
                  >
                    Update Post
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
