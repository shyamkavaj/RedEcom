module.exports = (sequelize, DataTypes) =>{
    const customerOrder= sequelize.define('customerOrder', {
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        pincode:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        phone:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        // order_number: {
        //     type:DataTypes.STRING,
        //     allowNull: false,
        // },
        status:{
            type:DataTypes.ENUM("pending", "processing","delivered"),
            defaultValue:"pending"
        },
        // pid:{
        //     type:DataTypes.INTEGER,
        //     allowNull:null
        // },
        products:{
            type:DataTypes.JSON,
            allowNull:false
        },
        quantity:{
            type:DataTypes.INTEGER, //max 10 and  decimal upto 2 places only
            allowNull:false
        },
        // pprice:{
        //     type:DataTypes.FLOAT,
        //     allowNull:false
        // },
        total:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },{
        tableName:'customerOders'
    })
    return  customerOrder;
}