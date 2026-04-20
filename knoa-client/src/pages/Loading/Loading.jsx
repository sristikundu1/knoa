import React from "react";
// import Lottie from "lottie-react";
// import loading from "../../assets/courseLoading.json";
const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className=" mx-auto mb-6">
        <div className="animate-spin rounded-full h-18 w-18 border-t-8 border-b-8 border-[#0077b6] mb-4"></div>
        {/* <Lottie animationData={loading} loop={true} /> */}
      </div>
    </div>
  );
};

export default Loading;
