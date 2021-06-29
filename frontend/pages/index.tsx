import Head from "next/head";
import Dropdown from "../components/Dropdown";
import axios from "axios";
import React, { useState } from "react";
import Animations from "../components/Animations";
("./components/Animations");
import Render from "../components/Render";
import Download from "../components/Download";
import EmailForm from "../components/Email";

export default function Home() {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
  >("Upload");

  const handleUpload = async () => {
    if (uploadState === "Uploading") return;
    setUploadState("Uploading");
    const formData = new FormData();
    formData.append("myFile", file);
    try {
      const { data } = await axios({
        method: "post",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDownloadPageLink(data.downloadPageLink);
      setId(data.id);
    } catch (error) {
      console.log(error.response.data);
      setUploadState("Upload Failed");
    }
  };

  const resetComponent = () => {
    setFile(null);
    setDownloadPageLink(null);
    setUploadState("Upload");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center hover:bg-blue-400 hover:shadow-lg hover:border-transparent rounded-xl transition duration-500 ease-out-in transform hover:-translate-y-1 hover:-translate-x-1 hover:scale-110">
        <h2 className="my-4 text-3xl font-medium italic hover:text-red-500 hover:text-4xl hover:underline ">
          Send a file
        </h2>
        <div className="flex flex-col items-center justify-center bg-yellow-500 shadow-xl w-96 rounded-xl">
          {!downloadPageLink && <Dropdown setFile={setFile} />}
          {file && (
            <Render
              file={{
                format: file.type.split("/")[1],
                name: file.name,
                sizeInBytes: file.size,
              }}
            />
          )}

          {!downloadPageLink && file && (
            <button
              className="button bg-red-600 p-1 my-3 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-90"
              onClick={handleUpload}
            >
              {uploadState}
            </button>
          )}

          {downloadPageLink && (
            <div className="p-2 text-center transition duration-500 ease-out-in transform hover:-translate-y-1 hover:scale-90">
              <Download downloadPageLink={downloadPageLink} />
              <EmailForm id={id} />
              <button
                className="p-1 my-3 transition duration-500 ease-in-out  bg-gray-900 rounded-md w-30 focus:outline-none hover:bg-red-600 transform hover:-translate-y-1 hover:scale-90 hover:shadow-lg hover:border-transparent rounded-xl"
                onClick={resetComponent}
              >
                Upload New File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
