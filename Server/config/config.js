const {Sequelize,DataTypes,Model} = require('sequelize');

const sequelize = new Sequelize(
    'e_commerce',
    'root',
    '',
    {
        host:'localhost',
        logging: true, //false if you want to disable printing log
        dialect: "mysql"  //use mysql for production
    });

try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (erroror) {
    console.erroror("Unable to connect to the database:", erroror);
}

const db = {};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.user = require('../Model/customerSchema')(sequelize,DataTypes);

db.product = require('../Model/productSchema')(sequelize,DataTypes);

db.faq = require('../Model/faqSchema')(sequelize,DataTypes);

db.staffMember = require('../Model/staffMember')
db.category = require('../Model/category')(sequelize,DataTypes);
db.customerOrder = require('../Model/customerOrder')(sequelize, DataTypes);
db.contact = require('../Model/contact')(sequelize, DataTypes);
db.staff = require('../Model/staffMember')(sequelize, DataTypes);

db.sequelize.sync({alter: true}).then(() =>{
    console.log("Table created");
});

module.exports =db;