import axios from "axios";
import toast from "react-hot-toast";
import {
  API,
  getData,
  postData,
  privateRouteSLug,
} from "../../utils/FetchData";
import * as Type from "../Type/Type";

export const handleOnChange = (name, value) => (dispatch) => {
  dispatch({
    type: Type.HANDLE_CHANGE,
    name,
    value,
  });
};

// REGISTER
export const postRegister = (data) => async (dispatch) => {
  try {
    const { username, password, email } = data;
    const Data = {
      username: username,
      password: password,
      email: email,
    };
    const res = await postData("Auth/register", Data);
    dispatch({
      type: Type.CREATE_ACCOUNT,
      payload: res.data,
    });
  } catch (err) {
    toast.error(err.response.data.error);
  }
};

export const postLogin = (data) => async (dispatch) => {
  try {
    const { username, password, email, history } = data;
    const url = history.location.search.replace("?", "/");
    const Data = {
      username: username,
      password: password,
      email: email,
    };
    const res = await postData("auth/login", Data);
    localStorage.setItem("token", res.data.token);
    // alert("Berhasil login");
    dispatch(GetDataSlug());
  } catch (err) {
    toast.error(err.response.data.error);
  }
};

export const GetDataSlug = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const res = await privateRouteSLug("auth/private", token);
      dispatch({
        type: Type.GET_SLUG_FOR_LIKE,
        payload: res.data.user,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
