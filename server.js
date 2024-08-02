const mongoose = require("mongoose");
const express =require("express")
const cors= require("cors")
const morgan= require("morgan")
const fs =require("node:fs")
const path =require("node:path")
let app = express()
app.use(cors())
app.use(morgan("combined"))

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'requestHeaderDetails.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

let expressMiddleWareFn1=(req,res,next)=>{
  console.log(`inside the express middleware function-1`)
  next()
}
let expressMiddleWareFn2=(req,res,next)=>{
  console.log(`inside the express middleware function-2`)
  next()
}
let expressMiddleWareFn3=(req,res,next)=>{
  console.log(`inside the express middleware function-3`)
  next()
}
// use express middle ware fn for each API end point in server
app.use(expressMiddleWareFn1)
let empolyeeSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String, 
    email: String,
    gender: String,
    department: String,
    image: String,
    cars: String,
    country: String,
  });
  let Employee= new mongoose.model("employee",empolyeeSchema,"detailsofemployees")
  
app.listen(2387,()=>{
    console.log(`2387 is listening.....`)
})
app.get("/employedetails",  expressMiddleWareFn2,expressMiddleWareFn3, async (req,res)=>{
    let employeData= await Employee.find().and([{department:req.query.department},{ country:req.query.country},{gender:req.query.gender},])//{ country:req.query.country},{gender:req.query.gender},
    console.log(req.query) // to print url in object in terminal
    res.json(employeData)
})
app.get("/countriesList",async(req,res)=>{
  let countriesList= await Employee.find().distinct("country")
  res.json(countriesList)
})
app.get("/departmentsList",async(req,res)=>{
  let departmentsList= await Employee.find().distinct("department")
  res.json(departmentsList)
})
app.get("/gendersList",async(req,res)=>{
  let gendersList= await Employee.find().distinct("gender")
  res.json(gendersList)
})
let connectToDataBase = () => {
  try {
    mongoose.connect(
      "mongodb+srv://pavanajjarapu:pavan@findmethod.sziutcn.mongodb.net/DummyData?retryWrites=true&w=majority&appName=findmethod"
    );
    console.log(`connected successfully to DB`);
  } catch (error) {
    console.log(`not connected to DB`);
    console.log(error);
  }
};
connectToDataBase();
