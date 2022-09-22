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
const commentRoute = require("./routes/comment");
const notificationRoute = require("./routes/notification");
const messageRoute = require("./routes/message");

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
app.use("/comment", commentRoute);
app.use("/noti", notificationRoute);
app.use("/message", messageRoute);

//socket.io
const connectedUser = new Set();
io.on('connection', socket => {
  console.log("new client connected"+ socket.id);
  connectedUser.add(socket.id);
  io.emit("connected-user",connectedUser.size)
                                                                                                          

  socket.on("disconnect", client => {
    console.log("client disconnected");
    connectedUser.delete(socket.id);
    io.emit("connected-user",connectedUser.size) 
  }
  );

  socket.on("message",data =>{
    console.log(data);
    socket.broadcast.emit('message-receive',data);
  })
});



server.listen(process.env.PORT || port, () => {
  console.log("Server is running... at port " + port);
});
