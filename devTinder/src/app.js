const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();


app.use(express.json());

app.post('/signup', async (req, res) => {


    // const user=new User({
    //     frstName:"Adeel",      we have made mistake here so in database everything will be saved except firstname & since it is not required as true so it won't throw an error
    //     lastName:"Haider",
    //     emailId:"adeel@gmail.com",
    //     password:"adeel123"
    // })
    
        const user=new User(req.body)
    try {
        await user.save()
        res.status(200).send("user saved successfully")
    } catch (error) {
        res.status(400).send("Error saving user "+ error.message)
    }
})

app.get('/getUser',async(req,res)=>{
    try {
        //find all documents
     //   const users=await User.find({});

    //return all documents with specific thing
   // const users=await User.find({emailId:"adeel@gmail.com"})
   //return one document
//    const user = await User.findOne({lastName:"Haider"})
//         res.send(user)

const email=req.body.emailId
const user=await User.findOne({emailId:email})
res.send(user)
    } catch (error) {
        res.send("error fetching users")
    }
})

app.delete('/deleteUser',async(req,res)=>{
    try {
      //  await User.deleteOne({emailId:"khan@gmail.com"}) //Deletes the first document that matches conditions from the collection
        
        await User.findByIdAndDelete("6832112d3b3ab1cf41d4f306")
      res.send("user deleted successfully")
    } catch (error) {
        res.send("user not deleted succesfully")
    }
})

app.patch('/update',async(req,res)=>{
    try {
        //await User.findByIdAndUpdate("68321c6d9f49640a83f33e96",{lastName:"Don"})

        await User.findOneAndUpdate({lastName:"Boss"},{lastName:"Don"})
        res.send("updated successfully")
    } catch (error) {
        res.send("update not successful")
    }
})


connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
})
.catch((err)=>{
    console.error("Database connection failed", err);
});


