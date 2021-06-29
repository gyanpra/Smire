import { Dispatch, FunctionComponent, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropdown: FunctionComponent<{ setFile: Dispatch<any> }> = ({
  setFile,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: "image/jpeg,image/png,audio/mpeg,application/pdf",
    });

  return (
    <div className="w-full p-4 group border-indigo-500 hover:bg-yellow-600 hover:shadow-lg hover:border-transparent">
      <div
        {...getRootProps()}
        className="w-full rounded-md cursor-pointer h-80 focus:outline-none"
      >
        <input {...getInputProps()} />

        <div
          className={
            "flex flex-col items-center justify-center h-full space-y-3 border-2 border-solid border-yellow-light rounded-xl " +
            (isDragReject === true ? "border-red-700" : "") +
            (isDragAccept === true ? "border-green-700" : "")
          }
        >
          {/*  <img src="/images/folder.png" alt="folder" className="w-16 h-16" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 fill-current text-blue-200 hover:text-green-400"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          {isDragReject ? (
            <p>Oops, We only ship images, songs and pdfs</p>
          ) : (
            <>
              <p className="hover:text-green-400  hover:shadow-xl hover:border-transparent">
                Drag & Drop your File
              </p>
              <p className="mt-2 text-base text-gray-300 hover:text-green-400 hover:shadow-xl hover:border-transparent">
                Only Pdf, jpeg , png & songs
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
