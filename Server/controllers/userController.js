// const { hashSync, compare, compareSync } = require('bcrypt');
var db = require('../config/config');
var bcrypt = require("bcrypt");
var { hashSync, compare, compareSync } = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const sendEmail = require('../middleware/mail');
const { sendEmailForgot, mailTemplate } = require('../middleware/sendMail');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


var User = db.user;
const users = [];
const deleteUser = async (req, res) => {
    try {
        console.log("id is ", req.params.id)
        const agent = await User.destroy({
            where: { id: req.params.id }
        })
        console.log("agent is ", agent)
        res.status(200).send({
            id: req.params.id,
            message: "User deleted successfully",
            success: true
        })
    } catch (error) {
        console.log("error in delete user ", error)
        res.status(500).send({
            message: "Error in deleting user",
            success: false
        })
    }
}

const ResetPassword = async (req, res) => {
    try {
        console.log("reset password ", req.body)
        const userExist = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userExist) {
            res.status(200).send({
                message: "User doesn't exist",
                success: false
            })
            // hashSync(req.body.data.password, 10)
            // const oldObj = await User.update({ email: "lion@123gmail.com" }, { where: { id: 3 } })
        }
        const newpass = hashSync(req.body.password, 10);
        console.log("new reset password sis ", newpass)
        console.log("new reset password sis ", userExist.password)

        let comparePassword = await bcrypt.compare(req.body.password, userExist.password);
        console.log("compare pass --------------------------------------------------", comparePassword)
        if (comparePassword) {
            return res.status(200).send({
                message: "Enter new Password",
                success: true
            })
        }
        const data = await User.update({ password: newpass }, { where: { email: req.body.email } })
        return res.status(200).send({
            message: "Password change successfully.",
            success: true
        })
    }
    catch (error) {
        console.log("error in reset password ", error)
        // throw error
        return res.status(500).send({
            message: "Something unexpected happen",
            success: false
        })
    }
}

const forgorPassword = async (req, res) => {
    try {
        console.log('forgot password email ', req.body)
        const userExist = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userExist) {
            res.status(200).send({
                message: "User doesn't exist",
                success: false
            })
        } else {
            const mailOption = {
                email: req.body.email,
                subject: "Forgot Password",
                message: mailTemplate(
                    "We have received a request to reset your password. Please reset your password using the link below.",
                    `${process.env.FRONTEND_URL}/resetPassword/${req.body.email}`,
                    "Reset Password"
                ),
            };
            await sendEmailForgot(mailOption)
            res.json({
                success: true,
                message: "A password reset link has been sent to your email.",
            })
        }
        console.log("user exist forgotr ", userExist)
    } catch (error) {
        throw error
    }
}


//Create User
var createUser = async (req, res) => {
    try {
        console.log("req.body is ", req.body.data)
        const userExist = await User.findOne({
            where: {
                email: req.body.data.email
            }
        });
        if (!userExist) {
            // console.log("in backend sign ", req.body.data);
            console.log("data from add user ", req.body.data.loginVia)
            if (req.body.data.loginVia == 1) {
                const addData = {
                    ...req.body.data,
                    name: req.body.data.name
                    // loginVia:req.body.data.loginvia
                }
                var newUser = await User.create(addData);
                console.log("add goog ", newUser)
                const newRes = {
                    message: 'user created successfully',
                    status: 1
                }
                return res.status(200).send(newRes);
            } else {
                const data = {
                    ...req.body.data,
                    password: hashSync(req.body.data.password, 10)
                }
                var newUser = await User.create(data);
                const newRes = {
                    message: 'Authenticated!,User Login Successfuly',
                    status: 1
                }
                return res.status(200).send(newRes);
            }
        } else {
            // console.log("user already exist");
            const newRes = {
                message: 'user already exist',
                status: 0
            }
            return res.status(200).send(newRes);
        }
    } catch (err) {
        console.log('add user err r"', err)
        const newRes = {
            message: 'Error in sign up',
            status: 0,
            error: err
        }
        return res.status(500).send(newRes);
    }
}

//Login
var loginUser = async (req, res) => {
    try {
        // console.log("in backend login ", req.body.data);
        // console.log("in backend login ", req.body.data.email);

        const user = await User.findOne({ where: { email: req.body.data.email } });
        if (req.body.data.loginVia) {
            if (!user) {
                const res = await User.create(req.body.data)
                await User.update({ status: 1 }, { where: { email: req.body.data.email } })
            }
            const payload = {
                name: req.body.data.name,
                email: req.body.data.email
            }
            const token = jwt.sign(payload, "Random String", { expiresIn: "1m" })
            const val = 'Bearer ' + token;
            return res.status(200).json({
                message: "Authenticated!,User Login Successfuly",
                token: "Bearer " + token,
                status: true,
            })
        }

        if (user) {
            // console.log('exist ', user)
            await User.update({ status: 1 }, { where: { email: req.body.data.email } })
            let comparePassword = await bcrypt.compare(req.body.data.password, user.password);
            if (comparePassword) {
                const payload = {
                    name: user.name,
                    email: user.email
                }
                const token = jwt.sign(payload, "Random String", { expiresIn: "1m" })
                const val = 'Bearer ' + token;
                return res.status(200).json({
                    // sucess: true,
                    message: "Authenticated!,User Login Successfuly",
                    token: "Bearer " + token,
                    status: true,
                    role: user.role
                    // user: user.firstName
                })
            }
            else {
                return res.status(200).json({
                    message: 'Password Incorrect',
                    status: false
                })
            }
        }
        else {
            res.status(200).json({
                message: "User does not exist",
                status: false
            });
        }
    } catch (erroror) {
        console.log("er ", erroror)
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
        return res.status(200).json(d);
    } catch (error) {
        console.erroror("erroror:", error);
        return res.status(500).json({
            message: "Internal Server erroror dashboard"
        });
    }
};

// var roleUpdate = async (req,res)
var roleUpdate = async (req, res) => {
    try {
        // console.log("in backend editUser ", req.body)
        const oldObj = await User.update({ role: req.body.role }, { where: { id: req.params.id } })
        // console.log(oldObj);
        if (oldObj[0] == 1) {
            return res.status(200).json({
                message: "Role updated successfully.",
                data:req.body,
                success: 1
            }
            );
        } else {
            return res.status(200).json({
                message: "Error in update role",
                success: 0
            })
        }
    } catch (error) {
        console.log("erroror:", error);
        return res.status(500).json({
            message: "Internal Server erroror editUser",
            success: 0
        })
    }
}
module.exports = {
    createUser,
    loginUser, dashboard, roleUpdate, forgorPassword, ResetPassword, deleteUser
}