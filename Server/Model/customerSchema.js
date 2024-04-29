module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING,
            // allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            // allowNull:false
        },
        status:{
            type:DataTypes.BOOLEAN
        },
        loginVia:{
            type:DataTypes.BOOLEAN
        }
    },{
        // tableName:'Users'
    })
    return User;
}