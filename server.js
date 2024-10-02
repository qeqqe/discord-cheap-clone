const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

const items = require("./data3.json");

app.get("/", (req, res) => {
  res.json(items);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
