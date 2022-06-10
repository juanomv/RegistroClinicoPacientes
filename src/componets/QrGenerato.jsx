import React from "react";
import QRImage from "react-qr-image";
import html2canvas from "html2canvas";

const QrGenerato = ({ url }) => {
  const downloadQR = async () => {
    const element = document.getElementById("123456"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/png"),
      link = document.createElement("a");

    link.href = data;
    link.download = "QRImage-LabMarceloSpinola.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" flex flex-col">
      <div id="123456" className="w-52">
        <QRImage >{url}</QRImage>
      </div>

      <button
        className="m-auto mb-3 flex flex-row border-2 border-green-primary bg-green-primary text-white w-4/6  py-2 text-center justify-evenly hover:bg-gray-100 hover:text-green-primary rounded-lg "
        onClick={downloadQR}
      >
        <p>Descargar Qr</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </button>
    </div>
  );
};

export default QrGenerato;
