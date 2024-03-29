'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Product, { through: 'QuotationProducts' });
    }
  }
  Quotation.init({
    UserId:DataTypes.UUID,
    ClientId: DataTypes.UUID,
    subTotal: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Quotation',
  });
  return Quotation;
};