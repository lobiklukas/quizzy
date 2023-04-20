import * as React from "react";
import ReactQuill, { Quill } from "react-quill";
import { HideAndSeekBlot } from "../blots/hideAndSeek";

export interface IQuillPreviewProps {
  value: string;
}

Quill.register(HideAndSeekBlot);

export default function QuillPreview({ value = "" }: IQuillPreviewProps) {
  return (
    <div
      className="quill-preview"
      onPointerDownCapture={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <ReactQuill value={value} readOnly={true} theme={"bubble"} />
    </div>
  );
}
