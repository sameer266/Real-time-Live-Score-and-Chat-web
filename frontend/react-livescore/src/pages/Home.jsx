import React, { useState, useEffect } from "react";
import { Get_Posts_Data, LikePost, CommentPost } from "../data/AllPPostData";
import { PiUserListFill } from "react-icons/pi";
import { FaHeart, FaComment } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "../assets/images/man.png";
import "../style/home.css";
import Slidebar from "../components/Slidebar";
import Comments from "../components/Comments";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activePost, setActivePost] = useState(null); // Track the post for the modal
  const localStorage_username = localStorage.getItem("username"); // Current user

  const notify = (msg) => toast(msg);

  // Fetch posts from API
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

  // Handle like
  const sendLike = async (id, username) => {
    if (!localStorage_username) {
      alert("Please login to like the post");
      return;
    }
    try {
      const response = await LikePost(id, username);
      if (response.success) {
        fetchPosts(); // Refresh posts to reflect updated likes
        notify(response.message || "Liked");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like the post.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const hideSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="home">
        {!isSidebarVisible && (
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            <PiUserListFill className="sidebar-icon" />
          </button>
        )}
        <Slidebar toggleSidebar={isSidebarVisible} hideSidebar={hideSidebar} />

        <div className="content">
          <h1 className="page-title">News Feed</h1>
          <div className="posts">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index} className="post-card">
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
                  <p className="post-title">{post.title}</p>
                  {post.image && (
                    <img src={post.image} alt="Post" className="post-image" />
                  )}
                  <div className="post-footer">
                    <button
                      className={`action-button like-btn ${
                        post.liked_users.includes(localStorage_username) ? "liked" : ""
                      }`}
                      onClick={() => sendLike(post.id, localStorage_username)}
                    >
                      <FaHeart className="icon" />
                      {post.likes_count}
                    </button>
                    <button
                      className="action-button comment-btn"
                      onClick={() => setActivePost(post)}
                    >
                      <FaComment className="icon" />
                      {post.comments_count}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-posts">No posts available</p>
            )}
          </div>
        </div>
        {activePost && (
          <Comments
            isVisible={!!activePost}
            onClose={() => setActivePost(null)}
            post={activePost}
          />
        )}
      </div>
    </>
  );
};

export default Home;
