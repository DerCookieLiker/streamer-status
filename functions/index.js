const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const bodyParser = require('body-parser');
const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const binaryMimeTypes = require("./utils/binaryMimeTypes");

require("dotenv").config();

const app = express();
const router = express.Router();




router.get("/streamer/:name", (req ,res) => {
    axios(`https://api.twitch.tv/helix/streams?user_login=${req.params.name}`, {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "client-id": process.env.CLIENT_ID
        }
    }).then(req => {
        res.json(req.data)})
    .catch(err => res.json(err));
});

router.use(bodyParser);
router.use(bodyParser.json());
router.use(cors());
router.use(awsServerlessExpressMiddleware.eventContext());

app.use(cors());
app.use("/.netlify/functions/index", router);

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

module.exports.handler = (event, context) => {
    return awsServerlessExpress.proxy(server, event, context);
}