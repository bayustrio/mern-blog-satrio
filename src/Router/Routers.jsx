import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Profile from "../page/Profile";
import CreatePost from "../page/CreatePost";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import DetailStory from "../page/[slug]";
import { GetDataSlug } from "../Redux/Action/Auth-Action";
const Routers = () => {
  const Auth = useSelector((state) => state.Story.storySlug);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(GetDataSlug());
    }
    // dispatch(GetDataSlug());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogdetail/:slug" element={<DetailStory />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/createpost"
          element={
            <PrivateRoute Auth={Auth}>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="/createpost/:slug"
          element={
            <PrivateRoute Auth={Auth}>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile/:slug"
          element={
            <PrivateRoute Auth={Auth}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export const PrivateRoute = ({ Auth, children }) => {
  // const Auth = useSelector((state) => state.Story.storySlug);

  return Auth._id ? children : <Navigate to="/login" />;
};

export default Routers;
