import Render from "../../../components/Render";
import axios from "axios";
import { IFile } from "../../../library/types";
import { GetServerSidePropsContext, NextPage } from "next";
import fileDownload from "js-file-download";
const index: NextPage<{
  file: IFile;
}> = ({ file: { format, name, sizeInBytes, id } }) => {
  const handleDownload = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/files/${id}/download`,
      {
        responseType: "blob",
      }
    );
    fileDownload(data, name);
  };

  return (
    <div className="flex flex-col items-center justify-center hover:bg-blue-400 hover:shadow-lg hover:border-transparent rounded-xl transition duration-500 ease-out-in transform hover:-translate-y-1 hover:-translate-x-1 hover:scale-110">
      {!id ? (
        <span>Oops! File does not exist! check the URL</span>
      ) : (
        <>
          {/* <img src="/images/file-download.png" alt="" className="w-16 h-16" /> */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 my-4 text-3xl font-medium italic hover:text-red-500 hover:text-4xl"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={handleDownload}
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="flex flex-col items-center justify-center bg-yellow-500 shadow-xl w-96 rounded-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-90 hover:shadow-lg hover:border-transparent">
            Your file is ready for download
          </h2>
          <Render file={{ format, name, sizeInBytes }} />
          <button
            className="p-1 my-3 transition duration-500 ease-in-out  bg-gray-900 rounded-md w-30 focus:outline-none hover:bg-red-600 transform hover:-translate-y-1 hover:scale-90 hover:shadow-lg hover:border-transparent rounded-xl"
            onClick={handleDownload}
          >
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let file;
  try {
    const { data } = await axios.get(`http://localhost:8000/api/files/${id}`);
    file = data;
  } catch (error) {
    console.log(error.response.data);
    file = {};
  }

  return {
    props: {
      file,
    }, // will be passed to the page component as props
  };
}
