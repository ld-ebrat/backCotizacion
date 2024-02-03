'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Quotation, { through: 'QuotationProducts' });
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    UserId: DataTypes.UUID,
    name: DataTypes.STRING,
    details:DataTypes.STRING,
    imag: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};