const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/todo", {useNewUrlParser: true});

const youSchema = new mongoose.Schema({
   name: String
});

const item = new mongoose.model("task", youSchema);

const todo = new item({
    name: "Create some videos"
});
const todo1 = new item({
    name: "Cruel Summer"
});
const todo2 = new item({
    name: "Cruel Summer"
});
const todo3 = new item({
    name: "Blank Space"
});
// todo.save();
// todo1.save();
// todo2.save();
// todo3.save();
// 
app.get("/", (req, res)=>{
    item.find({})
    .then((doc)=>{
        res.render("list", {io : doc});
    })
    .catch((err)=>{
        console.log(err);
    })
 
});

app.post("/", function(req,res){
    const itemName = req.body.ele1;
    const todo4 = new item({
        name: itemName
    });
    todo4.save();
    res.redirect("/");
})

app.post("/delete", function(req, res){
    const checked = req.body.checkbox1;
    item.findByIdAndDelete(checked)
    .then(()=>console.log("Deleted"))
    .catch((err)=>console.log(err));
    res.redirect("/");
})
app.listen("5000", function(){
    console.log("Server is running")
});