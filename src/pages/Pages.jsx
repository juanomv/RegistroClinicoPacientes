import React from "react";
import img from "../assets/img/imagen.png";
import bg from "../assets/img/bg.svg";
import img2 from "../assets/img/logo2.svg";
function Pages() {
  const containerStyle = {
    backgroundImage: `url(${bg})`,
  };
  
  return (
    <div
      class="leading-normal tracking-normal text-gray-900"
      
    >
      <div
        class="h-screen pb-14 bg-right bg-cover"
        style={containerStyle}
      >
        
        <div class="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          {/* <!--Left Col--> */}
          <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 class="my-4 text-3xl md:text-5xl text-blue-primary font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
              Laboratorio Marcelo Spinola
            </h1>
            <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
              Sub-hero message, not too long and not too short.
            </p>

            
          </div>

          {/* <!--Right Col--> */}
          <div class="w-full xl:w-3/5 py-6 overflow-y-hidden">
            <img src={img2} class="w-full pr-4 bounce-top-icons" />
            {/* <img class="w-5/6 mx-auto lg:mr-0 slide-in-bottom" src="devices.svg"> */}
          </div>

          {/* <!--Footer--> */}
          <div class="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
            <a class="text-gray-500 no-underline hover:no-underline" href="#">
              &copy; MARCELO SPINOLA LAB
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pages;
