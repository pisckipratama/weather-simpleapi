const express = require('express');
const app = express();
const fakeData = require('./data');
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.json({msg: "Hello World!"});
});

app.get('/api/v1/weather', (req, res) => {
  res.json(fakeData);
});

app.get('/api/v1/weather/:city', (req, res) => {
  const { city } = req.params;
  let filtered = fakeData.filter(item => {
    return item.city === city;
  });
  if (filtered.length === 0) {
    return res.json({error: "data not found!"});
  }
  return res.json(filtered[0]);
});

app.listen(3000, () => console.log("running on port 3000"));