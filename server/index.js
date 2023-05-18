const express = require("express");
var cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const PORT = 8080;

const STUDENT = [
  {
    id: 1,
    name: "Nuray",
    surname: "Akbarova",
    GPA: 80,
    faculty: "tetbiq",
  },
];
//get all student
app.get("/student", (req, res) => {
  res.send(STUDENT);
});

//DELETE
app.delete("/student", (req, res) => {
    const id = req.params.id;
    const student = STUDENT.find((x) => x.id == id);
    if (student === undefined) {
      res.status(404).send("student not found");
    } else {
      const idx = STUDENT.indexOf(student);
      STUDENT.splice(idx, 1);
      res.status(203).send({
        data: student,
        message: "artist deleted successfully",
      });
    }
  });

//post
app.post("/student",(req, res) => {
    const { name, id, surname,faculty,GPA } = req.body;
    console.log(req.body);
    const newStudent = {
      id: id,
      name: name,
      surname: surname,
      GPA: GPA,
      faculty:faculty
    };
    STUDENT.push(newStudent);
    res.status(201).send("created");
  });
  
//PUT
app.put("/api/student/:id", (req, res) => {
    const { name, id, surname,faculty,GPA } = req.body;
    const existedStudent = STUDENT.find((x) => x.id == id);
    if ( existedStudent  == undefined) {
      res.status(404).send("student not found!");
    } else {
      if (name) {
        existedStudent .name = name;
      }
      if (age) {
        existedStudent .surname = surname;
      }
      if (faculty) {
        existedStudent .faculty = faculty;
      }
      if (GPA) {
        existedStudent .GPA = GPA;
      }
      res.status(200).send(`student: ${existedStudent.name}`);
    }
  });




app.listen(PORT, () => {
  console.log(`we api ${PORT}`);
});

// 