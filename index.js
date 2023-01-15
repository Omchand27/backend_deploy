const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routers/users.route");
const { noteRouter } = require("./routers/notes.router");
const { authRouter } = require("./middleware/Auth.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.use("/user", userRouter)

app.use("/notes", authRouter)

app.use("/notes", noteRouter)

// app.get("/cart", async (req, res) => {
//   const Data = req.body;
//   try {
//     const User = new UserModel(Data);
//     await User.save();
//     res.send("Register Successful");
//   } catch (err) {
//     res.send(err);
//     console.log(err, "Err Something went Wrong");
//   }
// });

// app.get("/data", (req, res) => {
//     const token = req.headers.authorization
//     jwt.verify(token, "omi", (err, decoded)=>{
//       if(err){
//         res.send("Please Login First")
//       }else{
//         res.send("Data...")
//       }
//     })
// })

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server in Running at port ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
