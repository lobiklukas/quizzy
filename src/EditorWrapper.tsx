import dynamic from "next/dynamic";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

interface IEditorWrapperProps {
  name: string;
  onBlur?: () => void;
}

const isServer = () => typeof window === `undefined`;

export const EditorWrapper: React.FC<IEditorWrapperProps> = ({
  name,
  onBlur: onBlurValue,
  // onChange: onChangeValue,
}) => {
  const { control } = useFormContext();

  return (
    <>
      {!isServer() && (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <Editor
              onBlur={() => {
                onBlurValue?.();
                onBlur();
              }} // notify when input is touched
              onChange={(changedValue) => {
                onChange(changedValue);
              }} // send value to hook form
              value={value} // set value from hook form
            />
          )}
        />
      )}
    </>
  );
};

export default EditorWrapper;
