var db = require('../config/config');
var subcategory = db.subcategory;
var Category = db.category;

var AddSubCategory = async (req, res) => {
    try {
        const data = req.body;
        // console.log("sub cate ", req.body)
        var result = await subcategory.create(data);
        // console.log("result ", result)
        if (!result) throw "Error in Saving Record";
        res.status(200).json(result);
    } catch (error) {
        throw error
    }
}

var getAllSubCategory = async (req, res) => {
    try {
        let data = await subcategory.findAll({
            include: [
                {
                    model: db.category
                }
            ]
        });
        // console.log("all sub ", data)
        res.status(200).json(data);
    } catch (error) {
        console.log("error in get all subCategory", error)
        throw error
    }
}
var getCateFromId = async (req, res) => {
    try {
        let cate_name = await Category.findOne({
            where: { id: req.params.id }
        })
        res.status(200).json(cate_name);
    } catch (error) {
        console.log("error in get single subCategory", error)
        throw error
    }
}
var getSingleSubCat = async (req, res) => {
    try {
        let data = await subcategory.findOne({
            where: { id: req.params.id }
        });
        res.status(200).json(data);
    } catch (error) {
        console.log("error in get single subCategory", error)
        throw error
    }
}

var removeSubCat = async (req, res) => {
    try {
        let data = await subcategory.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(data);
    } catch (error) {
        throw error
    }
}

var updateSubCat = async (req, res) => {
    try {
        // console.log("update sub cate ",req.body)
        let updateData = await subcategory.update(req.body, { where: { id: req.params.id } });
        // console.log("up st ",updateData)
        const newRes = {
            status:updateData[0],
            data:req.body
        }
        res.status(200).json(newRes);
    } catch (error) {
        console.log("error in update subcategory", error)
        throw error
    }
}

const getCateId = async (req, res) => {
    try {
        let data = await subcategory.findAll({
            where: { category_id: req.params.id },
            include: [
                {
                    model: db.category
                }
            ]
        });
        res.status(200).json(data[0].category.name);
    } catch (error) {
        throw error
    }
}

module.exports = {
    AddSubCategory,
    getAllSubCategory,
    getSingleSubCat,
    removeSubCat,
    updateSubCat,
    getCateFromId,
    getCateId
}