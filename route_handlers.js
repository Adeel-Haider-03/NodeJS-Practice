const express=require("express")
const app=express()

//we can have multiple route handlers as well for same route

//app.use('/user',(req,res)=>{},(req,res)=>{},(req,res)=>{})

/*     app.use('/user',(req,res)=>{    //this will only send response 1 bcoz we need to handle route explicitily and that is using next()
        res.send('response 1')
    },(req,res)=>{
        res.send('response 2')
    },(req,res)=>{
        res.send('response 3')
    }) */

//////////////////////////////////////////////////////////////////////////////////////////////////////

    app.use('/user',(req,res,next)=>{    
            res.send('response 1')
            next()                         //it will not move to next handler bcoz only one response can be send for a route
                                            //remember TCP concept, once response send connection close
        },(req,res)=>{
            res.send('response 2')
        },(req,res)=>{
            res.send('response 3')
        })

////////////////////////////////////////////////////////////////////////////////////////////////////

        app.use('/user',(req,res,next)=>{  //now it will send response 2
            next()
            
        },(req,res)=>{
            res.send('response 2')
        },(req,res)=>{
            res.send('response 3')
        })

///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/user',(req,res,next)=>{  //it will send rsponse 2 and then throw error when executing response 1 bcoz only
                                   // response can be send 
    next()
    res.send('response 1')
},(req,res)=>{
    res.send('response 2')
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/user',(req,res,next)=>{  
    next()

},(req,res,next)=>{

    next()                  //it will throw error of cannot GET/user because it is expecting next route and couldn't find
                      //so will throw error of not finding route though it will go on route and execute code like console log inside
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/user',(req,res,next)=>{  
    next()

},(req,res,next)=>{

                       //if we don't send any respose so we know it will keep sending reqeust and eventually time out
})