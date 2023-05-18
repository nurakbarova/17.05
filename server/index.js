const express = require("express");
var cors = require('cors')
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose=require('mongoose')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
dotenv.config();



//student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  surname: String,
  GPA: Number,
  faculty:String
 
});


//student Model
const studentModel = mongoose.model('student', studentSchema);

//MONGO DATABASE CONNECTION

mongoose.connect(process.env.DB_CONNECTION.replace("<password>", process.env.DB_PASSWORD))
.then(()=>console.log("mongo db connect"))

//post
app.post("/api/student",async(req, res) => {
  const { name, age, surname,faculty,GPA } = req.body;
  const newStudent = new studentModel({
    name: name,
    surname: surname,
    faculty: faculty,
    age: age,
    GPA: GPA,
  })
  await newStudent.save();
  res.status(201).send("created");
});

///get student by ID
app.get("/api/student", async(req, res) => {
  const id = req.params.id;
  const student = await studentModel.findById(id);
  console.log('student found: ',student);
  if (!student) {
    res.status(204).send("student not found!");
  } else {
    res.status(200).send({
      data: student,
      message: "data get success!",
    });
  }
});

//delete student by ID
app.delete("/api/student", async(req, res) => {
  const id = req.params.id;
  const student = await studentModel.findByIdAndDelete(id);
  if (student === undefined) {
    res.status(404).send("student not found");
  } else {
    res.status(203).send({
      data: student,
      message: "student deleted successfully",
    });
  }
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

  PORT  = process.env.PORT;
  app.listen(PORT, () => {
      console.log(`NODE APP listening on port ${PORT}`);
  });


app.listen(PORT, () => {
  console.log(`we api ${PORT}`);
});

