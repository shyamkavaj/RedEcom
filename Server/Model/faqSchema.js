module.exports = (sequelize,DataTypes) =>{
    const Faq = sequelize.define("Faq", {
        ques:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ans:{
            type: DataTypes.STRING,
            allowNull:true
        }
    })
    return Faq;
}