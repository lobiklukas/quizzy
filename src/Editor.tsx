import dynamic from "next/dynamic";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import type { Quill as QuillType } from "quill";
import "react-quill/dist/quill.snow.css";

import BlotFormatter from "@prcdavid/quill-blot-formatter";
import ImageCompress from "quill-image-compress";
import { HideAndSeekBlot } from "./blots/hideAndSeek";

Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register("modules/imageCompress", ImageCompress);

const icons = Quill.import("ui/icons");
Quill.register(HideAndSeekBlot);
icons["hideAndSeek"] =
  '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"></path><path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z"></path></svg>';

interface IEditorProps {
  value: string;
  onBlur: (e: unknown) => void;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: {
    container: [
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
      ["hideAndSeek"],
    ],
    handlers: {
      hideAndSeek: function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const q: QuillType = (this as any)?.quill;
        const range = q.getSelection();
        if (range) {
          const selectedContent = q.getContents(range.index, range.length);

          if (selectedContent.ops && !selectedContent.ops?.length) {
            return;
          }

          if (selectedContent?.ops?.[0]?.insert?.hideAndSeek) {
            q.deleteText(range.index, range.length);
            q.insertText(
              range.index,
              Object.values(selectedContent?.ops?.[0]?.attributes ?? {})?.join(
                ""
              )
            );
          } else {
            q.deleteText(range.index, range.length);
            q.insertEmbed(
              range.index,
              "hideAndSeek",
              selectedContent?.ops?.[0]?.insert
            );
            q.insertText(range.index + 1, " ");
            q.setSelection(range.index + 2, 0);
          }
          // move the cursor to the end of the selection
        }
      },
    },
  },
  blotFormatter: {},
  imageCompress: {},
  // hideAndSeek: {},
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
