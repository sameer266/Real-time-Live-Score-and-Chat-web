import React, { useState } from "react";
import { CommentPost, DeleteComment } from "../data/AllPostData";
import { FaTimes } from "react-icons/fa";
import "../style/comment.css";
import { IoMdSend } from "react-icons/io"; // Send Icon
import { MdDelete } from "react-icons/md"; // Delete Icon
import { toast, ToastContainer } from "react-toastify";


const Comments = ({ isVisible, onClose, post }) => {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null); // Track delete state by comment ID
  

  // ======== For CommentPost parameter =========
  const username = localStorage.getItem("username");
  const avatar_url=localStorage.getItem('avatar')
  const postId = post.id;

  
  // === Show comment notification ===
  const notify = (message) => toast.success(message);



  // === Handle Add Comment ===
  const handleAddComment = async () => {
    if (newComment.trim()) {
      setIsLoading(true);
      try {
        const response = await CommentPost(postId, username, newComment,avatar_url);
        if (response.success) {
          notify("Comment added successfully");
          setNewComment(""); // Clear input
          post.comments.push({
            user: { username },
            content: newComment,
          }); // Optimistic UI update
          setNewComment(...newComment) ;// Trigger a re-render by updating the state
        } else {
          toast.error("Failed to add comment.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // === Handle Delete Comment ===
  const handleDeleteComment = async (content) => {
    setDeleteLoading(content);
 // Set loading state for the specific comment
    try {
      const response = await DeleteComment(postId, username, content);
      if (response.success) {
        notify("Comment deleted successfully");
        post.comments = post.comments.filter(
          (comment) => comment.content !== content
        );
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setDeleteLoading(null); // Clear loading state
    }
  };

  // ===== Render Individual Comment =====
  const CommentItem = ({ comment }) => (
    <div className="comment">
      <div className="comment-avatar">
        <img src={comment.avatar} alt="avatar" />
      </div>
      <div className="comment-details">
        <div className="comment-username">{comment.user.username}</div>
        <p>{comment.content}</p>
      </div>

      {/* ==== the comment belogs to login user the show delete button===== */}
      {comment.user.username === username && (
        <button
          className="comment-delete"
          onClick={() => handleDeleteComment(comment.content)}
          disabled={deleteLoading === comment.content}
          aria-label="Delete comment"
        >
          <MdDelete />
        </button>
      )}
    </div>
  );

  // ===== Return null if the modal is not visible =====
  if (!isVisible) return null;

  return (
    <div className="modal-overlay" aria-hidden={!isVisible}>
      <ToastContainer autoClose={2000} closeOnClick pauseOnHover={false} />
      <div className="modal-content">
        <div className="modal-header">
          <h3>Comments</h3>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="comments-section">
          {/* ===== Display comments ===== */}
          {post.comments?.length > 0 ? (
            post.comments.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>

        {/* ===== Comment input section ===== */}
        <div className="comment-input-section">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input"
            aria-label="Comment input"
          />
          <button
            onClick={handleAddComment}
            className="add-comment-button"
            disabled={isLoading || !newComment.trim()}
            aria-label="Add comment"
          >
            {isLoading ? "..." : <IoMdSend />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
