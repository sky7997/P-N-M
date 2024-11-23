import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[90vh] bg-gradient-to-br from-blue-50 to-indigo-50">
      <ThreeDots
        height="80"
        width="80"
        color="darkcyan"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
