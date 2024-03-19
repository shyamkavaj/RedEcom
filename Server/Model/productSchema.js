module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define('Product', {
        subcateId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull:false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        categ:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        image:{
            type:DataTypes.JSON,
            allowNull:false
        }
    })
    return Product;
}