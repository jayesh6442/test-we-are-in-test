import express from "express"
const app = express()
app.get("/:name", (req, res) => {
    const name = req.params
    console.log("we changes if it run or ont");
    console.log("testing the changes");
    console.log(name);
    res.send(
        "hello and welcome to the server" + name
    )
})


app.listen(3000, () => {
    console.log("app in running");
})