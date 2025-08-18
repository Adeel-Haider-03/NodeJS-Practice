const express=require('express')
const router=express.Router();
const {userAuth}=require('../middlewares/userAuth');



router.post('/sendConnection',userAuth,async(req,res)=>{
    //we get user because we have attach uer to request in middleware
        res.send(req.user.firstName + " sent a connection request")
})


module.exports=router;