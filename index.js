const express = require("express");
const { connection } = require("./configs/db");
const { UserModel } = require("./Modules/userModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {todoRouter}=require("./Routers/TodoRouter")
const {Autherisation} =require("./Middleware/Auth")
const cors = require('cors')

const app = express();


app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("day2 home page");
});

app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const exist_user = await UserModel.findOne({ email });

    if (exist_user) {
      res.status(200).send("User already exist");
    } else {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) {
          res.send("something went wrong");
        } else {
          const user = new UserModel({ name, email, password: hash });
          await user.save();
          res.status(200).send({ 
            msg:"Account created"
           });
        }
      });
    }
  } catch (err) {
    res.status(200).send(err);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = jwt.sign({ task: "fullstack" }, "stack");
    const user = await UserModel.findOne({ email });
    const hash = user.password;
    // console.log(user);
    if(user){
        console.log(user)
        bcrypt.compare(password, hash,(err, result) => {
            if(result){
                res.send({
                    msg:"login successfully",
                    token
                })
            }
            else{
                res.status({
                    msg:"wrong credential"
                })
            }
        })
    }

    else{
        res.send("User doesn't exist")
    }
    
  } catch (err) {
    res.send(err);
  }
});


app.use(Autherisation)
app.use("/todo",todoRouter)

app.listen(8400, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch {
    console.log("error");
  }
  console.log(`server is running at port 8400`);
});
