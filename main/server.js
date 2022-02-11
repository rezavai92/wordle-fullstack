const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const schedule = require("node-schedule");
const port = process.env.PORT || 5000;
const fs = require("fs");
const path = require("path");
const { encrypt } = require("./services");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const read = fs.readFileSync(path.join(__dirname, "assets", "wordFile.txt"), {
  encoding: "utf8",
  flag: "r",
});
const wordList = read.split("\r\n");
console.log("wordList", wordList[0]);

app.get("/", (req, res) => {
  res.send("Hello Wordle!");
});

const job = schedule.scheduleJob("0 36 11 * * *", function () {
  const later = wordList.shift();
  wordList.push(later);
  console.log("scheduled");
});

app.get("/gtw", (req, res) => {
  try {
    let word = encrypt(wordList[0].toLowerCase());
    res.status(200).json({ word: word });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
