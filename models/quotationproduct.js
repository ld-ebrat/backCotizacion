'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuotationProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuotationProduct.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    QuotationId: DataTypes.INTEGER,
    ProductId: DataTypes.UUID,
    amount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'QuotationProduct',
  });
  return QuotationProduct;
};