const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.port || 7700;
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wy6ti.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('student project!')
  })

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const studentCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`);
  // perform actions on the collection object
  console.log('database connected');
  //client.close();

  app.get('/student',(req,res) => {
      res.send("its working!");
  })

  app.post('/addStudent', (req,res) => {
    const newStudent = req.body;
    console.log('adding new event: ', newStudent);
    studentCollection.insertOne(newStudent)
    .then(result => {
      console.log('inserted count', result.insertedCount)
      res.send(result.insertedCount > 0)
      res.redirect('/')
    })
  })

  app.get('/students', (req,res) => {
    studentCollection.find()
    .toArray((err, student) => {
      res.send(student)
    })
  })

  app.delete('/deleteStudent/:id', (req,res) => {
    const id = ObjectId(req.params.id);
    studentCollection.findOneAndDelete({_id: id})
  })

});
app.listen(process.env.PORT || port )