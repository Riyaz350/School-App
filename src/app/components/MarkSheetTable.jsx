import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Button,
} from "@mui/material";

const MarkSheetTable = ({
  students,
  subjects,
  handleSubjectChange,
  handleStudentChange,
  addStudentRow,
  clearTable,
  toBengaliDigits,
}) => {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer component={Paper} sx={{ minWidth: 900 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 80, textAlign: "center", whiteSpace: "nowrap" }}>
                রোল নং
              </TableCell>
              <TableCell sx={{ minWidth: 120 }}>নাম</TableCell>
              {subjects.map((subject, idx) => (
                <TableCell key={idx} sx={{ minWidth: 100 }}>
                  <TextField
                    value={subject}
                    onChange={(e) => handleSubjectChange(idx, e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </TableCell>
              ))}
              <TableCell sx={{ minWidth: 100 }}>মোট</TableCell>
              <TableCell sx={{ minWidth: 100 }}>স্থান</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, rowIdx) => (
              <TableRow key={rowIdx}>
                <TableCell sx={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {toBengaliDigits(rowIdx + 1)}
                </TableCell>
                <TableCell>
                  <TextField
                    value={student.name}
                    onChange={(e) => handleStudentChange(rowIdx, -1, e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </TableCell>
                {student.marks.map((mark, colIdx) => (
                  <TableCell key={colIdx}>
                    <TextField
                      value={mark}
                      onChange={(e) => handleStudentChange(rowIdx, colIdx, e.target.value)}
                      variant="standard"
                      type="number"
                      fullWidth
                    />
                  </TableCell>
                ))}
                <TableCell>{toBengaliDigits(student.subtotal)}</TableCell>
                <TableCell>{student.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ textAlign: "center", mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button onClick={addStudentRow} variant="contained">
          ➕ Add Student
        </Button>
        <Button onClick={clearTable} variant="outlined" color="error">
          🧹 Clear Table
        </Button>
      </Box>
    </Box>
  );
};

export default MarkSheetTable;