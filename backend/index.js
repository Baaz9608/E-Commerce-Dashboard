const express = require("express");
const cors = require("cors");
require("./db/config.js");
const User = require("./db/User.js");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = await User(req.body);
  let data = await user.save();
  data = data.toObject();
  delete data.password;
  console.log(data);
  res.send(data);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    const user = await User.find(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      console.log({ result: "No user found!! inside" });
    }
  } else {
    res.send({ result: "No user found!! outside" });
  }
});

// const connectDB = async()=>{
//     mongoose.connect('mongodb://localhost:27017/e-comm');
//     const productSchema = new mongoose.Schema({
//         name: String,
//         email: String
//     })
//     const product = mongoose.model('product',productSchema);
//     const data = await product.find();
//     console.log(data);

// }
// connectDB();

app.get("/", (req, res) => {
  res.send("done");
});
app.listen(5000, console.log(`app is running on 5000`));
