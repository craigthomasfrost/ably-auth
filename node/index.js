const express = require("express");
const bodyParser = require("body-parser");
const Ably = require("ably");

require('dotenv').config({path: `${__dirname}/.env`});

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/createTokenRequest", (req, res) => {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY);
  client.auth.createTokenRequest({ clientId: process.env.ABLY_CLIENT_ID }, (error, token) => {
      res.status(200).json(token);
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));