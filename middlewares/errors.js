const express =require('express');
const { userAuth,adminAuth } = require('./middleware');
const app = express();


app.use('/admin',adminAuth);


/* app.get('/admin/getAlldata', (req, res) => {
    throw new Error("random error")             // if e error it expose our files etc so need to be handle
    res.status(200).send('All data fetched');
    
}); */


/* app.use('/',(err,req,res,next)=>{}) */       //this is format to be followed strictly

/* app.use('/',(err,req,res,next)=>{
    if(err){
        res.send('something went wrong')     //since error is below and we have handle above so we need to write
                                            // error handling code in the last
    }
})   */

app.get('/admin/getAlldata', (err,req, res) => {
    throw new Error("random error")             // if e error it expose our files etc so need to be handle
    res.status(200).send('All data fetched');
    
});

app.get('/admin/delete', (req, res, ) => {
    res.status(200).send('user deleted');
});


app.use('/',(err,req,res,next)=>{
    if(err){
        res.send('something went wrong')     //now if in any route error occur , it will send something went wrong so we handled
                                                // it gracefully
    }
})  

app.listen(3000, () => {
    console.log('Server on port 3000');
});