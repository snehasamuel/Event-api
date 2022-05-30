const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")

let app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var eventModel=Mongoose.model("events",
new Mongoose.Schema(
    {
        name:String,
        date:String,
        venue:String,
        organiser:String,
        number:String
    }
))

Mongoose.connect("mongodb+srv://snehasam:snehasa4@cluster0.yyrcr.mongodb.net/Eventdb")

app.post("/api/addevent",(req,res)=>{
var getName=req.body.name 
var getDate=req.body.date 
var getVenue=req.body.venue 
var getOrganiser=req.body.organiser
var getNumber=req.body.number 
var data={"name":getName,"date":getDate,"venue":getVenue,"organiser":getOrganiser,"number":getNumber}
let eventdata=new eventModel(data)
eventdata.save((error,data)=>{
    if(error)
    {
        res.send({"status":"error","data":error})
    }
    else
    {
        res.send({"status":"success","data":data})
    }
})
})


app.post("/api/search",(req,res)=>{
var getDate=req.body
eventModel.find(getDate,(error,data)=>{
    if(error)
    {
        res.send({"status":"error","data":error})
    }
    else
    {
        res.send({"status":"success","data":data})
    }
})
})

app.post("/api/delete",(req,res)=>{
var getID=req.body
eventModel.findByIdAndRemove(getID,(error,data)=>{
    if(error)
    {
        res.send({"status":"error","data":error})
    }
    else
    {
        res.send({"status":"success","data":data})
    }
})
})

app.get("/api/viewevent/",(req,res)=>{
eventModel.find((error,data)=>{
if(error)
{
    res.send(error)
}
else
{
res.send(data)
}
})
})
app.listen("7000",()=>{
    console.log("server running")
})