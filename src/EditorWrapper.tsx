import dynamic from "next/dynamic";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

interface IEditorWrapperProps {
  name: string;
  onBlur: () => void;
  onChange: () => void;
}

const isServer = () => typeof window === `undefined`;

export const EditorWrapper: React.FC<IEditorWrapperProps> = ({
  name,
  onBlur: onBlurValue,
  onChange: onChangeValue,
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
                onBlurValue();
                onBlur();
              }} // notify when input is touched
              onChange={(changedValue) => {
                console.log("🚀 ~ file: EditorWrapper.tsx ~ line 40 ~ changedValue !== value", changedValue !== value)
                if (changedValue !== value) {
                  onChange(changedValue);
                  onChangeValue();
                }
              }} // send value to hook form
              value={value} // set value from hook form
            />
          )}
        />
      )}
    </>
  );
};
