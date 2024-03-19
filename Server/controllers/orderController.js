var db = require('../config/config');
const sendEmail = require('../middleware/mail');

var cutomerOrder = db.customerOrder;

//get all customer orders
var getAllCustomerOrders = async (req, res) => {
    let data = await cutomerOrder.findAll({});
    if (data) {
        res.status(200).send(data);
    } else {
        res.status(500).send("Customer order not Found");
    }
}

//get one order by id
var getSingleCustomerOrder = async (req, res) => {
    let data = await cutomerOrder.findAll({
        where: {
            id: req.params.id
        }
    })
    if (data == undefined || data.length == 0) {
        res.status(404).send("The Customer Order you are looking for is not available!");
    } else {
        res.status(200).send(data);
    }
}

//add new order 
var addCustomerOrder = async (req, res) => {
    const details = {
        ...req.body,
        tprice:req.body.quantity*req.body.pprice
    }
    let data = await cutomerOrder.create(details);
    if (!data) {
        res.status(400).send("faild to create the Customer Order");
    } else {
        const  message= `<h1>Your Order has been created successfully! <br/>
        Your Order ID is : <b>${data.id}</b> <br/> 
        ThanK You.</h1>`    
        // this mail send successfully but  it does not still need
        // sendEmail(data.email,"Regarding your order comformation",message)
        console.log(message)
        res.status(200).send(data);
    }
}

//delete an order
var deleteCustomerOrder = async (req, res) => {
    let data = await cutomerOrder.destroy({ where: { id: req.params.id } });
    if (!data) {
        res.status(404).send('This Customer Order does not exist!');
    } else {
        res.status(200).send('Order has been deleted Successfully')
    }
}

//update an existing order
var updateCustomerOrder = async (req, res) => {
    try {
        // let data = await customerOrder.update(req.body, { where: { order_number: req.params.order_number } });
        const result = await cutomerOrder.update(req.body,{where:{id:req.params.id}})
        res.status(200).send(result,"Updated Succesfully");
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllCustomerOrders,
    getSingleCustomerOrder,
    addCustomerOrder,
    deleteCustomerOrder,
    updateCustomerOrder
}