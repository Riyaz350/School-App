"use client";

import React from "react";
 
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const toBengaliDigits = (number) => {
  const bengaliMap = {
    0: "০", 1: "১", 2: "২", 3: "৩", 4: "৪",
    5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯",
  };
  return number.toString().split("").map(d => bengaliMap[d] || d).join("");
};

const IndividualMarkSheet = ({ students, subjects, examTitle, className }) => {
  return (
    <Box sx={{ mt: 4 }}>
      {students.map((student, idx) => {
        const total = student.subtotal;
        const position = student.position || "";

        return (
          <Paper key={idx} sx={{ p: 6, mb: 4, bgcolor: "#fff", color: "#000" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}>
              ইসলাম উদ্দিন দাখিল ইনস্টিটিউট, ব্রাহ্মণবাড়িয়া
            </Typography>
            <Typography sx={{ textAlign: "center", mb: 1 }}>
              {examTitle || "৪র্থ মাসিক পরীক্ষা - ২০২৫ খ্রি:"}
            </Typography>
            <Typography sx={{ textAlign: "center", mb: 2 }}>
              টাবুলেশন শীট
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography>শ্রেণিঃ {className || "৩য়"}</Typography>
              <Typography>রোল নম্বরঃ {toBengaliDigits(idx + 1)}</Typography>
            </Box>

            <Typography sx={{ mb: 1 }}>নামঃ {student.name || "—"}</Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>বিষয়সমূহ</TableCell>
                  {subjects.map((subject, sIdx) => (
                    <TableCell key={sIdx}>{subject}</TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: "bold" }}>মোট</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>স্থান</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>প্রাপ্ত নম্বর</TableCell>
                  {student.marks.map((mark, mIdx) => (
                    <TableCell key={mIdx}>
                      {toBengaliDigits(mark || "০")}
                    </TableCell>
                  ))}
                  <TableCell>{toBengaliDigits(total)}</TableCell>
                  <TableCell>{position}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 8 }}>
              <Typography>শ্রেণি শিক্ষকের স্বাক্ষর</Typography>
              <Typography>অধ্যক্ষের স্বাক্ষর</Typography>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default IndividualMarkSheet;