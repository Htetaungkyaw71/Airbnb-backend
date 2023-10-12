import express from "express";
import router from "./router";
import * as dotenv from "dotenv";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/users";
import cors from "cors"
import { getAllHome, getAllHomeWithCategory, getHomeDetail } from "./handlers/home";
import bodyParser from "body-parser"



dotenv.config();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))


app.post("/user", createNewUser);
app.post("/signin", signin);


app.get("/api/home/:page/:pageSize", getAllHome);
app.get("/api/home/:category",getAllHomeWithCategory)
app.get("/api/home/property/detail/:id", getHomeDetail);

app.use((err,req,res,next)=>{
  if(err.type === 'auth'){
      res.status(401).json({message:"unauthorized"})
  }else{
      res.status(500).json({message:"Ooops there was an error"})
  }
})


app.use("/api",protect,router)

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});