const express = require("express")
const { userModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()


//..........Registation.............
userRouter.post("/api/register", async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.send({ "msg": "something went wrong", "error": err.message })
            } else {
                const user = new userModel({ name, email, password: hash, address })
                await user.save()
                res.status(201).send({ "msg": "New user has been registered" })
            }
        });
    } catch (error) {
        res.send({ "msg": "something went wrong", "error": error.message })
    }
})

//...........Login................
userRouter.post("/api/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ userID: user[0]._id }, 'masai', { expiresIn: '5h' });
                 
                    //.....store token in cookies.......
                    res.cookie('token', token);
                    //........................................................

                    res.status(201).send({
                        "msg": "Login successful", "token": token
                    })
                } else {
                    res.send("wrong credentials")
                }
            });
        } else {
            res.send("wrong credentials")
        }
    } catch (error) {
        res.send({ "msg": "something went wrong", "error": error.message })
    }
})

//............password reset.....................

// userRouter.put("/api/:id/reset",async(req,res)=>{
//     try {
//         const {currPassword,newPassword}=req.body;
//         const user= await userModel.findById(req.params.id);

//         if(!user){
//             return res.status(404).json({"msg":"user not found"})
//         }

//         const valid= await bcrypt.compare(currPassword,user.password);
//         if(!valid){
//             return res.status(404).json({"msg":"curr password not found"})
//         }

//         const hashNewPass=await bcrypt.hash(newPassword,10);
//         user.password=hashNewPass;
//         await user.save();

//         res.status(204).json({"msg":"password changed succesfully"})
//     } catch (error) {
//         res.status(404).json({"msg":"Failed to reset password"})
//     }
// })

module.exports = { userRouter }