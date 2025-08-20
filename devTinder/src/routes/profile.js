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

app.delete('/deleteUser',async(req,res)=>{
    try {
      //  await User.deleteOne({emailId:"khan@gmail.com"}) //Deletes the first document that matches conditions from the collection
        
        await User.findByIdAndDelete("6832112d3b3ab1cf41d4f306")
      res.send("user deleted successfully")
    } catch (error) {
        res.send("user not deleted succesfully")
    }
})

module.exports=router;
