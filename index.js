const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 8000;

app.use(cors());

app.get("/streamer/:name", (req ,res) => {
    axios(`https://api.twitch.tv/helix/streams?user_login=${req.params.name}`, {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "client-id": process.env.CLIENT_ID
        }
    }).then(req => res.json(req.data))
    .catch(err => res.json(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})