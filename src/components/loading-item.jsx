import React from "react";
import { Shimmer } from "react-shimmer";

const LoadingItem = (props) => {
  return (
    <div className="max-w-sm h-95 rounded overflow-hidden shadow-lg">
      <Shimmer height={400} width={600} />
    </div>
  );
};

export default LoadingItem;
