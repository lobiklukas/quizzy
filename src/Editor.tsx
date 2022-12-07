import dynamic from "next/dynamic";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import ImageCompress from "quill-image-compress";

Quill.register("modules/imageCompress", ImageCompress);

interface IEditorProps {
  value: string;
  onBlur: (e: unknown) => void;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ],
};

const Editor: React.FC<IEditorProps> = ({ value, onBlur, onChange }) => {
  return (
    <ReactQuill
      onBlur={onBlur}
      onChange={onChange}
      className="min-h-16 w-full resize-x"
      theme="snow"
      modules={modules}
      value={value}
    />
  );
};

export default dynamic(() => Promise.resolve(Editor), {
  ssr: false,
});
