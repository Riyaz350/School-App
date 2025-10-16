"use client";

import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CombinedMarkSheetPDF from "./CombinedMarkSheetPDF";
import MarkSheetTable from "./MarkSheetTable";
import {
  TextField,
  Box,
  Typography,
  Button,
} from "@mui/material";

const initialSubjects = [
  "বিষয় ১",
  "বিষয় ২",
  "বিষয় ৩",
  "বিষয় ৪",
  "বিষয় ৫",
  "বিষয় ৬",
];

const initialStudents = [
  { name: "", marks: Array(6).fill(""), subtotal: 0, position: "" },
];

const MarkSheetMaker = () => {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [students, setStudents] = useState(initialStudents);
  const [examTitle, setExamTitle] = useState("");
  const [className, setClassName] = useState("");
  const [showIndividualSheets, setShowIndividualSheets] = useState(false);

  const toBengaliDigits = (number) => {
    const bengaliMap = {
      0: "০", 1: "১", 2: "২", 3: "৩", 4: "৪",
      5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯",
    };
    return number
      .toString()
      .split("")
      .map((d) => bengaliMap[d] || d)
      .join("");
  };

  const toBengaliOrdinal = (position) => {
    const base = toBengaliDigits(position);
    if (position === 1) return "১ম";
    if (position === 2) return "২য়";
    if (position === 3) return "৩য়";
    if (position === 4) return "৪র্থ";
    if (position === 5) return "৫ম";
    if (position === 6) return "৬ষ্ঠ";
    if (position === 7) return "৭ম";
    if (position === 8) return "৮ম";
    if (position === 9) return "৯ম";
    if (position === 10) return "১০ম";
    return `${base}তম`;
  };

  useEffect(() => {
    const savedSubjects = localStorage.getItem("examSubjects");
    const savedStudents = localStorage.getItem("examStudents");
    const savedExamTitle = localStorage.getItem("examTitle");
    const savedClassName = localStorage.getItem("className");

    if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedExamTitle) setExamTitle(savedExamTitle);
    if (savedClassName) setClassName(savedClassName);
  }, []);

  useEffect(() => {
    localStorage.setItem("examTitle", examTitle);
  }, [examTitle]);

  useEffect(() => {
    localStorage.setItem("className", className);
  }, [className]);

  useEffect(() => {
    localStorage.setItem("examSubjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("examStudents", JSON.stringify(students));
  }, [students]);

  const handleSubjectChange = (index, value) => {
    const updated = [...subjects];
    updated[index] = value;
    setSubjects(updated);
  };

  const handleStudentChange = (rowIdx, colIdx, value) => {
    const updated = [...students];
    if (colIdx === -1) {
      updated[rowIdx].name = value;
    } else {
      const numericValue = value.replace(/[^0-9.]/g, "");
      updated[rowIdx].marks[colIdx] = numericValue;

      const subtotal = updated[rowIdx].marks.reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0
      );
      updated[rowIdx].subtotal = subtotal;
    }
    setStudents(updated);
  };

  const addStudentRow = () => {
    setStudents([
      ...students,
      { name: "", marks: Array(6).fill(""), subtotal: 0, position: "" },
    ]);
  };

  const clearTable = () => {
    setSubjects(initialSubjects);
    setStudents(initialStudents);
    setExamTitle("২০২৫ খ্রি:");
    setClassName("৩য়");
    localStorage.removeItem("examSubjects");
    localStorage.removeItem("examStudents");
    localStorage.removeItem("examTitle");
    localStorage.removeItem("className");
  };

  const setPositionsManually = () => {
    const subtotals = students.map((s, i) => ({ score: s.subtotal, index: i }));
    const sorted = [...subtotals].sort((a, b) => b.score - a.score);

    const positionMap = new Map();
    let currentRank = 1;

    for (let i = 0; i < sorted.length; i++) {
      const { score } = sorted[i];
      if (i === 0 || score !== sorted[i - 1].score) {
        positionMap.set(score, currentRank);
        currentRank++;
      }
    }

    const updated = students.map((s) => ({
      ...s,
      position: toBengaliOrdinal(positionMap.get(s.subtotal)),
    }));

    setStudents(updated);
    setShowIndividualSheets(true);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col items-center gap-4 text-white text-sm lg:text-lg font-bold">
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={setPositionsManually}
        >
          📌 Set Position & Make Mark Sheet
        </button>

        {showIndividualSheets && (
          <PDFDownloadLink
            document={
              <CombinedMarkSheetPDF
                students={students}
                subjects={subjects}
                examTitle={examTitle}
                className={className}
              />
            }
            fileName="marksheet.pdf"
          >
            {({ loading }) => (
              <button className="bg-green-600 px-4 py-2 rounded-lg mt-2">
                {loading ? "📄 Preparing PDF..." : "📥 Download Combined MarkSheet"}
              </button>
            )}
          </PDFDownloadLink>
        )}
      </div>

      <Box
        sx={{
          textAlign: "center",
          mb: 3,
          px: 2,
          py: 2,
          bgcolor: "#fff",
          color: "#000",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          ইসলাম উদ্দিন দাখিল ইনস্টিটিউট ব্রাহ্মণবাড়িয়া
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="পরীক্ষার নাম"
            variant="standard"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            sx={{ minWidth: 200 }}
            InputProps={{ style: { color: "#000" } }}
            InputLabelProps={{ style: { color: "#000" } }}
          />

          <Typography variant="h6">ট্যাবুলেশন শীট</Typography>

          <TextField
            variant="standard"
            label="শ্রেণিঃ"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            sx={{ minWidth: 100 }}
            InputProps={{ style: { color: "#000" } }}
          />
        </Box>
      </Box>

      <MarkSheetTable
        students={students}
        subjects={subjects}
        handleSubjectChange={handleSubjectChange}
        handleStudentChange={handleStudentChange}
        addStudentRow={addStudentRow}
        clearTable={clearTable}
        toBengaliDigits={toBengaliDigits}
      />
    </div>
  );
};

export default MarkSheetMaker;