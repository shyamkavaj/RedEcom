const { json } = require('sequelize');
var db = require('../config/config');
const sendEmail = require('../middleware/mail');
const Razorpay = require('razorpay');
const crypto = require('crypto')
var cutomerOrder = db.customerOrder;

//get all customer orders
var getAllCustomerOrders = async (req, res) => {
    try{
        const data = await cutomerOrder.findAll();
        // console.log('data is ',data);
        // const newRes = {
        //     ...data,
        //     products:JSON.parse(data.products)
        // }
        // console.log("send order is ",data[0].products)
        return res.status(200).json(data)
    } catch (error) {
        throw error;
    }
    // let data = await cutomerOrder.findAll({});
    // if (data) {
    //     res.status(200).send(data);
    // } else {
    //     res.status(500).send("Customer order not Found");
    // }
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
// var addCustomerOrder = async (req, res) => {
//     try {
//         let data = await cutomerOrder.create(req.body);
//         if (!data) {
//             res.status(400).json("faild to create the Customer Order");
//         } else {
//             // console.log("mail data", data.dataValues);
//             // const  message= `<h1>Your Order has been created successfully! <br/>
//             // Your Order ID is : <b>${JSON.stringify(data)}</b> <br/> 
//             // ThanK You.</h1>`  
//             const ot = JSON.stringify(data.updatedAt)

//             // console.log("val in send ",ot,"type ot ",typeof(ot));
//             const val = ot.slice(1,11);
//             const message = ` <div className="order_details_table">
//             <h2>Order Details</h2>
//             <div className="table-responsive" style={{'border':'1px solid black'}} >
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th scope="col"></th>
//                             <th scope="col"></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>Name : </td>
//                             <td>${data.name}</td>
//                         </tr>
//                         <br/>
//                         <tr>
//                             <td>Email : </td>
//                             <td>${data.email}</td>
//                         </tr>
//                         <br/>
//                         <tr>
//                             <td>Address : </td>
//                             <td>${data.address} ${data.pincode}</td>
//                         </tr>
//                         <br/>
//                         <tr>
//                             <td>City : </td>
//                             <td>${data.city}</td>
//                         </tr>
//                         <br/>
//                         <tr>
//                             <td>Total Items : </td>
//                             <td>${data.quantity}</td>
//                         </tr>
//                         <br/>
//                         <tr>
//                             <td>Total Amound : </td>
//                             <td>${data.total}</td>
//                         </tr>
//                         <br/>
//                         <tr>
//                             <td>Order at : </td>
//                             <td>${val}</td>
//                         </tr>
//                         <br/>
//                     </tbody>
//                 </table>
//             </div>
//         </div>`
//             // this mail send successfully but  it does not still need
//             sendEmail(data.email, "Regarding your order comformation ", message)
//             // console.log(message)
//             const newres = {
//                 ...data.dataValues,
//                 status: 1
//             }
//             // console.log('new res ',newres)
//             return res.status(200).json(newres);
//         }
//     } catch (error) {
//         console.log("error in add customer orders", error);
//         throw error
//     }
// }

const addCustomerOrder = async (req,res) => {
    try{
        console.log('req in add order is ',req.body)
        const razorpay = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_SECRET
        })
        const options = {
            amount:req.body.total*100,
            currency:"INR",
            receipt:"receipt_order_74394",
        }
        const order = await razorpay.orders.create(options);

        if(!order){
            return res.status(500).send("some error occured")
        }
        res.json(order)
    } catch(error) {
        console.log("error in addorder : ",error);
        return res.status(500).json(error)
    }
}

const paymentCapture = async (req,res) =>{
    try {
        console.log("req for success ",req.body)
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "elspAJS7GT0YQAYVg9zSG8so");
        console.log('shasum ',shasum)
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");
        console.log('digest is ',digest)
        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
        let data = await cutomerOrder.create(req.body.data); 
        
        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

//delete an order
var deleteCustomerOrder = async (req, res) => {
    try{
        let data = await cutomerOrder.destroy({ where: { id: req.params.id } });
        // console.log("data is : ",typeof data)
        const newdata = {
            data:data,
            id:req.params.id
        }
        return res.status(200).json(newdata);
    } catch(error){
        throw error;  
    }
}

//update an existing order
var updateCustomerOrder = async (req, res) => {
    try {
        console.log("res updata ",req.body.data)
        // let data = await customerOrder.update(req.body, { where: { order_number: req.params.order_number } });
        const result = await cutomerOrder.update(req.body.data,{where:{id:req.params.id}})
        const newRes = {
            status:result,
            data:req.body.data
        }
        res.status(200).json(newRes);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllCustomerOrders,
    getSingleCustomerOrder,
    addCustomerOrder,
    deleteCustomerOrder,
    updateCustomerOrder,
    paymentCapture
}