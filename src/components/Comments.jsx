import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../utils/FetchData";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CreateComment, getDataComment } from "../Redux/Action/Comments-Action";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
const Comments = () => {
  const { slug } = useParams();

  // STATE COMMENT
  const [content, setContent] = useState("");
  const [star, setStar] = useState(0);
  const mdParser = new MarkdownIt();
  const dataMe = useSelector((state) => state.Story.storySlug);
  //   const slug = useSelector((state) => state.Story.storySlug);

  //   REDUX
  const dispatch = useDispatch();

  //   HANDLE COMMENT
  const handleComment = (e) => {
    e.preventDefault();
    dispatch(CreateComment({ star, setContent, content, slug }));
  };

  function handleEditorChange({ text }) {
    setContent(text);
  }

  const onCustomImageUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  function renderHTML(text) {
    return React.createElement(ReactMarkdown, {
      source: text,
    });
  }

  return (
    <div>
      <div className="flex flex-col w-full gap-3  min-h-[30vh]">
        <div className="flex items-center gap-1">
          {/* <div className="px-3 py-3 rounded-full bg-black"></div> */}
          <img
            className="xl:w-10 w-8 h-8 xl:h-10 rounded-full"
            src={`${API}userPhotos/${dataMe.photo}`}
          />
          <div className="flex flex-col ">
            <h1 className="leading-3 dark:text-white font-semibold">
              {dataMe.username}
            </h1>
            <p className="dark:text-white text-slate-400 text-sm">
              {dataMe.role}
            </p>
          </div>
        </div>
        {/* MARKDOWN */}
        <div className="w-full flex flex-col gap-3">
          <MdEditor
            onImageUpload={onCustomImageUpload}
            className="w-full h-[20vh]"
            plugins={[
              "block-wrap",
              "block-code-block",
              "block-code-inline",
              "image",
              "full-screen",
              "clear",
              "link",
              "font-italic",
              "font-bold",
              "font-strikethrough",
            ]}
            value={content}
            renderHTML={(text) => mdParser.render(text)}
            // renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />

          <button
            onClick={handleComment}
            className="w-[100px] text-white rounded py-2 px-6 bg-blue-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
