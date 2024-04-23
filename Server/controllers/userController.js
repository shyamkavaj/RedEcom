// const { hashSync, compare, compareSync } = require('bcrypt');
var db = require('../config/config');
var bcrypt = require("bcrypt");
var { hashSync, compare, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

var User = db.user;

//Create User
var createUser = async (req, res) => {
    try {
        // console.log("req.body is ", req.body.data)
        const userExist = await User.findOne({
            where: {
                email: req.body.data.email
            }
            
            // res.status(200).send("user already exist");
        });
        if (!userExist) {
            // console.log("in backend sign ", req.body.data);
            const data = {
                ...req.body.data,
                password: hashSync(req.body.data.password, 10)
            }
            let newUser = await User.create(data);
            const newRes = {
                message:'user created successfully',
                status:1
            }
            return res.status(200).send(newRes);
        } else {
            // console.log("user already exist");
            const newRes = {
                message:'user already exist',
                status:0
            }
            return res.status(200).send(newRes);
        }
    } catch (err) {
        const newRes = {
            message:'Error in sign up',
            status:1
        }
        return res.status(500).send(newRes);
    }
}

//Login
var loginUser = async (req, res) => {
    try {
        // console.log("in backend login ", req.body.data);
        const user = await User.findOne({ where: { email: req.body.data.email } });
        // const user = await User.
        // console.log("in backend login data ", user.password)
        if (user) {
            await User.update({ status: 1 }, { where: { email: req.body.data.email } })
            let comparePassword = await bcrypt.compare(req.body.data.password, user.password);
            // console.log(comparePassword);
            if (comparePassword) {
                const payload = {
                    firstName: user.firstName,
                    id: user.id,
                    email: user.email
                }
                // console.log("payload is ", payload)
                const token = jwt.sign(payload, "Random String", { expiresIn: "1m" })
                // to set the generated token to header
                const val = 'Bearer ' + token;
                // console.log("val is ", val)
                return res.status(200).json({
                    // sucess: true,
                    message: "Authenticated!,User Login Successfuly",
                    token: "Bearer " + token,
                    status: true,
                    // user: user.firstName
                })
            } else {
                // console.log("Password Incorrect");
                return res.status(200).json({
                    message: 'Password Incorrect',
                    status: false
                })
            }
        } else {
            res.status(200).json({
                message: "User does not exist",
                status: false
            });
        }
    } catch (erroror) {
        console.log("er ",erroror)
        res.status(500).json({
            message: erroror,
            status: false
        });
    }
}

// const axios = require('axios');

var dashboard = async (req, res) => {
    try {
        // Retrieve token from localStorage
        // Pass config as an option to User.findAll
        const d = await User.findAll();

        // console.log("data is ", d);
        return res.status(200).json({
            user: d
        });
    } catch (error) {
        console.erroror("erroror:", error);
        return res.status(500).json({
            message: "Internal Server erroror dashboard"
        });
    }
};

var editUser = async (req, res) => {
    try {
        // console.log("in backend editUser")
        const oldObj = await User.update({ email: "lion@123gmail.com" }, { where: { id: 3 } })
        // console.log(oldObj);
        return res.status(200).json(oldObj);
    } catch (error) {
        console.log("erroror:", error);
        return res.status(500).json({
            message: "Internal Server erroror editUser"
        })
    }
}
module.exports = {
    createUser,
    loginUser, dashboard, editUser
}