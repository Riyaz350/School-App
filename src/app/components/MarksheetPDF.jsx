import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Bengali font
Font.register({
  family: "NotoSansBengali",
  src: "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSansBengali/NotoSansBengali-Regular.ttf",
});

// Bengali digit conversion
const toBengaliDigits = (number) => {
  const bengaliMap = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };
  return number
    .toString()
    .split("")
    .map((d) => bengaliMap[d] || d)
    .join("");
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansBengali",
    padding: 15,
    fontSize: 12,
    backgroundColor: "#fff",
    color: "#000",
  },
  header: { textAlign: "center", marginBottom: 10, fontWeight: "bold" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  headerCell: {
    flex: 1,
    padding: 6,
    border: "1px solid #000",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  // table: { marginTop: 2 },
  cell: {
    flex: 1,
    padding: 6,
    border: "1px solid #000",
    textAlign: "center",
  },
  bold: { fontWeight: "bold" },
  section: {
    marginBottom: 30,
    borderBottom: "1px dashed #aaa",
    paddingBottom: 10,
  },
});

const MarksheetPDF = ({ students, subjects, examTitle, className }) => {
  const pages = [];

  for (let i = 0; i < students.length; i += 3) {
    const pair = students.slice(i, i + 3);

    pages.push(
      <Page key={i} size="A4" style={styles.page}>
        {pair.map((student, idx) => {
          const total = student.subtotal;
          const position = student.position || "";

          return (
            <View key={idx} style={styles.section}>
              <Text style={styles.header}>
                ইসলাম উদ্দিন দাখিল ইনস্টিটিউট, ব্রাহ্মণবাড়িয়া{" "}
              </Text>
              <Text style={styles.header}>
                {examTitle || "৫ম মাসিক পরীক্ষা - ২০২৫ খ্রি:"}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <Text>শ্রেণীঃ {className || "৩য়"}</Text>
                <Text>রোল নম্বরঃ {toBengaliDigits(i + idx + 1)}</Text>
              </View>
              <Text>নামঃ {`${student.name} ` || "—"} </Text>

              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.headerCell}>`বিষয়সমূহ `</Text>
                  {subjects.map((subject, sIdx) => (
                    <Text key={sIdx} style={styles.headerCell}>
                      {`${subject} `}
                    </Text>
                  ))}
                  <Text style={styles.headerCell}>মোট </Text>
                  <Text style={styles.headerCell}>স্থান</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>প্রাপ্ত নম্বর</Text>
                  {student.marks.map((mark, mIdx) => (
                    <Text key={mIdx} style={styles.cell}>
                      {toBengaliDigits(mark  || "০")}
                    </Text>
                  ))}
                  <Text style={styles.cell}>{toBengaliDigits(total)}</Text>
                  <Text style={styles.cell}>{position}</Text>
                </View>
              </View>

              <div className=" ">
                <View style={[styles.row, { marginTop: 35 }]}>
                  <Text>শ্রেণি শিক্ষকের স্বাক্ষর</Text>
                  <Text>অধ্যক্ষের স্বাক্ষর</Text>
                </View>
              </div>
            </View>
          );
        })}
      </Page>
    );
  }

  return <Document>{pages}</Document>;
};

export default MarksheetPDF;
