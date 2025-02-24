import app from "./app"
//  changes 


const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('Hello World! change in file')
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})