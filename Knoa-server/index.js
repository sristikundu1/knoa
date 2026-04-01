require("dotenv").config();
const express = require('express'); 
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Learning is on!')
})

app.listen(port, () => {
  console.log(`You can learn in port ${port}`)
})

