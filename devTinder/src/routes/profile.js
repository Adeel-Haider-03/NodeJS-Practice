const express=require('express')
const router=express.Router();
const {userAuth}=require('./middlewares/userAuth');


app.get('/profile',userAuth,async(req,res)=>{
    try {
        //we get user from req attached in middleware
        const user=req.user
        res.send(user)
        
    } catch (error) {
        res.send("ERROR:"+ error.message)
    }
})