import express from "express";
import path from "path";
import EnatonPDFMaker, {
  EnatonPdfHtmlTemplateOptions,
} from "./lib";

const currentDir = path.resolve(path.dirname(__filename));
const templatesDir = path.join(currentDir, "templates");
// const viewsDir = path.join(templatesDir, "views");
const cssDir = path.join(currentDir, "css");
const PORT = process.env.PORT || 3000;
const app = express();

// use pug as view engine
app.set("view engine", "pug");
app.set("views", templatesDir);

// serve static files
app.use(express.static(cssDir));
app.use(express.static(templatesDir));
app.use(express.static(path.join(currentDir, "public")));

// Datasets
const subjects = [
  {
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },
  {
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },
  {
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },{
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },{
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },{
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },{
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },{
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },{
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },{
    Subject: "Mathematics",
    Marks: 100,
    Grade: "A",
    Position: "1/20",
    Remarks: "Very good",
    Term: 1,
    Year: 2020,
    Teacher: "Mr. Teacher",
  },
];

const classTrend = [
  {
    class: "Form 1",
    stream: "A",
    terms: [
      {
        term: 1,
        year: 2020,
        mean: 100,
        average: 100,
        grade: "A",
        position: "1/20",
        remarks: "Very good",
      },
      {
        term: 2,
        year: 2020,
        mean: 100,
        average: 100,
        grade: "A",
        position: "1/20",
        remarks: "Very good",
      },
    ],
  },
];
const fees = {
  schoolFeeBalance: 1000,
  transportFeeBalance: 1000,
  nextTermFeeBalance: 1000,
};
// routes
app.get("/", (_req, res) => {
  res.render("index");
});

app.get("/report-sample", (_req, res) => {
  
  return res.render("report-sample", {
    title: "Report Sample",
    fees,
    subjects,
    classTrend,
  });
});

app.get("/print-report", async (_req, res) => {
  try {
    // const subjects = [
    //   {
    //     Subject: "Mathematics",
    //     Marks: 100,
    //     Grade: "A",
    //     Position: "1/20",
    //     Remarks: "Very good",
    //     Term: 1,
    //     Year: 2020,
    //     Teacher: "Mr. Teacher",
    //   },
    //   {
    //     Subject: "Mathematics",
    //     Marks: 100,
    //     Grade: "A",
    //     Position: "1/20",
    //     Remarks: "Very good",
    //     Term: 1,
    //     Year: 2020,
    //     Teacher: "Mr. Teacher",
    //   },
    //   {
    //     Subject: "Mathematics",
    //     Marks: 100,
    //     Grade: "A",
    //     Position: "1/20",
    //     Remarks: "Very good",
    //     Term: 1,
    //     Year: 2020,
    //     Teacher: "Mr. Teacher",
    //   },
    // ];

    // const classTrend = [
    //   {
    //     class: "Form 1",
    //     stream: "A",
    //     terms: [
    //       {
    //         term: 1,
    //         year: 2020,
    //         mean: 100,
    //         average: 100,
    //         grade: "A",
    //         position: "1/20",
    //         remarks: "Very good",
    //       },
    //       {
    //         term: 2,
    //         year: 2020,
    //         mean: 100,
    //         average: 100,
    //         grade: "A",
    //         position: "1/20",
    //         remarks: "Very good",
    //       },
    //     ],
    //   },
    // ];
    // const fees = {
    //   schoolFeeBalance: 1000,
    //   transportFeeBalance: 1000,
    //   nextTermFeeBalance: 1000,
    // };
    const templateOptions: EnatonPdfHtmlTemplateOptions = {
      title: "Report Sample",
      name: "John Doe",
      age: 30,
      subjects,
      classTrend,
      fees,
      filename: "report-sample",
      basedir: templatesDir,
      htmlTemplatePath: path.join(templatesDir, "report-sample.pug"),
      globals: [],
    };
    // const pdfOptions:Enatop
    const pdfFile = await EnatonPDFMaker.generatePdf({
      //   styleOptions,
      htmlTemplateOptions: templateOptions,
      pdfOptions: {
        format: "A4",
        landscape: false,
        printBackground: true,
      },
      htmlTemplatePath: path.join(templatesDir, "report-sample.pug"),
      //   styleOptions,
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=report-sample.pdf"
    );
    return res.send(pdfFile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
