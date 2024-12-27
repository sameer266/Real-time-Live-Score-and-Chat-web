import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../style/comment.css"; // Add your custom CSS for the modal

import { IoMdSend } from "react-icons/io";

const Comments = ({ isVisible, onClose, post, addComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(post.id, newComment); // Pass the new comment to the parent function
      setNewComment(""); // Clear input
    }
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Comments</h3>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="comments-section">
          {post.comments?.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} className="comment">
                <strong>{comment.user.username}:</strong>
                <p>{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>
        <div className="comment-input-section">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input"
          />
          <button onClick={handleAddComment} className="add-comment-button">
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
