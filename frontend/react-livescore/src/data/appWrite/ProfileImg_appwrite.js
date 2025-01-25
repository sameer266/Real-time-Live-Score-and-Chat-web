import { Client, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.REACT_APP_APPWRITE_URL)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const storage = new Storage(client);


// ========= Upload File ================
const Profile_UploadFile = async (file) => {
  try {
    const response = await storage.createFile(
      process.env.REACT_APP_APPWRITE_PROFILE_BUCKET_ID,
      "unique()",
      file
    );
    const fileUrl = `${process.env.REACT_APP_APPWRITE_URL}/storage/buckets/${process.env.REACT_APP_APPWRITE_PROFILE_BUCKET_ID}/files/${response.$id}/view?project=${process.env.REACT_APP_APPWRITE_PROJECT_ID}`;

    return fileUrl; // Return the file URL
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// ========= Delete File ================
const Profile_DeleteFile = async (file_url) => {
  try {
    // Extract the file ID from the URL
    const urlParts = file_url.split("/files/");
    if (urlParts.length < 2) {
      console.error("File URL is Smaller.");
      return false;
    }
    const fileId = urlParts[1].split("/")[0]; // Get the file ID (before the next '/')

    if (!fileId) {
      console.error("File ID could not be extracted from the URL.");
      return false;
    }

    // Call Appwrite's deleteFile function with the extracted file ID
    await storage.deleteFile(process.env.REACT_APP_APPWRITE_PROFILE_BUCKET_ID, fileId);
    return true;
  } catch (error) {
    console.log("Error in file delete", error);
    return false;
  }
};

// ========= Get File Preview ================
const Profile_GetFilePreview = async (file_id) => {
  try {
    const fileUrl = `${process.env.REACT_APP_APPWRITE_URL}/v1/storage/buckets/${process.env.REACT_APP_APPWRITE_PROFILE_BUCKET_ID}/files/${file_id}/view`;
    return fileUrl; // Return the file preview URL
  } catch (error) {
    console.log("Error getting file preview", error);
    throw error;
  }
};

export { Profile_UploadFile, Profile_DeleteFile, Profile_GetFilePreview };
