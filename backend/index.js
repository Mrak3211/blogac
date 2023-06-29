const express = require("express");
const app = express();
const port = 4000;
const connectToMongo = require("./db/db");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
// app.use(cors());

connectToMongo();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/blog", require("./Routes/blog"));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

app.get("/", (req, res) => {
  res.send("Hello, welcome to BlogAc!");
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
