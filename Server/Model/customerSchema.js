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
        },
        status:{
            type:DataTypes.BOOLEAN
        }
    },{
        // tableName:'Users'
    })
    return User;
}