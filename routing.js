
const express=require("express")
const app=express()
const port=3000


app.use  // it will handle all request method GET,POST,DELETE all type

app.use('/',(req,res)=>{    //order of routing matter 
    res.send("Hello")
})

app.use('/xyz',(req,res)=>{    //this route will be override by above one and we will get Hello in response for /xyz
                                //bcoz above we have define / and whatever comes after slash doesn't matter if route
                                //match / it will send response
    res.send("xyz")
})

app.use('/xyz/abc')     //it will not work because as soon as api call hit it will match /xyz and send the above one response as 
                            //we know order matter even if it is app.get or app.post it will be override by app.use as it handle all
                            //requests


app.get  //only handle GET request
app.post //only handle POST request


app.use('ab?c')   //this route mean b is optional so will work for both abc and ac also

app.use('/ab+c')  // mean a and any number of b and c  so abc,abbbbc,abbbbbbbbbbbc etc work for all

app.use('/ab*cd')  //ab and whatever come after but end on cd so abcd, abAdeekkascd etc all will work

app.use('/a(bc)?d')  // mean bc is optional so will work for abcd,ad but not abd or acd bcoz both bc included

app.use('/user',(req,res)=>{    //localhost://user?userid=102
                                            //user?userid=102&password=abcd

    console.log(req.query);  //we can read query in request by req.query 
    //it will print {userid:'102'}
    //will print {userid:'102', password:'abcd'}
})

//dynamic route
app.use('/user/:userID',(req,res)=>{      //localhost://user/230

    console.log(req.params); //will print {userID:'230;}
    
})

app.use('/user/:userID/:name/:passowrd')      //user/adeel/786

console.log(req.params);          // will print  {userID:'786',name:'adeel', password:'786'}



app.use(express.json());    //use to parse JSON body

app.get('/user', (req, res) => { //http://localhost:3000/user?search=cow

    console.log(req.query);          // { search: 'cow' }
    res.send('Hello query');

    
})

app.post('/adeel', (req, res) => {
    console.log(req.body);                //this will log the post request body
    res.send('Hello body');

    
})




app.use('/abc',(req,res)=>{
                                //if we don't handle anything and send request on this route it will be infinetely sending
                                //request as it is not getting any response and after sometime eventually timeout
    
    console.log("hi");     //no effect as it is printed in console and not sending any response
                            // need to do res.send must
    
})


app.listen(prompt,()=>{
    console.log(`server is listening on ${port}`);
    
})