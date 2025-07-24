const mongoose= require('mongoose');
const validator=require("validator")

const userSchema = new mongoose.Schema({
    firstName: {                            //we can write like this also
        type: String,                   //   firstName: String, // String is shorthand for {type: String}
        required:true,
        minLength:3,
        maxLength:20
        
    },
    lastName: {
        type: String,
        required:true,
        minLength:3,
        maxLength:20
    },
    emailId: {
        type: String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("please enter a valid email")
            }
        }
            
    },
    password: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a strong password")
            }
        }

    },
    age: {
        type: Number,
        min:18,
        
    },
gender:{
    type: String,
    validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Please enter a valid gender")
            }
        }
},
skills:{
    type:Array,
}

},{timestamps:true})

const User=mongoose.model('User',userSchema)

module.exports=User;