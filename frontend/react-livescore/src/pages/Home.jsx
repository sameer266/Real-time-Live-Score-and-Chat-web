import React, { useState, useEffect } from "react";
import { Get_Posts_Data, LikePost } from "../data/AllPPostData"; // Function to fetch posts
import { PiUserListFill } from "react-icons/pi"; // Sidebar icon
import { FaHeart, FaComment } from "react-icons/fa"; // Like and Comment icons
import { ToastContainer, toast } from "react-toastify";
import Avatar from "../assets/images/man.png"; // Default Avatar
import "../style/home.css"; // Import CSS file
import Slidebar from "../components/Slidebar"; // Import Sidebar component

const Home = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to track sidebar visibility
  const [likedPosts, setLikedPosts] = useState({}); // Object to track liked posts
  const localStorage_username = localStorage.getItem('username'); // Get username from localStorage

  // Notification function
  const notify = (msg) => toast(msg);

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const data = await Get_Posts_Data();
      setPosts(data?.post_data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Send like to server
  const sendLike = async (id, username) => {
    if (!localStorage_username) {
      alert('Please login to like the post');
      return;
    }

    try {
      const response = await LikePost(id, username);
      if (response.success) {
        // Update liked posts state locally for immediate UI feedback
        setLikedPosts((prev) => ({
          ...prev,
          [id]: !prev[id], // Toggle the like state
        }));
        // Re-fetch posts to get the updated like count from the server
        fetchPosts();
        notify(response.message || 'Liked'); // Show notification
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error('Failed to like the post.');
    }
  };

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Hide Sidebar
  const hideSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="home">
        {/* Button to toggle sidebar */}
        {!isSidebarVisible && (
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            <PiUserListFill className="sidebar-icon" />
          </button>
        )}

        {/* Sidebar Component */}
        <Slidebar toggleSidebar={isSidebarVisible} hideSidebar={hideSidebar} />

        {/* Main Content */}
        <div className="content">
          <h1 className="page-title">News Feed</h1>
          <div className="posts">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index} className="post-card">
                  {/* Post Header */}
                  <div className="post-header">
                    <img
                      src={post.user?.avatar || Avatar}
                      alt={post.user?.username || "User"}
                      className="avatar"
                    />
                    <div className="user-info">
                      <p className="username">{post.user?.username || "Anonymous"}</p>
                      <span className="timestamp">{new Date(post.created_at).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="post-title">{post.title}</p>

                  {/* Post Image */}
                  {post.image && (
                    <img src={post.image} alt="Post" className="post-image" />
                  )}

                  {/* Post Footer */}
                  <div className="post-footer">
                    <button
                      className={`action-button like-btn ${likedPosts[post.id] ? 'liked' : ''}`}
                      onClick={() => sendLike(post.id, post.user.username)}
                    >
                      <FaHeart className="icon" />
                      {post.likes_count}
                    </button>
                    <button className="action-button comment-btn">
                      <FaComment className="icon" />
                      Comment
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-posts">No posts available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
