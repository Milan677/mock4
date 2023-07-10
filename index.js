const express = require("express")
const app = express()
const { connection } = require("./db")
const {userRouter}=require("./routes/user.router")
const {resRouter}=require("./routes/res.router")
const{orderRouter}=require("./routes/order.router")
const { authenticate } = require("./middleware/authenticate")
const cookieParser = require('cookie-parser');

require("dotenv").config();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Wellcome to homepage")
})

app.use(cookieParser());
app.use("/user", userRouter)
app.use(authenticate)
app.use("/res",resRouter)
app.use("/od",orderRouter)


app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("connected with the database...")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`app is runing at port ${process.env.PORT}....`)
})