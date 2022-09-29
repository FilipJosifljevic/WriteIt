require("dotenv").config();
const express = require("express");
const postsroutes = require("./routes/posts")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/api/posts',postsroutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connected to the database and listening on port : " + process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

