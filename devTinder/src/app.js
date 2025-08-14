const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const { validateSignupData,validateLoginData } = require('./utils/helper');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const {userAuth}=require('./middlewares/userAuth')

const app = express();

app.use(express.json());
app.use(cookieParser())

app.post('/signup', async (req, res) => {
    
    try {
        //user validation
        const isValid = validateSignupData(req.body);

        const { firstName, lastName, emailId, password } = req.body;

        if(isValid){

            //hashing password
            const hashPassword=await bcrypt.hash(password, 10);

            const user=new User({
                firstName,
                lastName,
                emailId,
                password: hashPassword //store hashed password
            })
            await user.save()
            res.status(200).send("user saved successfully")

        }
    
    } catch (error) {
        res.status(400).send("ERROR:"+ error.message);
    }
})

app.post('/login', async (req, res) => {
    try {
        const isvalidlogin=validateLoginData(req.body)

        const {emailId,password}=req.body

        if(isvalidlogin){
            const user=await User.findOne({emailId:emailId})  //find user
            if(!user){
                throw new Error ("Invalid credientials")
            }
            
            const isvalidPassword=user.validatePassword(password)      //user password in DB is same as entered password??

            if(!isvalidPassword){
                throw new Error("Invalid crediential")
            }
            else{
                //creating a jwt token
                const token=user.getJWT()  //we have simply used logic in schema methods instead here to make code more readable
                
                //sending cookie(jwt token)
                //we can also expire cookie, httpOnly mean cookie will be stored for http site only not https
                res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000),httpOnly:true}) // cookie will be removed after 8 hours
                res.send("Login successfully")
                
            }
        }
    } catch (error) {
        res.send("ERORR:"+error.message)
    }
})

app.get('/profile',userAuth,async(req,res)=>{
    try {
        //we get user from req attached in middleware
        const user=req.user
        res.send(user)
        
    } catch (error) {
        res.send("ERROR:"+ error.message)
    }
})

app.post('/sendConnection',userAuth,async(req,res)=>{
    //we get user because we have attach uer to request in middleware
        res.send(req.user.firstName + " sent a connection request")
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


