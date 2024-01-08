const express = require("express");
const cors = require("cors");
const conn = require("./db/config");
 
 
const User = require("./db/User.js");
const Product = require('./db/Product');

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = await User(req.body);
  let data = await user.save();
  data = data.toObject();
  delete data.password;
   
  res.send(data);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({result: 'No user found!! inside'})
    }
  } else {
    res.send({ result: "No user found!! outside" });
  }
});

app.post('/add-product', async(req, res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products', async(_, res)=>{
  let product = await Product.find();
  if(product.length>0){
     
    res.send({product})
  }else{
    res.send({result: 'No products found!!!'})
  }
})

app.delete('/product/:id', async(req, res)=>{
  const result = await Product.deleteOne({_id: req.params.id});
  res.send(result);
})
app.delete('/user/:id', async(req, res)=>{
  const result = await User.deleteOne({_id: req.params.id});
  res.send(result);
})

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

// app.get("/", (req, res) => {
//   res.send("done");
// });
app.listen(5000, console.log(`app is running on 5000`));
