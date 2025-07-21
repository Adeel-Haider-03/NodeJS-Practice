const express =require('express');
const { adminAuth,userAuth} = require('./middleware');
const app = express();


app.use('/admin',adminAuth);  // we want to create middleware for all admin routes



app.get('/admin/getAlldata', (req, res, ) => {
    res.status(200).send('data fetched');
});

app.get('/admin/delete', (req, res, ) => {
    res.status(200).send('user deleted');
});


app.get('/user',userAuth,(req,res)=>{
    res.send('user data fetched')
})

app.get('/user/login',(req,res)=>{          //we don't want to use auth for login
    res.send('user logged in')
})

app.listen(3000, () => {
    console.log('Server on port 3000');
});