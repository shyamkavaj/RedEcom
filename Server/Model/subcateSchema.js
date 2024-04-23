

module.exports = (sequelize,DataTypes) =>{
    const SubCategory = sequelize.define('subcategory',{
        category_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            // references:{ 
            //     model:"categories",
            //     key:"id"
            // }
        },
        subcategory_name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'subcategory'
    })
    return SubCategory;
}