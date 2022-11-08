const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");
const server = http.createServer(app);

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const mailRoute = require("./routes/sendmail");
const notificationRoute = require("./routes/notification");
const messageRoute = require("./routes/message");
const reportRoute = require("./routes/report");
const groupRoute = require("./routes/group");
const chatRoute = require("./routes/chat");
const eventRoute = require("./routes/event");
const friendRequestRoute = require("./routes/friendRequest");
const courseRoute = require("./routes/course");
const quizRoute = require("./routes/quiz");

//socket.io
try {
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
  app.get("/", (req, res) => {
    res.send("App is running");
  });
  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/post", postRoute);
  app.use("/comment", commentRoute);
  app.use("/sendMail", mailRoute);
  app.use("/noti", notificationRoute);
  app.use("/message", messageRoute);
  app.use("/report", reportRoute);
  app.use("/group", groupRoute);
  app.use("/chat", chatRoute);
  app.use("/friendRequest", friendRequestRoute);
  app.use("/event", eventRoute);
  app.use("/course", courseRoute);
  app.use("/quiz", quizRoute);
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("sendDataClient", function (data) {
      // // Handle khi có sự kiện tên là sendDataClient từ phía client
      // io.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
      console.log(data);
    });

    socket.on("sendFriendRequest", () => {
      socket.broadcast.emit("getFriendRequest", "getFriendRequest");
    });

    socket.on("sendacceptFriendRequest", () => {
      socket.broadcast.emit("acceptFriendRequest", "acceptFriendRequest");
    });

    socket.on("sendNotification", () => {
      socket.broadcast.emit("getNotification");
    });
  });

  server.listen(process.env.PORT || port, () => {
    console.log("Server is running... at port " + port);
  });
  /////////////////////////
} catch (error) {
  console.log(error.message);
}
