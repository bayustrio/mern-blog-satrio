import axios from "axios";

export const uploadImage = async (file) => {
  let url = "";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "gxdqycxv");
  formData.append("cloud_name", "not-have");
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/not-have/upload`,
    formData,
    {
      withCredentials: false,
    }
  );
  url = res.data.secure_url;

  return url;
};

export const checkImage = (file) => {
  const types = ["image/png", "image/jpeg"];
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "The largest image size is 1mb";

  if (!types.includes(file.type)) err = "The image type is png / jpeg";

  return err;
};
