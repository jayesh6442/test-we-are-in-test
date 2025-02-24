import express from "express"

const app = express()



app.get("/", (req,res)=>{
    res.send(
        "we are in the code block"
    )
})


app.listen(3000,()=>{
    console.log("app in running");
})