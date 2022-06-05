import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../utils/FetchData";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import moment from "moment";
import { a11yDark as dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "prismjs/themes/prism-tomorrow.css";
import {
  deleteComment,
  getDataComment,
} from "../../Redux/Action/Comments-Action";
import { useParams } from "react-router-dom";
// import moment from "moment";

const CommentItems = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const user = useSelector((state) => state.Story.storySlug);

  const handleDeleteComments = (_id) => {
    let slug = _id;
    dispatch(deleteComment(slug));
  };

  useEffect(() => {
    dispatch(getDataComment(slug));
  }, [dispatch]);
  const data = useSelector((state) => state.Comments.Comment);

  // COMMENTS ITEMS

  return (
    <div>
      <div className="flex flex-col">
        {data?.map((item, idx) => (
          <div className="flex  gap-3 my-4" key={idx}>
            <div className="">
              <img
                src={`${API}/userPhotos/${item.author?.photo}`}
                className="w-6 h-6 rounded-full"
              />
            </div>
            <div className="w-full relative">
              <div className="flex gap-2 items-center">
                <h1 className="dark:text-white">{item.author?.username}</h1>
                <p className="text-slate-400 dark:text-slate-300 text-[12px]">
                  {moment(item.createdAt).fromNow()}
                </p>
              </div>
              <ReactMarkdown
                children={item?.content}
                className="dark:text-white bg-slate-200 rounded-sm dark:bg-darkInput min-h-[5vh]   bg-none overflow-auto  max-h-[35vh]   "
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        showLineNumbers
                        // wrapLongLines
                        children={String(children).replace(/\n$/, "")}
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <pre className="line-numbers ">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  },
                }}
              />
              <div className="my-2">
                {user._id === item?.author?._id && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4  cursor-pointer text-red-500  top-3"
                    onClick={() => handleDeleteComments(item._id)}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentItems;
