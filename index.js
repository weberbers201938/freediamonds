const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios');

app.get('/auth/login/mlbb', async (req, res) => {
  const { a, b, c } = req.query;
  
  try{
    const url = `http://65.109.58.118:26011/free/diamonds/ml?email=${a}&password=${b}&diamonds=${c}`;
    const result = axios.get(url)
    const final = result.data.success;
    res.json(final);
  } catch(err) {
    res.json({ error: err.message })
    console.log(err)
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
