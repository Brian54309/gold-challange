'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasOne(models.User,{
        foreignKey:"id",
        sourceKey:"userid",
      })
      Order.hasOne(models.Product,{
        foreignKey:"id",
        sourceKey:'productid'
      })

    }

  }
  Order.init({
    userid: DataTypes.INTEGER,
    status: DataTypes.STRING,
    productid: DataTypes.ARRAY(DataTypes.INTEGER),
    quantity: DataTypes.ARRAY(DataTypes.INTEGER),
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};