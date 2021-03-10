// ./server.js
/*
 * Initialise Express
 */
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

/*
 * Initialise Pusher
 */
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1164939",
  key: "8b67053b28c932dc50ad",
  secret: "ae8a1ee4a9fcc3de0520",
  cluster: "ap1",
});

/*
 * Define post route for creating new reviews
 */

app.get("/", (req, res) => {
  res.status(200).send("working");
});

app.post("/alert", (req, res) => {
  pusher.trigger("alerts", "info", { info: req.body });
  res.status(200).send();
});

/*
 * Run app
 */
const port = 80;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
