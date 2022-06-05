import axios from "axios";
export const API = "https://blog-fix.herokuapp.com/";
export const postData = async (url, Data, token) => {
  const res = await axios.post(`${API}${url}`, Data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getData = async (url, Data, token) => {
  const res = await axios.get(`${API}${url}`, Data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// PRIVATE ROUTE FOR DETAIL BLOG
export const privateRouteSLug = async (url, token) => {
  const res = await axios.get(`${API}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const postBlog = async (url, data, token) => {
  const { title, content, image } = data;
  const newFOrm = new FormData();
  newFOrm.append("title", title);
  newFOrm.append("content", content);
  newFOrm.append("image", image);
  const res = await axios.post(`${API}${url}`, newFOrm, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// DELETE =
export const deleteData = async (slug, token) => {
  const res = await axios.delete(`${API}${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getComment = async (slug) => {
  const res = await axios.get(`${API}comment/${slug}/getAllComment`);

  return res;
};

// UPDATE USER
export const updateProfile = async (url, Data, token) => {
  const {
    username,
    email,
    image,
    usernameDefault,
    imageDefault,
    emailDefault,
  } = Data;
  const newForm = new FormData();
  newForm.append(
    "username",
    username ? username.current.value : usernameDefault
  );
  newForm.append("email", email ? email.current.value : emailDefault);
  newForm.append("photo", image ? image : imageDefault);
  const res = await axios.post(`${API}${url}`, newForm, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// UPDATE PASSWORD
export const updateDataPassword = async (url, Data, token) => {
  const res = await axios.put(`${API}${url}`, Data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
