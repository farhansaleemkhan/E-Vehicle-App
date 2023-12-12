import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Receipt = ({ value }) => {
  const receipt = useRef(null);

  const urlSearchString = window.location.search;

  const params = new URLSearchParams(urlSearchString);

  const downloadReceipt = () => {
    const receiptContent = receipt.current;
    // html2canvas(receiptContent).then((canvas) => {

    html2canvas(receiptContent, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("Receipt.pdf");
    });
  };
  return (
    <>
      <div ref={receipt} className="py-2 px-5" style={{ width: "100%" }}>
        <p className="fw-bold fs-3 mt-5 text-center">Parking Booked Successfully</p>
        <p className="my-2 text-center fs-5 fw-semibold">Parking ID: {params.get("id")} </p>
        <hr />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="text-start fw-semibold fs-5">Booked By:</p>
          <p className="text-end fw-bolder fs-4">{params.get("parkedby")}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="fs-5">Vehicle Number: </p>
          <p className="fw-medium fs-5">{params.get("vehnum")} </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="fs-5">Vehicle Name: </p>
          <p className="fw-medium fs-5">{params.get("vehname")} </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="fs-5">Booking Time: </p>
          <p className="fw-medium fs-5">{params.get("booktime")}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="fs-5">Company Name: </p>
          <p className="fs-5 fw-medium">{params.get("comname")}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="fs-5">Parking Area Name: </p>
          <p className="fs-5 fw-medium">{params.get("parkareaname")}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="fs-5">Slot No: </p>
          <p className="fs-5 fw-medium"> {params.get("slotno")}</p>
        </div>
        <hr />
      </div>
      <div className="text-center" style={{ margin: "3rem" }}>
        <button
          className="btn btn-outline-warning rounded fw-medium fs-4 p-2"
          type="button"
          onClick={downloadReceipt}
        >
          Download Receipt!
        </button>
      </div>
    </>
  );
};

export default Receipt;
