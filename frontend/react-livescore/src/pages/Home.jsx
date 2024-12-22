// Home.js
import React, { useEffect, useState } from "react";
import { Get_Posts_Data } from "../data/AllPPostData"; // Function to fetch posts
import { SlLike } from "react-icons/sl"; // Like Icon
import { FaRegComment } from "react-icons/fa"; // Comment Icon
import Avatar from "../assets/images/man.png"; // Default Avatar
import "../style/home.css"; // Import CSS file
import Slidebar from "../components/Slidebar"; // Import Sidebar component

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await Get_Posts_Data();
        setPosts(data?.post_data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);


  // =====Send like to server========
  const sendLike = (id, user) => {};

  
  return (
    <div className="home">
      {/* Sidebar Component */}
      <Slidebar />

      {/* Main Content */}
      <div className="content">
        <h1>News Feed</h1>
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="post">
                {/* Post Header */}
                <div className="post-header">
                  <img
                    src={post.user?.avatar || Avatar}
                    alt={post.user?.username || "User"}
                    className="avatar"
                  />
                  <div className="user-info">
                    <p>{post.user?.username || "Anonymous"}</p>
                    <span>{new Date(post.created_at).toLocaleString()}</span>
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
                  <button className="action-button">
                    <SlLike
                      className="icon"
                      onClick={() => sendLike(post.id)}
                    />
                    {post.likes_count}
                  </button>
                  <button className="action-button">
                    <FaRegComment className="icon" />
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
  );
};

export default Home;
