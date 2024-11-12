import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
.then(()=>{
  app.on("error",(error)=>{
    console.log("ERR :",error);
    throw error
  })
  const port = process.env.PORT|| 8080;
  app.listen(port, ()=>{
    console.log("Listing on port : ", port);
  })
})
.catch((error)=>{
  console.error("An eerror occured after db connected: ",error);
})
