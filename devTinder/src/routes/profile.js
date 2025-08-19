const express=require('express')
const router=express.Router();
const {userAuth}=require('../middlewares/userAuth');


router.get('/profile',userAuth,async(req,res)=>{
    try {
        //we get user from req attached in middleware
        const user=req.user
        res.send(user)
        
    } catch (error) {
        res.send("ERROR:"+ error.message)
    }
})

router.patch('/update',async(req,res)=>{
    try {
        //await User.findByIdAndUpdate("68321c6d9f49640a83f33e96",{lastName:"Don"})

        await User.findOneAndUpdate({lastName:"Boss"},{lastName:"Don"})
        res.send("updated successfully")
    } catch (error) {
        res.send("update not successful")
    }
})

module.exports=router;
