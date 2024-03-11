const express = require('express')
const server = express()
const path = require('path')
const {init} = require("./models/db")

server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use(express.static("public/"))

server.get("/",(req,res)=>{
    res.sendFile(path.resolve('views/index.html'))
})

server.get("/home",(req,res)=>{
    res.sendFile(path.resolve('views/index2.html'))
})

const todoRoutes = require('./routes/todoRoutes')
server.use("/",todoRoutes)

init()
.then(()=>{
    server.listen(8000,()=>{
        console.log("server started at 8000");
    })
})
.catch(err=>console.log(err))