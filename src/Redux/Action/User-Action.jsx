import axios from "axios";
import toast from "react-hot-toast";
import {
  API,
  getData,
  postData,
  privateRouteSLug,
  updateDataPassword,
  updateProfile,
} from "../../utils/FetchData";
import { GET_DATA_USER } from "../Type/Type";

export const getDataUser = () => async (dispatch) => {
  try {
    let token = localStorage.getItem("token");

    const res = await privateRouteSLug("user/profile", token);
    // console.log(res.data);
    dispatch({ type: GET_DATA_USER, payload: res.data });
  } catch (err) {
    console.log(err.response);
  }
};

// ===== START EDIT USER =====
export const setEditUser = (data) => async (dispatch) => {
  try {
    const {
      username,
      email,
      image,
      usernameDefault,
      imageDefault,
      emailDefault,
    } = data;
    // console.log(username.current.value);
    let Data = {
      username,
      email,
      image,
      usernameDefault,
      imageDefault,
      emailDefault,
    };

    const token = localStorage.getItem("token");
    const res = await updateProfile("user/editProfile", Data, token);
    console.log(res.data);
    alert("Berhasil");
  } catch (err) {
    console.log(err);
  }
};
// ===== EMD EDIT USER =====

// UPDATE PASSWORD
export const setUpdatePassword =
  ({ oldPassword, newPassword, setUpdate, setPassword, confirmPassword }) =>
  async (dispatch) => {
    try {
      let Data = {
        newPassword: newPassword,
        oldPassword: oldPassword,
      };
      let token = localStorage.getItem("token");
      const res = await updateDataPassword("user/changePassword", Data, token);
      setPassword({
        newPassword: "",
        oldPassword: "",
        confirmPassword: "",
      });
      toast.success(res.data.message);
      setUpdate(false);
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err.response);
    }
  };
