module.exports = (sequelize,DataTypes) =>{
    const Category = sequelize.define('category',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'categories'
    })
    return Category;
}