// const { subcategory } = require("../config/config");
// const subcateSchema = require("./subcateSchema");
const db = require('../config/config')
// const SubCategory = require("./subcateSchema")

// var subcategory = db.subcategory;
const subCategory = db.subcategory
module.exports = (sequelize,DataTypes) =>{

    const Category = sequelize.define('category',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
    },{
        tableName:'Categories'
    })


    return Category;
}