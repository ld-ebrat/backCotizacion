'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Quotation);
      this.hasMany(models.Product)
      this.belongsTo(models.City)
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    CityId: DataTypes.UUID,
    fullname: DataTypes.STRING,//
    email: DataTypes.STRING, //
    password: DataTypes.STRING, //
    phone: DataTypes.STRING, //
    address: DataTypes.STRING, //
    description: DataTypes.STRING,//
    imag: DataTypes.STRING,
    role: DataTypes.ENUM("ADMIN", "USER")
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};