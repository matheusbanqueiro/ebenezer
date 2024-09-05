"use client";

import Spin from "../components/spin";
import { memo } from "react";

const Loading = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex w-full h-full grow bg-black/90"></div>
      <div className="fixed top-0 left-0 z-50 flex w-full h-full grow">
        <div className={`flex gap-2 w-full h-full items-center justify-center z-50 relative`}>
          <Spin className="w-40 h-40 -mt-0.5 ml-0.5 animate-spin absolute fill-red-600 transition duration-1000" />
        </div>
      </div>
    </>
  )
};

export default memo(Loading);