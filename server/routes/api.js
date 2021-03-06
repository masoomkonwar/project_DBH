const express = require('express')
const User = require('../models/user')
const Job = require('../models/Jobs')
const Developers = require('../models/developers')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const db = "mongodb+srv://masoom1:thelastone@cluster0.aedf2.mongodb.net/EventsDB?retryWrites=true&w=majority"



router.get('/',(req,res)=>{
 res.send("From api route")
})

mongoose.connect(db,err=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connection successful")
    }
})

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error)
        {
            console.log(error)
        }else{
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    })

})
router.post('/registerDev',(req,res)=>{
    let userData = req.body
    let dev = new Developers(userData)
    dev.save((error,registeredUser)=>{
        if(error)
        {
            console.log(error)
        }else{
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    })

})
router.post('/updatejobs',(req,res)=>{
    let jobData = req.body
    let job = new Job(jobData)
    console.log(job)
    job.save((error,registeredJob)=>{
        if(error)
        {
            console.log(error)
        }else{
        
            res.status(200).send(registeredJob)
        }
    })

})
router.post('/login',(req,res)=>{
    let userData =req.body
    let sendableData = {email:String,token:String}
    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err)
        }else{
            if(!user){
                res.status(401).send("invalid email")
            }else
            if(user.password != userData.password)
            {
                res.status(401).send('Invalid password')
            }else{
                let payload = {subject: user._id}
                let token = jwt.sign(payload,'secretKey')
                //console.log(token)
                //
                //res.status(200).json(user)
                sendableData.email=user.email
                sendableData.token=token
                console.log(sendableData)
                res.status(200).send({sendableData})
                //res.status(200).json(user)

            }
        }
    })
})
router.post('/loginDev',(req,res)=>{
    let userData =req.body
    let sendableData = {email:String,token:String}
    Developers.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err)
        }else{
            if(!user){
                res.status(401).send("invalid email")
            }else
            if(user.password != userData.password)
            {
                res.status(401).send('Invalid password')
            }else{
                let payload = {subject: user._id}
                let token = jwt.sign(payload,'secretKey')
                //console.log(token)
                //
                //res.status(200).json(user)
                sendableData.email=user.email
                sendableData.token=token
                console.log(sendableData)
                res.status(200).send({sendableData})
                //res.status(200).json(user)

            }
        }
    })
})

router.get('/events',(req,res)=>{
    let events = [
        {
            "id": "1",
            "name" : "tony" ,
            "identity" : "iron man",
        },
        {
            "id": "1",
            "name" : "bruce" ,
            "identity" : "hulk",
        },
        {
            "id": "1",
            "name" : "steeve" ,
            "identity" : "captain america",
        },
        {
            "id": "1",
            "name" : "peter" ,
            "identity" : "spiderman",
        },
        {
            "id": "1",
            "name" : "natasha" ,
            "identity" : "black widow",
        }
    ]
    res.json(events)
})
router.get('/special',verifyTocken,(req,res)=>{
    let events = []
    Job.find({},(err,jobs)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            events = jobs
           // console.log(jobs)
            res.json(events)
        }
    })
    
})
function verifyTocken(req,res,next)
{
    //console.log(req.headers.authorization)
    if(!req.headers.authorization)
    {
        return res.status(401).send("unauthorizedrequest 1");

    }
    let token = req.headers.authorization.split(' ')[1]
    if(token == null){
        return res.status(401).send("unauthorizedrequest 2");
    }
    let payload = jwt.verify(token,'secretKey')
        if(!payload)
        {
            return res.status(401).send("unauthorizedrequest 3");
        }
        req.userId = payload.subject
        next()
}

module.exports = router
