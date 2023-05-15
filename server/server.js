const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express server
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'geoCaching';

MongoClient.connect(mongoURL, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db(dbName);
    const users = db.collection('users');
    const position = db.collection('position');
    
    
    // Set up routes
    app.get('/map', async (req, res) => {
      try {
        // Fetch data from MongoDB
        const data = await position.find().toArray();
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    });

    app.post('/map', async (req, res) => {
        console.log(req.body);
        try {
          // Fetch data from MongoDB
          const data = await position.insertOne(req.body);
          res.json(data);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch data' });
        }
      });

    app.post("/signup", async(req, res)=>{
      try{
        let user=users.find({username: req.body.username, email: req.body.email}).toArray()
        .then(async resp=>{
          if (resp===[]){
            console.log(resp)
            res.status(500).json({ error: 'username or email alreasy used' });
          }
          else{
          console.log(resp)
          const data = await users.insertOne(req.body);
          res.status(200).json({ text: 'Signup success' });
          }
        })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
    })

    app.post("/signin",(req, res)=>{
      console.log(req.body)
      try{
        let user=users.find({username: req.body.username}).toArray()
        .then( resp=>{
          if (resp===[]){
            console.log(resp)
            res.status(500).json({ error: 'User doesn\'t exist' });
          }
          else{
          if (req.password===user.password){
            res.status(200).json({ text: 'User connected' });
          }
          else{
            res.status(500).json({ error: 'I don\'t know you ' });
          }
          
          }
        })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }

    })
    // Start the server
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });
