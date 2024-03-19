module.exports = (sequelize, DataTypes) =>{
    const customerOrder= sequelize.define('customerOrder', {
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        // order_number: {
        //     type:DataTypes.STRING,
        //     allowNull: false,
        // },
        status:{
            type:DataTypes.ENUM("pending", "processing","completed"),
            defaultValue:"pending"
        },
        pid:{
            type:DataTypes.INTEGER,
            allowNull:null
        },
        pname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        quantity:{
            type:DataTypes.INTEGER, //max 10 and  decimal upto 2 places only
            allowNull:false
        },
        pprice:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        tprice:{
            type:DataTypes.FLOAT,
            allowNull:false,
        }
    },{
        tableName:'customerOders'
    })
    return  customerOrder;
}