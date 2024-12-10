import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface TextEditorProps {
  msgBody: string;
  onmsgBodyChange: (newmsgBody: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ msgBody, onmsgBodyChange }) => {
  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [""] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
          ],
        },
      ],
    ],
  };

  const formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  return (
    <div style={{ display: "grid", justifyContent: "center" }}>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Write your Email..."
        value={msgBody}
        onChange={onmsgBodyChange}
        style={{ height: "253px", width: "41rem" }}
      />
    </div>
  );
};

export default TextEditor;
