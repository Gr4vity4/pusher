// ./server.js
/*
 * Initialise Express
 */
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9999;
const bodyParser = require("body-parser");
const cors = require("cors");
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

app.use(cors({ credentials: true, origin: true }));
/*
 * Run app
 */
app
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .get("/", (req, res) => res.send(`Node.js running on port : ${PORT}`))
  .post("/alert", function (req, res) {
    console.log(">>> /alert");
    pusher.trigger("alerts", "restaurant", { message: req.body });
    res.status(200).send();
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
