import SkeletonImage from "antd/es/skeleton/Image";
import SkeletonInput from "antd/es/skeleton/Input";
import React from "react";

const SkeleteonListCards = () => {
  return (
    <section className="p-4 ">
      <SkeletonInput size="large" active block />
      <div className=" w-full flex overflow-auto  flex-wrap justify-center rounded-md max-h-[70vh] ">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div className="md:w-4/12 sm:w-6/12 w-full p-2" key={idx}>
            <SkeletonImage rootClassName="w-full" active style={{ height: "180px" ,width:"350%"}}  />
          </div>
        ))}
      </div>
    </section >
  );
};

export default SkeleteonListCards;
