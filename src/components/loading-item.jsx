import React from "react";
import dynamic from "next/dynamic";

const Shimmer = dynamic(() => import("react-shimmer").then((a) => a.Shimmer), {
  ssr: false,
});

const LoadingItem = (props) => {
  return (
    <div className="max-w-sm h-95 rounded overflow-hidden shadow-lg">
      <Shimmer height={400} width={600} />
    </div>
  );
};

export default LoadingItem;
