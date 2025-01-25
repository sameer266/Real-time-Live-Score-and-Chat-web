import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";


// Function to get CSRF token from cookies
const getCSRFToken = () => {
  let csrfToken = null;
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    if (cookie.trim().startsWith('csrftoken=')) {
      csrfToken = cookie.trim().split('=')[1];
    }
  });
  return csrfToken;
};

const csrfToken = getCSRFToken();

// =======Get all news Feeds==========
const Get_Posts_Data = async () => {
  try {
    const response = await axios.get("/posts/posts-data/");
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
      `/posts/posts-data/${username}`
    );
    if (response.data.success) {
      console.log("User posts data", response.data);
      return response.data;
    }
  } catch (error) {
    console.log("error in getting users news_feed data");
  }
};

// ===========CreatePost news Feed==========

const Send_Posts_Data = async (posts_data) => {
  try {
    const response = await axios.post(
      "/posts/create-post/",
      {
        title: posts_data.title,
        image: posts_data.image,
        user: { username: posts_data.username }, // Send only the username
      },
      {
        headers: {
          'X-CSRFToken': csrfToken,  // Add CSRF token in headers
        },
        withCredentials: true,  // Include cookies (for session)
      }
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
      `/posts/delete-post/${id}/`,
     
      
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



const LikePost = async (id, username) => {
  try {
     // Get CSRF token from cookies

    const response = await axios.post(
      `/posts/like-posts/${id}/`,  // Correct URL string format
      { username: username },
      {
        headers: {
          'X-CSRFToken': csrfToken,  // Add CSRF token in headers
        },
        withCredentials: true,  // Include cookies (for session)
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error in sending like to server:', error.response);
    alert(error.response.data);
  }
};



  // ======Comment on post====
  const CommentPost = async (id,username,comment,img_url) => {
    try {
      
      const response = await axios.post(
        `/posts/comment-posts/${id}/`,
        {username:username,
          comment:comment,
        avatar:img_url},
          );
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
      `/posts/delete-comment/${post_id}/`,
      {
        data: { username, content }, // Pass data in the `data` field for DELETE requests
        
      }
    );
    return response.data; // Return server response to the caller
  } catch (error) {
    console.error("Error deleting comment:", error);
    alert("Failed to delete comment. Please try again.");
   
  }

};

    
export { Get_Posts_Data, Send_Posts_Data, DeletePost, Get_OneUser_Data, LikePost,CommentPost , DeleteComment};

