const Cars = require('../models/Cars')

const CarService = [];

CarService.create = async (param) => {
  console.log("param", param)
  const data = await Cars
    .create({
      
    })
    .then((e) => e)
    .catch((e) => e);
  console.log("datadatadata", data)

  return data;
};

CarService.find = async () => {
  const data = await Cars.find().then((e) => e).catch((e) => e);
  console.log(data, "======data=====");//aa display ma run thay che 
  return data;
}
module.exports = { CarService }