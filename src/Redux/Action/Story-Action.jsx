import toast from "react-hot-toast";
import {
  postBlog,
  getData,
  postData,
  API,
  deleteData,
} from "../../utils/FetchData";
import { checkImage, uploadImage } from "../../utils/ImageUpload";
import axios from "axios";
import { ALERT, GET_DATA_BLOG, GET_DETAIL_STORY } from "../Type/Type";
export const postStory = (data) => async (dispatch) => {
  try {
    const { image, title, content } = data;
    dispatch({
      type: ALERT,
      payload: { loading: true },
    });

    let token = localStorage.getItem("token");
    const Data = {
      title,
      image,
      content,
    };

    const res = await postBlog("story/addstory", Data, token);
    toast.success("Create Story Success");
    dispatch({
      type: ALERT,
      payload: { loading: false },
    });
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: { loading: false },
    });
    toast.error(err.response.data.error);
  }
};

// GET DATA POST
export const getDataPost = (setLoading) => async (dispatch) => {
  try {
    setLoading(true);

    const res = await getData("story/getAllStories");
    setLoading(false);

    dispatch({ type: GET_DATA_BLOG, payload: res.data });
  } catch (err) {
    setLoading(false);

    toast.error(err.response.data.error);
  }
};

// GET DATA
export const getDataStory =
  ({ slug, data }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALERT,
        payload: { loading: true },
      });
      const token = localStorage.getItem("token");
      const Data = {
        activeUser: data,
      };
      const res = await postData(`story/${slug}`, Data, token);
      dispatch({
        type: GET_DETAIL_STORY,
        payload: res.data,
      });
      dispatch({
        type: ALERT,
        payload: { loading: false },
      });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: { loading: false },
      });
      toast.error(err.response.data.error);
    }
  };

export const LikeStory =
  ({ slug, data }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const Data = {
        activeUser: data,
      };
      const res = await postData(`story/${slug}/like`, Data, token);
      dispatch({
        type: GET_DETAIL_STORY,
        payload: res.data,
      });
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

// EDIT
export const EditStory = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ALERT,
      payload: { loading: true },
    });
    const { image, content, setEdit, slug, prevImage, title } = data;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const newFormData = new FormData();
    newFormData.append("content", content);
    newFormData.append("title", title);
    newFormData.append("image", image);
    newFormData.append("previousImage", prevImage);
    const res = await axios.put(
      `${API}story/${slug}/edit`,
      newFormData,
      config
    );
    toast.success("Edit Success");
    dispatch({
      type: ALERT,
      payload: { loading: false },
    });
    setEdit(false);
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: { loading: false },
    });
    console.log(err);
    toast.error(err.response.data.error);
  }
};

// DELETE
export const DeleteStory =
  ({ slug, data }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await deleteData(`story/${slug}/delete`, token);
      toast.success("Story deleted");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };
