const jwt = require("jsonwebtoken")
const { userModel } = require("../model/user.model")

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // const token = req.headers.authorization

        if (token) {
            jwt.verify(token, "masai", async (err, decode) => {
                if (decode) {
                    //console.log(decode)
                    const { userID } = decode;

                    const user = await userModel.findById(userID);
                    console.log(user)
                    if (!user) {
                        return res.status(401).json({ message: 'pls login' });
                    }
                    // Attach the user to the request object
                    req.user = user
                    next()
                } else {
                    res.send({ "msg": "pls login" })
                }
            })
        } else {
            res.send({ "msg": "pls login" })
        }
    } catch (error) {
        res.status(401).json({ message: 'pls login 2' });
        console.log(error)
    }
}
module.exports = { authenticate }