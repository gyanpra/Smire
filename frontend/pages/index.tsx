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
      <div className="flex flex-col items-center justify-center">
        <h2 className="my-4 text-3xl font-medium italic">Send a file</h2>
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
              className="p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none"
              onClick={handleUpload}
            >
              {uploadState}
            </button>
          )}

          {downloadPageLink && (
            <div className="p-2 text-center">
              <Download downloadPageLink={downloadPageLink} />
              <EmailForm id={id} />
              <button
                className="button p-1 my-3 bg-gray-900 rounded-md w-30 focus:outline-none"
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
