import React from "react";

const Modal = ({ titulo, cerrar, children }) => {
  return (
    <div className="-ml-2 pr-4 -mt-4 w-10/12 h-5/6 flex absolute  overflow-hidden ">
      <div className=" bg-white my-auto  mx-auto opacity-100  overflow-hidden h-auto ">
        <div className="bg-blue-primary flex flex-row justify-between text-white p-3 mt-1 ">
          <h3 className="self-end">{titulo}</h3>
          <button className="hover:text-red-700" onClick={cerrar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
