import React, { useEffect, useRef, useState } from "react";
import BlogEditor from "../config/BlogEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  EditStory,
  getDataStory,
  postStory,
} from "../Redux/Action/Story-Action";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import StorySkeleton from "../components/Skeleton/StorySkeleton";
import CardSkeleton from "../components/Skeleton/CardSkeleton";

const CreatePost = () => {
  const dispatch = useDispatch();
  // STATE
  const [imagePreview, setImagePreview] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);

  // REDUX
  const data = useSelector((state) => state.Story.storySlug);
  const { slug } = useParams();
  const loading = useSelector((state) => state.Alert.loading);
  const getStoryDetail = useSelector((state) => state.Story.detailStory);

  // EDITED
  useEffect(() => {
    if (slug) {
      dispatch(getDataStory({ data, slug }));
      setContent(getStoryDetail.data?.content);
      setImage(getStoryDetail.data?.image);
      setTitle(getStoryDetail.data?.title);
      setEdit(true);
    }
  }, [dispatch]);

  const handlePost = (e) => {
    if (edit) {
      const prevImage = getStoryDetail.data?.image;
      let data = { image, content, prevImage, setEdit, title, slug };
      dispatch(EditStory(data));
    } else {
      let data = { image, content, title };
      dispatch(postStory(data));
    }
  };

  return (
    <div className="xl:px-[12rem] px-3 lg:px-[12rem] md:px-[8rem] sm:px-[5rem] w-full bg-lightYellow dark:bg-darkCard min-h-screen">
      <Toaster />
      <h1 className="text-center text-[3rem] text-slate-800 dark:text-white">
        {edit ? "Edit" : "Create"} Post
      </h1>
      {loading ? (
        <CardSkeleton />
      ) : (
        <>
          <div className="flex flex-col">
            <label className="">
              <textarea
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                value={title}
                id="message"
                rows="4"
                className="rounded block p-3 w-full text-[1.3rem] resize-none outline-none text-gray-900 xl:text-[1.4rem] lg:text-[1.4rem]  md::text-[1.3rem] sm:text-[1.2rem] font-semibold  border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="Title"
              ></textarea>
            </label>

            <div className="flex items-center py-5">
              <label className="block">
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
                  name="image"
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
              <div className="">
                {imagePreview && (
                  <img
                    className="object-cover w-16 h-16 rounded-full"
                    src={imagePreview}
                    alt="profile photo"
                  />
                )}
              </div>
            </div>
            <BlogEditor setContent={setContent} content={content} />
          </div>
          <div className="py-5">
            <button
              onClick={handlePost}
              className="bg-blue-500 px-5 py-2 text-white font-semibold rounded"
            >
              {edit ? "Edit" : "Publish"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePost;
