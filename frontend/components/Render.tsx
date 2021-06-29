import { size } from "../library/size";
import { IFile } from "../library/types";
import { FunctionComponent } from "react";

const Render: FunctionComponent<{
  file: IFile;
}> = ({ file: { format, sizeInBytes, name } }) => {
  return (
    <div className="flex items-center w-full p-4 my-2">
      <img src={`/images/${format}.png`} alt="" className="w-14 h-14" />
      <span className="mx-2">{name}</span>
      <span className="ml-auto">{size(sizeInBytes)}</span>
    </div>
  );
};

export default Render;
