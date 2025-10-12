import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "NotoSansBengali",
  src: "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSansBengali/NotoSansBengali-Regular.ttf",
});

const toBengaliDigits = (number) => {
  const bengaliMap = {
    0: "০", 1: "১", 2: "২", 3: "৩", 4: "৪",
    5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯",
  };
  return number.toString().split("").map(d => bengaliMap[d] || d).join("");
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansBengali",
    padding: 20,
    fontSize: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  header: { textAlign: "center", marginBottom: 10, fontWeight: "bold" },
  row: { flexDirection: "row", borderBottom: "1px solid #ccc", padding: 4 },
  cell: { flex: 1, textAlign: "center" },
  bold: { fontWeight: "bold" },
});

const TabulationPDF = ({ students, subjects, examTitle, className }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>ইসলাম উদ্দিন দাখিল ইনস্টিটিউট, ব্রাহ্মণবাড়িয়া </Text>
      <Text style={styles.header}>{examTitle || "৪র্থ মাসিক পরীক্ষা - ২০২৫ খ্রি:"}</Text>
      <Text style={styles.header}>টাবুলেশন শীট- শ্রেণিঃ {className || "৩য়"}</Text>

      <View style={styles.row}>
        <Text style={[styles.cell, styles.bold]}>রোল নম্বর </Text>
        <Text style={[styles.cell, styles.bold]}>নাম </Text>
        {subjects.map((subj, idx) => (
          <Text key={idx} style={[styles.cell, styles.bold]}>{subj}</Text>
        ))}
        <Text style={[styles.cell, styles.bold]}>মোট </Text>
        <Text style={[styles.cell, styles.bold]}>স্থান</Text>
      </View>

      {students.map((student, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.cell}>{toBengaliDigits(idx + 1)}</Text>
          <Text style={styles.cell}>{student.name || "—"}</Text>
          {student.marks.map((mark, mIdx) => (
            <Text key={mIdx} style={styles.cell}>
              {toBengaliDigits(mark || "০")}
            </Text>
          ))}
          <Text style={styles.cell}>{toBengaliDigits(student.subtotal)}</Text>
          <Text style={styles.cell}>{student.position || ""}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default TabulationPDF;