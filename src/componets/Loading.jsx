import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center bg-white h-80  w-80 absolute"> 
    <div class=" flex flex-col justify-center items-center m-0 ">
      <div class="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-900 "></div>
      <div className="absolute">Cargando..</div>
    </div>
    </div>
  );
};

export default Loading;
