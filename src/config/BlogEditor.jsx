import React, { useState, Component } from "react";
import MdEditor from "react-markdown-editor-lite";

import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";

import "./editor.css";
import PropTypes from "prop-types";
const BlogEditor = ({ content, setContent }) => {
  const mdEditor = React.useRef(null);
  const mdParser = new MarkdownIt();

  const handleClick = () => {
    if (mdEditor.current) {
      alert(mdEditor.current.getMdValue());
    }
  };

  const handleEditorChange = ({ html, text }) => {
    // const newValue = text.replace(/\d/g, "");
    setContent(text);
  };

  const onCustomImageUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="editor-wrap ">
      <MdEditor
        className="rounded bg-slate-400 placeholder:text-[1.5rem] text-[1.5rem]"
        ref={mdEditor}
        value={content}
        style={{
          height: "500px",
        }}
        onImageUpload={onCustomImageUpload}
        placeholder="Write your post content here... "
        onChange={handleEditorChange}
        renderHTML={(text) => mdParser.render(text)}
      />

      {/* <button onClick={handleClick}>Click</button> */}
    </div>
  );
};

export default BlogEditor;
