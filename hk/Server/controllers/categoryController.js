var db = require('../config/config');
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


var category = db.category;

var createCategory = async (req, res) => {
    try {
        const details = {
            ...req.body,
        }
        let data = await category.create(details);
        res.status(200).json(data);
    } catch (error) {
        throw error;
    }

}

var getAllCategory = async (req, res) => {
    try {
        let data = await category.findAll();
        return res.status(200).json(data);
    } catch (error) {
        throw error;
    }
}

var getsingleCategory = async (req, res) => {
    try {
        let id = req.params.id;
        // console.log(id);
        let data = await category.findAll({ where: { id: id } });
        res.status(200).send(data);
    } catch (error) {
        throw error
    }
}

var deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await category.destroy({ where: { id: id } });
        if (!data) {
            return res.status(400).send({ message: "No such Category found." })
        } else {
            return res.status(200).send({ message: "Category Deleted Succesfully" })
        }
    } catch (error) {
        throw error
    }
}

var updateCategory = async (req, res) => {
    try {
        // console.log("category ", req.body);

        let id = req.params.id;
        // console.log('body ',req.body)
        // console.log("id ", id);
        const { name } = req.body;
        const result = await category.update({name},{ where: { id: id } });
        // console.log(id);
        // const data = await category.findAll({
        //     where: {
        //         id: req.params.id
        //     }
        // });
        // if (!data) {
        //     return res.status(400).send({ message: 'Update failed!' });
        // } else {
            // console.log("in data ", data[0].dataValues.image);
            // const exestingFile = path.join(__dirname, '../upload/images', data[0].dataValues.image);
            // console.log(exestingFile);
            // fs.unlinkSync(exestingFile, (error) => {
            //     if (error) {
            //         console.log(error);
            //     }
            // });

            // const newData = {
            //     ...req.body,
            //     image: req.file.filename
            // }
            // console.log(newData, "New Data");
            // if (!result) {
            //     return res.status(400).send({ message: 'Failed to Update' })
            // } else if (result <= 0) {
            //     return res.status(400).send({ message: 'Category not exist.' })
            // } else {
            //     return res.status(200).send({ message: 'Updated Successfully!', data: result });
            // }
        // }
        return res.status(200).json(result)
    } catch (error) {
        throw error
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    getsingleCategory,
    updateCategory,
    deleteCategory
}