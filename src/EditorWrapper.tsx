import dynamic from "next/dynamic";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

interface IEditorWrapperProps {
  name: string;
  onBlur: (e: string) => void;
}

const isServer = () => typeof window === `undefined`;

export const EditorWrapper: React.FC<IEditorWrapperProps> = ({
  name,
  onBlur: onBlurValue,
}) => {
  const { control } = useFormContext();

  return (
    <>
      {!isServer() && (
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value },
            // fieldState: { invalid, isTouched, isDirty, error },
            // formState,
          }) => (
            <Editor
              onBlur={() => {
                onBlurValue(value);
                onBlur();
              }} // notify when input is touched
              onChange={onChange} // send value to hook form
              value={value} // set value from hook form
            />
          )}
        />
      )}
    </>
  );
};
