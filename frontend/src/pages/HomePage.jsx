import React from "react";

const HomePage = () => {
  
  return (
    <div className="w-[80%] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center mt-10">
      <div className="items-center rounded-xl bg-gray-200 w-auto h-full">
        <div className="w-full h-[75%]">
          <img src="/logo.png" />
        </div>
        <div className="w-full h-[25%] bg-gray-600 items-center rounded-bl-xl rounded-br-xl">
          <p className="font-bold lg:text-lg xl:text-xl text-center 2xl:text-2xl">
            Movie Mingle
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
