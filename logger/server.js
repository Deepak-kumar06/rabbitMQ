const express = require("express");
const amqp = require("amqplib");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 4001;

const app = express();
const Producer = require("./producer");
const producer = new Producer();


app.use(bodyParser.json("application/json"));

app.get('/hello', (req, res) => {
    res.send("Hello Deepak")
})

app.post("/sendLog", async (req, res, next) => {
    await producer.publishMessage(req.body.logType, req.body.message);
    res.send();
});

app.listen(PORT, () => console.log("Server running at port " + PORT));