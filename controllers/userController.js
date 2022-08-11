const httpStatus = require('http-status')
const bcrypt=require('bcryptjs')
const {createTokens}=require('../middlewares/JWT')

let users = []

exports.createUser = (req, res, next) => {
    try {
        const {username,email,password}=req.body

        let userexists = users.some(user => user.email === email)
          //Checking for email uniqueness
        if (userexists) { 
            res.status(httpStatus.CONFLICT).json("User already exists.Try to log in..")
         }
        else {
            //Create User

            bcrypt.hash(password,10).then((hash)=>{
                let user={username,email,password:hash}

                users.push(user)
                res.status(httpStatus.CREATED).json(user);    
            })       
        }      
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

exports.loginUser = async(req, res, next) => {
    try {

        const {email,password}=req.body
        let user = users.find(user => user.email === email)
        //If user with the given email is not found
        !user && res.status(httpStatus.NOT_FOUND).json("User not found..")

        //If user is found compare password with database password

        const dbpassword=user.password
        bcrypt.compare(password,dbpassword).then((match)=>{
            if(!match){
                res.status(httpStatus.BAD_REQUEST).json({error:"Wrong Username and Password combination"})
            }
            //If password is validated create a token
            else{   
                let accessToken=createTokens(user)
                res.cookie("access-token",accessToken,{
                    maxAge:30*24*60*60*1000 //valid for 30 days
                })
                
                res.status(httpStatus.OK).json( `${user.username} has logged in..`);
            }
        })
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

exports.getHome=(req,res,next)=>{
    try{
        res.status(httpStatus.OK).json("User authenticated. Token validated....")
    }
    catch(err){
        next(err)
        res.json(err)
    }
}