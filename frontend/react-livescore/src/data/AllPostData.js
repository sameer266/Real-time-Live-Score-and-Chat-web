import axios from "axios";

// =======Get all news Feeds==========
const Get_Posts_Data = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/posts/posts-data/");
    const data = response.data;
    return data;
  } catch (error) {
    console.log("error in fetching  Posts data", error);
  }
};

// =========Get news_feed by individual user========

const Get_OneUser_Data = async (username) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/posts/posts-data/${username}`
    );
    if (response.data.success) {
      console.log("User posts data", response.data);
      return response.data;
    }
  } catch (error) {
    console.log("error in getting users news_feed data");
  }
};

// ===========Post news Feed==========

const Send_Posts_Data = async (posts_data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/posts/create-post/",
      {
        title: posts_data.title,
        image: posts_data.image,
        user: { username: posts_data.username }, // Send only the username
      },
      { withCredentials: true }
    );
    console.log("Post created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.response.data);
    alert(
      `Failed to create the post. Server error: ${error.response.data.error}`
    );
  }
};

// ==========Delete post=======

const DeletePost = async (id) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/posts/delete-post/${id}/`
    );
    if (response.data) {
      console.log(response.data);
      return response.data;
    } else {
      console.log("error in Delteing post ", response.data);
    }
  } catch (error) {
    console.log("error in Deleting Post", error);
  }
};



// =====send like to server========


const LikePost = async (id,username) => {
  try {
    
    const response = await axios.post(
      `http://127.0.0.1:8000/posts/like-posts/${id}/`,
      {username:username},
      {
        withCredentials: true, 
        
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error in sending like to server:', error.response);
    alert( error.response.data.error);
  }
};

// =====dislike post====
const DislikePost = async (id,username) => {
  try {
    
    const response = await axios.post(
      `http://127.0.0.1:8000/posts/dislike-posts/${id}/`,
       {username:username},
      {withCredentials: true})
      console.log(response.data);
      return response.data;

    }
    catch (error) {
      console.error('Error in sending dislike to server:', error.response);
      alert( error.response.data.error);
    }
  }


  // ======Comment on post====
  const CommentPost = async (id,username,comment) => {
    try {
      
      const response = await axios.post(
        `http://127.0.0.1:8000/posts/comment-posts/${id}/`,
        {username:username,
          comment:comment},
          {withCredentials: true});
        console.log(response.data);
        return response.data;
    }
    catch (error) {
      console.error('Error in sending comment to server:', error.response);
      alert( error.response.data.error);
    }
  }



// ========== Delete Comment on post =========
const DeleteComment = async (post_id, username, content) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/posts/delete-comment/${post_id}/`,
      {
        data: { username, content }, // Pass data in the `data` field for DELETE requests
        withCredentials: true,
      }
    );
    return response.data; // Return server response to the caller
  } catch (error) {
    console.error("Error deleting comment:", error);
    alert("Failed to delete comment. Please try again.");
   
  }

};

    
export { Get_Posts_Data, Send_Posts_Data, DeletePost, Get_OneUser_Data, LikePost,DislikePost,CommentPost , DeleteComment};

