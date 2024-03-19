module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
        phone:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        }
    },{
        // tableName:'Users'
    })
    return User;
}