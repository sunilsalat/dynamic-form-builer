const express = require("express");
require("dotenv").config();
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const JSONForm = require("./model/form");
const { UserFormData } = require('./model/userFormData')


const app = express();
app.use(express.json());
app.use(cors());


// create nwe form 
app.post("/create-form", async (req, res) => {
  const { dept, subDept, jsonForm } = req.body;

  const form = await JSONForm.create({
    dept,
    subDept,
    jsonForm,
  });

  res.status(201).json({ msg: "form created", formId: form._id });
});



// to get fomr with id
app.get('', async (req, res) => {
  res.send('Welcome to server')
})

app.get('/get-form/:id', async (req, res) => {

  try {

    const form = await JSONForm.findOne({ _id: req.params.id })

    if (form) {
      res.status(200).json({ msg: form })
    } else {
      res.status(200).json({ msg: 'no data found' })
    }

  } catch (error) {

    res.send('something went workng')

  }


})



// to get fomr with id
app.get('/get-user-form/:id', async (req, res) => {

  try {

    const form = await UserFormData.findOne({ _id: req.params.id })

    if (form) {
      res.status(200).json({ msg: form })
    } else {
      res.status(200).json({ msg: 'no data found' })
    }

  } catch (error) {

    res.send('something went workng')

  }


})


// to add user data againts any form 
app.post("/add-user-form", async (req, res) => {
  const { dept, subDept, jsonFormData, form_id } = req.body;

  const obj = await UserFormData.create({
    dept,
    subDept,
    jsonFormData,
    form_id,
  });

  return res.status(201).json({ msg: "user data added", userId: obj._id });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");

    app.listen(8000, () => {
      console.log("server run on 8000....");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
