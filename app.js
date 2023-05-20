const express=require("express");
const path=require("path");
const fs=require("fs");
const app=new express();
const bodyparser=require('body-parser');
const port=27017;
// for mongodb
const mongoose = require('mongoose');


// async function main() {
//     try {
//       await mongoose.connect("mongodb://127.0.0.1:27017/contactDance");
//       console.log("connected");
//     } catch (error) {
//       console.error("Failed to connect to the database:", error);
//     }
//   }

const mongodb="mongodb://127.0.0.1:27017/contactDance";
mongoose.connect(mongodb,(err)=>{
    if(err){
        console.log("mongodb is not connected")
    }else{
        console.log("mongodb is  connected!!!!!!!!!")

    }
})
  


// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var contact=mongoose.model('contact',contactSchema)




//for serving static 

app.use('/static',express.static('static'));
app.use(express.urlencoded());

//pug specific stuff
app.set('view engine','pug'); //set template engine as pug
app.set('views',path.join(__dirname,'views'))//setting the views directory

//endpoints
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});
app.post('/contact',(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("item was not saved")
    })
});

//start the server
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
})
