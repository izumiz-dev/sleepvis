import { useCallback } from "react";

export interface IInputFile {
  setInputFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export const FileInput = ({ setInputFile }: IInputFile) => {
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files !== null) {
        setInputFile(e.currentTarget.files[0]);
      }
    },
    [setInputFile]
  );

  return (
    // <>
    <div style={{ padding: "4px", margin: "8px" }}>
      <input type="file" accept="text" onChange={onUploadImage} />
    </div>
    // </>
  );
};
