import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Image1 from "../../../public/images/Image1";
import Image2 from "../../../public/images/Image2";
import Image3 from "../../../public/images/Image3";

export type TaskHeaderType = {
  image?: string;
  title?: string;
  description?: string;
};

const TaskHeader: NextPage<TaskHeaderType> = ({
  image,
  title,
  description,
  
}) => {
 
  const renderImage = () => {
    switch (image) {
      case "image1":
        return <Image1 />;
      case "image2":
        return <Image2 />;
      case "image3":
        return <Image3 />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex-1 rounded-lg bg-white box-border overflow-hidden flex flex-row items-center justify-start py-[23px] px-[15px] gap-[10px] max-w-full text-left text-base text-gray-400 font-inter border-[1px] border-solid border-whitesmoke-200"
    
    >
      {renderImage()}
      <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
        <div className="self-stretch relative font-semibold whitespace-nowrap">
          {title}
        </div>
        <div className="self-stretch relative text-sm text-gray-200">
          {description}
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
