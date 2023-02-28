const express = require("express");
const { default: mongoose } = require("mongoose");
const { JSONForm, UserFormData } = require("./model/form");

const app = express();
app.use(express.json());

app.post("/create-form", async (req, res) => {
  const { dept, subDept, jsonForm } = req.body;

  const form = await JSONForm.create({
    dept,
    subDept,
    jsonForm,
  });

  return res.status(201).json({ msg: "form created" });
});

app.post("/add-user-form", async (req, res) => {
  const { dept, subDept, jsonFormData, form_id } = req.body;

  const form = await UserFormData.create({
    dept,
    subDept,
    jsonFormData,
    form_id,
  });

  return res.status(201).json({ msg: "user data added" });
});

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost/dfb");
    console.log("connected to db");

    app.listen(8000, () => {
      console.log("server run on 8000....");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
