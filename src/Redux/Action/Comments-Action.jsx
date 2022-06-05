import toast from "react-hot-toast";
import { API, deleteData, getComment, postData } from "../../utils/FetchData";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_DATA_COMMENTS,
} from "../Type/Type";

export const CreateComment =
  ({ content, setContent, star, slug }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const Data = { star: star, content: content };
      const res = await postData(`comment/${slug}/addComment`, Data, token);
      console.log(res.data);
      dispatch({
        type: CREATE_COMMENT,
        payload: res.data.data,
      });
      // console.log(res.data);
      setContent("");
      // alert("Berhasil comment");
    } catch (err) {
      toast.error(err.response?.data.error);
    }
  };

export const getDataComment = (slug) => async (dispatch) => {
  try {
    const res = await getComment(`${slug}`);
    dispatch({
      type: GET_DATA_COMMENTS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = (slug) => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");
    const res = await deleteData(`comment/deleteComment/${slug}`, token);
    // console.log(res.data);
    // alert("Comments deleted");
    toast.success(res.data.message);
    dispatch({
      type: DELETE_COMMENT,
      payload: {
        id: slug,
      },
    });
  } catch (err) {
    toast.error(err.response?.data.error);
  }
};
