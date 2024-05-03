var db = require('../config/config')
var Product = db.product
const fs = require('fs');
const path = require('path');

const modifiedProducts = (array) => {
    // console.log(" array is ", array)
    const modifiedProducts = array.map(product => {
        const modifiedProduct = { ...product.dataValues }; // Create a copy of the product object
        modifiedProduct.image = JSON.parse(product.dataValues.image); // Parse the image JSON
        return modifiedProduct;
    });
    return modifiedProducts;
}
var addProduct = async (req, res) => {
    try {
        // console.log(" in add file ",req.files)
        // console.log(" in add Product ",req.body)
        // console.log(" image_name ", req.files[0].filename)
        var image = []
        req.files.forEach(element => {
            image.push(element.filename)
            // console.log("name is ",element.filename);
        });
        const addData = {
            ...req.body,
            image: image
        }
        // console.log(" addData ", addData)
        const addNewProduct = await Product.create(addData);
        const responseData = {
            success: 1,
            product: addNewProduct
        };
        return res.status(200).json(responseData);
    } catch (error) {
        console.log("error in add product ", error);
        return res.status(500).json({ "message": "Something went wrong in add Product ctrl" });
    }
}
const getAllProduct = async (req, res) => {
    try {
        // console.log("in get all")
        const getAllProducts = await Product.findAll();
        // console.log("getAllProducts ", getAllProducts);
        const newModifyedArray = modifiedProducts(getAllProducts)
        return res.status(200).json(newModifyedArray);
    } catch (error) {
        console.log("error in get all product ", error);
        return res.status(500).json({ "message": "Something went wrong in get all Product ctrl" });
    }
}
var getProductById = async (req, res) => {
    try {
        // console.log("req.params.id ", req.params.id)
        const getProductById = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        getProductById.image = JSON.parse(getProductById.image)
        // const newModifyedArray = modifiedProducts(getProductById)
        // const newModifyedArray = JSON.parse(getProductById);
        // console.log("new ",getProductById)
        return res.status(200).json(getProductById);
    } catch (error) {
        console.log("error in get product by id ", error);
        return res.status(500).json({ "message": "Something went wrong in get Product by id ctrl" });
    }
}
var getProductByCategory = async (req, res) => {
    try {
        const getProductByCate = await Product.findAll({
            where: {
                categ: req.params.id
            }
        })
        const newModifyedArray = modifiedProducts(getProductByCate)
        return res.status(200).json(newModifyedArray);
    } catch (error) {
        console.log("error in get product by category ", error);
        return res.status(500).json({ "message": "Something went wrong in get Product by category ctrl" });
    }
}
var getProductByCategAndSubCate = async (req, res) => {
    try {
        // console.log("req.params.categ is ", req.params.categ, "id is", req.params.id)
        const getProductByCategAndSubCate = await Product.findAll({
            where: {
                subcateId: req.params.id,
                categ: req.params.categ
            }
        })
        const newModifyedArray = modifiedProducts(getProductByCategAndSubCate)
        return res.status(200).json(newModifyedArray);
    } catch (error) {
        console.log("error in get product by category and sub-categ")
    }
}
var updateProductDetailById = async (req, res) => {
    try{
        // console.log("req.body is -----------------------------------",req.body);
        var image = []
        var newObj ;
        // console.log("req.file is ***********************************",req.files);
        if(req.files.length!=0){
            
            req.files.forEach((img) => {
                image.push(img.filename);
            })
            newObj = {
                ...req.body,
                price:parseInt(req.body.price),
                categ:parseInt(req.body.categ),
                subcateId:parseInt(req.body.subcateId),
                id:parseInt(req.body.id),
                image:image
            }
            // console.log("immg array is ",newObj)

        } else {
            newObj = {
                ...req.body,
                price:parseInt(req.body.price),
                categ:parseInt(req.body.categ),
                subcateId:parseInt(req.body.subcateId),
                id:parseInt(req.body.id),
            }
            // console.log('req.body in else &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ',newObj)
        }
        const st = await Product.update(newObj, {
            where: {
                id:req.params.id
            }
        })
        // console.log("update pro ctrl ",st)
        const sendResp = { 
            status:st[0],
            data:newObj
        }
        return res.status(200).json(sendResp);
    }catch(err){
        console.log("error in update product detail by id",err)
        throw err;
    }
}
var updateProductImgById = async (req, res) => {
    try {

        const oldImg = await Product.findOne({
            where:{
                id: req.params.id
            }
        })
        var imgArr = [];
        JSON.parse(oldImg.dataValues.image).forEach(element => {
            imgArr.push(element)
        })
        req.files.forEach(element => {
            // console.log("ele ",element)
            imgArr.push(element.filename)
        })
        const newUpdatedObj = {
            ...oldImg,
            image:imgArr
        }
        // console.log("newUpdatedObj ",newUpdatedObj)
        const updateProductById = await Product.update(newUpdatedObj, {
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json(updateProductById);
    } catch (error) {
        console.log("error in update product by id ", error);
        return res.status(500).json({ "message": "Something went wrong in update Product by id ctrl" });
    }
}
var specificImgDelete = async (req,res) => {
    try{
        const specificImg = await Product.findOne({
            where:{
                id:req.params.id
            }
        })
        // console.log("specificImg ",specificImg.dataValues)
        // console.log("delete img ",JSON.parse(specificImg.dataValues.image)[req.params.index])
        const selectedImg = JSON.parse(specificImg.dataValues.image)[req.params.index];
        const imgPath = path.join(__dirname, '../uploads/' + selectedImg);
        fs.unlink(imgPath, (err) => {
            if(err){
                console.log("error in unlink img ",err)
            }
        })
        const nn = JSON.parse(specificImg.dataValues.image)
        const imgArr = nn.splice(req.params.index,1);

        // console.log("imgArr ",nn)
        const newProduct = {
            ...specificImg,
            image:nn
        }
        const updateProductById = await Product.update(newProduct, {
            where: {
                id:req.params.id
            }
        })
        return res.status(200).json(updateProductById)
    }catch(err){
        console.log("error in specific img ",err)
        return res.status(500).json({"message":"Something went wrong in specific img ctrl"})
    }
}
var deleteProductById = async (req, res) => {
    try {
        const deleteProductById = await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json(deleteProductById);
    } catch (error) {
        console.log("error in delete product by id ", error);
        return res.status(500).json({ "message": "Something went wrong in delete Product by id ctrl" });
    }
}

module.exports = {
    addProduct, 
    getAllProduct, 
    getProductById, 
    getProductByCategory, 
    getProductByCategAndSubCate, 
    updateProductDetailById,
    updateProductImgById, 
    specificImgDelete,
    deleteProductById
}