const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://burhanali:2short2me@cluster0.e7moc1a.mongodb.net/coin-flip?retryWrites=true&w=majority";
const dbName = "coin-flip";

app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('coinflip').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { coinflip: result })
  })
})

app.put('/create', (req, res) => {
  const collection = db.collection('coinflip')
  let result = Math.random() > 0.5 ? 0 : 1;
  collection.insertMany([{
    result: req.body.result == result ? "You Win" : "You Lose"
  }])
  console.log('saved to database')
  res.send('coinflip created!')
})



app.delete('/delete', (req, res) => {
  db.collection('coinflip').deleteMany({}, 
    (err, result) => {
    if (err) return res.send(500, err)
    res.send('coinflip deleted!')
  })
})
