import React, { useEffect, useState } from "react";
import { UploadFile, DeleteFile } from "../../data/appWrite/AppWrite";
import { useSelector } from "react-redux";
import { Send_Posts_Data, Get_OneUser_Data, DeletePost } from "../../data/AllPPostData";
import '../../style/loading.css';
import { ToastContainer,toast } from "react-toastify";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useSelector((state) => state.auth);

  const notify=(msg)=>toast(msg)

  // =======Fetch User Post==========
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


  // ======== ADD Post========
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
        notify("Post Data Success");
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


  // =======Delete Post========
  const handleDeletePost = async (id, fileUrl) => {
    try {
      const response = await DeletePost(id);
      if (response.success) {
        await DeleteFile(fileUrl);
        alert("Deleted Post"); //==>delete image of appwrite
      } else {
        alert("Error deleting post");
      }
    } catch (error) {
      console.log("Error in deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  return (
    <>
    <ToastContainer  autoClose={2000} theme="colored"/>
    <div className="max-w-screen-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Welcome {username}
      </h1>

      {/* Add Post Section */}
      <div className="mb-8 p-4 shadow-md rounded-md bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Add a Post</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleAddPost}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <span class="loader"></span>
            ) : (
              "Add Post"
            )}
          </button>
        </div>
      </div>

      {/* Display Posts Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts available. Add your first post!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="mb-4 p-4 border border-gray-300 rounded-md">
              <p className="text-gray-700">{post.title}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Uploaded file"
                  className="w-full h-auto mt-2 rounded-md"
                />
              )}
              <p>{post.created_at}</p>
              <button
                onClick={() => handleDeletePost(post.id, post.image)}
                className="text-red-500 mt-2"
              >
                Delete Post
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default Dashboard;
