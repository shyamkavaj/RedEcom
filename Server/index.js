const express = require('express');
var bodyParser = require('body-parser');
// import verifyToken from './verifyToken';
const app = express();
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())
//Model
const User = require('./Model/customerSchema');
var userCtrl = require('./controllers/userController');
const staffCtrl = require('./controllers/staffMemberController')
const categoryCtrl = require('./controllers/categoryController')
const customerOrderCtrl = require('./controllers/orderController')
const contactCtrl = require('./controllers/contactController')
const subcategoryCtrl = require('./controllers/subcategoryCtrl')
const verifyToken = require('./middleware/verifyToken');
const passport = require('passport');
const router = express.Router();
// config
const sequelize = require('./config/config');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
require('dotenv').config()
//data format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static('uploads'))

const productCtrl = require('./controllers/productCtrl')
var faqCtrl = require('./controllers/faqCtrl');
const upload = require('./middleware/multer');
const checkToken = require('./middleware/verifyToken');

app.post('/signup', userCtrl.createUser);
app.post('/login', userCtrl.loginUser);
app.post('/forgotPassword',userCtrl.forgorPassword)
app.patch('/resetpassword',userCtrl.ResetPassword)
app.delete('/deleteuser/:id', userCtrl.deleteUser)

// app.get('/dashboard',verifyToken,userCtrl.dashboard)
app.get('/getAllUser', userCtrl.dashboard)
app.patch('/roleupdate/:id', userCtrl.roleUpdate)

// app.post('/api/google-login',userCtrl.googleLogin)


// product controller
app.post('/addProduct', upload.array('image'), productCtrl.addProduct)
app.get('/getSingleProduct/:id', productCtrl.getProductById)
app.get('/getAllProduct', productCtrl.getAllProduct)
app.get('/getProductByCate/:id', productCtrl.getProductByCategory)
app.get('/getProductByCategAndSubCate/:id/:categ', productCtrl.getProductByCategAndSubCate)
app.post('/updateProductImg/:id', upload.array('image'), productCtrl.updateProductImgById)
app.post('/specificImgDelete/:id/:index', productCtrl.specificImgDelete)
app.patch('/updateProductDetail/:id', upload.array('image'), productCtrl.updateProductDetailById)
app.delete('/deleteProduct/:id', productCtrl.deleteProductById)

//Staff CRUD
app.post('/addstaff', checkToken, staffCtrl.createstaffMember);
app.get('/getstaffs', checkToken, staffCtrl.getstaffMember);
app.get('/getsinglestaff/:id', checkToken, staffCtrl.getsinglestaffMember);
app.delete('/deletestaff/:id', checkToken, staffCtrl.deletestaffMember);
app.patch('/updatestaff/:id', checkToken, staffCtrl.updatestaffMember);

//Category CRUD
app.post('/addCategory', categoryCtrl.createCategory);
app.get('/getallcategory', categoryCtrl.getAllCategory);
app.get('/getsignlecategory/:id', categoryCtrl.getsingleCategory);
app.delete('/deletecategory/:id', categoryCtrl.deleteCategory);
app.patch('/updatecategory/:id', categoryCtrl.updateCategory);

//customer Order CRUD
app.get('/getallorder', customerOrderCtrl.getAllCustomerOrders)
app.get('/getsingleorder/:id', customerOrderCtrl.getSingleCustomerOrder)
app.post('/addorder', customerOrderCtrl.addCustomerOrder);
app.delete('/deleteorder/:id', customerOrderCtrl.deleteCustomerOrder);
app.patch('/updateorder/:id', customerOrderCtrl.updateCustomerOrder);

app.post('/success', customerOrderCtrl.paymentCapture)
// 2303manavgohel@gmail.com
//Contact CRUD
app.get('/getAllcontact', contactCtrl.getAllContact);
app.get('/getcontact/:id', contactCtrl.getOneContact);
app.post('/addcontact', contactCtrl.addContact);
app.delete('/deletecontact/:id', contactCtrl.deleteContact);
app.patch('/updatecontact/:id', contactCtrl.updateContact);

// faq controller
app.get('/getFaq/:id', faqCtrl.getFaq);
app.get('/getAllFaq', faqCtrl.getAllFaq);
app.post('/addFaq', faqCtrl.createFaq);
app.patch('/updateFaq/:id', faqCtrl.updateFaq);
app.delete('/deleteFaq/:id', faqCtrl.deleteFaq);
// console.log("sec_id ",process.env.RAZORPAY_SECRET)
//SubCategory CRUD
app.post('/addsubcategory', subcategoryCtrl.AddSubCategory);
app.get('/getallsubcategory', subcategoryCtrl.getAllSubCategory);
app.get('/getsinglesubcat', subcategoryCtrl.getSingleSubCat);
app.delete('/deletesubcategory/:id', subcategoryCtrl.removeSubCat);
app.patch('/updatesubcat/:id', subcategoryCtrl.updateSubCat);


app.get('/getCateId/:id', subcategoryCtrl.getCateId);


// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
})