import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MarksheetPDF from "./MarksheetPDF";

const PDFDownloader = ({ students, subjects, examTitle, className }) => {
  return (
    <div>
      <PDFDownloadLink
        document={
          <MarksheetPDF
            students={students}
            subjects={subjects}
            examTitle={examTitle}
            className={className}
          />
        }
        fileName="marksheets.pdf"
      >
        {({ loading }) => (
          <button className="bg-purple-600 text-white p-3 rounded-lg mt-3">
            {loading ? "📄 Preparing PDF..." : "📥 Download Marksheets PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFDownloader;