var db = require('../config/config');
var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var {hashSync} = require('bcrypt');

var staffMember = db.staffMember;

//get ALl member
var getstaffMember = async(req,res)=>{
    let data = await staffMember.findAll({});
    res.status(200).json(data);
}

//get Single Member
var getsinglestaffMember = async(req,res)=>{
    // console.log(req.params.id);
    let data = await staffMember.findOne({where:{id:req.params.id}});
    console.log(data);
    res.status(200).json(data);
}

//Create member
var createstaffMember = async(req,res)=>{
    const memberExist = await staffMember.findAll({
        where :{
            email:req.body.email
        }
    });
    if(!memberExist){
        const data = {
            ...req.body,
            password:hashSync(req.body.password,10)
        }
        // console.log(data); 
        let newMember = await staffMember.create(data);
        res.status(200).send({message:"Staff Member Created Successfully",newMember});
    }else{
        res.status(500).send({message:"Staff Member already exists"})
        }
}


//Update member
var  updatestaffMember=async(req,res)=>{
    let updateData = {
        ...req.body,
        password: hashSync(req.body.password,10)
    }
    let updatemember = await staffMember.update(updateData,{where:{id:req.params.id}});
    console.log("Updatemember===>",updatemember);
    if(updatemember[0]>0){
        res.status(200).json({success:1,message:'Data updated Successfully'});
    }else{
        res.status(500).json({success:0,message:'Data does not updated'});
    }
}

//Delete member
var deletestaffMember = async (req,res)=>{
    let deletedmember=await staffMember.destroy({where:{id:req.params.id}});
    console.log(deletedmember);
    res.status(200).send({message:'Deleted the user'});
}

module.exports={
    createstaffMember,
    deletestaffMember,
    updatestaffMember,
    getstaffMember,
    getsinglestaffMember
    
}