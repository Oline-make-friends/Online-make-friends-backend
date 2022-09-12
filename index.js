const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");
const server = http.createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

const port = 8000;
dotenv.config();

const strConnection =
  "mongodb+srv://duyphong1504:Duyphong1504@cluster0.svap3.mongodb.net/?retryWrites=true&w=majority";

//connect database
mongoose.connect(strConnection, () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.get("/api", (req, res) => {
  res.status(200).json("Hello");
});

//routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

//socket.io
io.on('connection', client => {
  console.log("new client connected");
  client.on("fromClient", data => {
    console.log(data);
    client.emit("fromServer", `${Number(data)+1}`);
  })

  client.on("disconnect", client => console.log("client disconnected"));
});



server.listen(process.env.PORT || port, () => {
  console.log("Server is running... at port " + port);
});
