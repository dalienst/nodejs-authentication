const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({  });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const user = await User.findById(data.id);
            if (user) return res.json({status: true, user});
            else return res.status(401).json({ message: "Unauthorized" });
        }
    })
}