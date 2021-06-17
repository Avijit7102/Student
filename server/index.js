const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.port || 7700;
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://student:student123@cluster0.wy6ti.mongodb.net/student?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('student project!')
  })

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("student").collection("studentList");
  // perform actions on the collection object
  console.log('database connected');
  //client.close();

  app.get('/student',(req,res) => {
      res.send("its working!");
  })
});
app.listen(process.env.PORT || port )