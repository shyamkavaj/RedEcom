// const { hashSync, compare, compareSync } = require('bcrypt');
var db = require('../config/config');
var bcrypt = require("bcrypt");
var { hashSync, compare, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

var User = db.user;

//Create User
var createUser = async (req, res) => {
    try {
        console.log("req.body is ",req.body.data)
        const userExist = await User.findOne({
            where: {
                email: req.body.data.email
            }
            // res.status(200).send("user already exist");
        });
        if (!userExist) {
            console.log("in backend sign ", req.body.data);
            const data = {
                ...req.body.data,
                password: hashSync(req.body.data.password, 10)
            }
            let newUser = await User.create(data);
            res.status(200).json(newUser);
        } else {
            console.log("user already exist");
            res.status(200).json("User all Ready Created");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//Login
var loginUser = async (req, res) => {
    try {
        console.log("in backend login ", req.body.data);
        const user = await User.findOne({ where: { email: req.body.data.email } });
        console.log("in backend login data ", user.password)
        if (user) {
            let comparePassword = await bcrypt.compare(req.body.data.password, user.password);
            console.log(comparePassword);
            if (comparePassword) {
                const payload = {
                    firstName: user.firstName,
                    id: user.id
                }
                console.log("payload is ",payload)
                const token = jwt.sign(payload, "Random String", { expiresIn: "1d" })
                // to set the generated token to header
                const val = 'Bearer ' + token;
                // res.set('Authorization', 'Bearer ' + token);
                console.log("val is ",val)
                // localStorage.setItem('token',val);
                // localStorage.setItem('token', 'Bearer ' + token);
                // try{

                //     // localStorage.setItem('token ',val)
                //     localStorage.setItem('token', 'Bearer ' + token);
                // }catch(err){
                //     console.log("local error ",err)
                //     throw err;
                // }
                return res.status(200).json({
                    sucess: true,
                    message: "Authenticated!,User Login Successfuly",
                    token: "Bearer "+token
                })
            } else {
                console.log("Password Incorrect");
                return res.status(401).json({ erroror: 'Password Incorrect' })
            }
        } else {
            res.status(404).json({
                message: "User does not exist"
            });
        }
    } catch (erroror) {
        res.status(500).json({
            message: erroror
        });
    }
}

// const axios = require('axios');

var dashboard = async (req, res) => {
    try {
        // Retrieve token from localStorage
        // Pass config as an option to User.findAll
        const d = await User.findAll();

        console.log("data is ", d);
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
        console.log("in backend editUser")
        const oldObj = await User.update({ email: "lion@123gmail.com" }, { where: { id: 3 } })
        console.log(oldObj);
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