const Cars = require('../models/Cars')

const CarService = [];

CarService.create = async (param) => {
    console.log("service");
    const data = await Cars
      .create(param)
      .then((e) => e)
      .catch((e) => e);
    return data;
  };
  module.exports = {CarService}