var db = require('../config/config');
var  bcrypt = require("bcrypt");
var jwt  = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


var category = db.category;

var  createCategory = async(req,res)=>{
    console.log("this  is the req body",req.body);
    console.log("this  is the req file",req.file.originalname);
    const details ={
        ...req.body,
        image:req.file.filename
    }
    let data = await category.create(details);
    res.status(200).send({message: 'Category has been created successfully',data:data});
}

var getCategory =async(req,res)=>{
   let data =await category.findAll();
       if(!data){
           return res.status(404).send({message:'No Category Found'});
       }else{
          return res.status(200).send(data);
       }
}

var getsingleCategory =async(req,res)=>{
        let id= req.params.id;
        console.log(id);    
        let data = await  category.findAll({where:{id:id}});
        res.status(200).send(data);
}

var deleteCategory =async(req,res)=>{
        let id = req.params.id;
        let data = await category.destroy({ where: { id: id } });
        if (!data) {
            return res.status(400).send({ message: "No such Category found." }) 
        }else{
            return res.status(200).send({ message: "Category Deleted Succesfully" }) 
        }
}

var updateCategory =async(req,res)=>{
    console.log("asdf ",req.body.name);
    let id = req.params.id;
    console.log(id);
    const data = await category.findAll({
        where :{
            id:req.params.id
    }});
    if (!data) {
        return res.status(400).send({ message: 'Update failed!'});
    } else {
        console.log("in data ",data[0].dataValues.image);
        const exestingFile = path.join(__dirname,'../upload/images',data[0].dataValues.image);
        console.log(exestingFile);
        fs.unlinkSync(exestingFile,(error)=>{
            if(error){
                console.log(error);
            }
        });

        const newData ={
            ...req.body,
            image:req.file.filename
        }
        console.log(newData,"New Data");
        const result = await category.update(newData, { where: { id: id } });
        if(!result){
            return res.status(400).send({ message: 'Failed to Update'})
        }else if(result <=0){
            return res.status(400).send({ message: 'Category not exist.'})
        }else{
            return res.status(200).send({ message: 'Updated Successfully!', data: result });
        }
    }
}

module.exports={
    createCategory,
    getCategory,
    getsingleCategory,
    updateCategory,
    deleteCategory
}