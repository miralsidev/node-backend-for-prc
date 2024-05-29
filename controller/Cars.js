
// const { CarService } = require('../Services/Cars')
const Cars = require('../models/Cars')
const AddCars = async (req, res) => {
  const {
    plate_number,
    model,
    price,
    description,
    mileage,
    Air_Conditioning_Availability,
    seats,
    luggage,
    fuel,
    brand,
  } = req.body;
  console.log("req.bodyreq.body", req.body)
  if (
    plate_number &&
    model &&
    price &&
    description &&
    mileage &&
    Air_Conditioning_Availability &&
    seats &&
    luggage &&
    fuel &&
    brand
  ) {

    console.log("ffnfiofneofinef", req.file)
    try {
      const existingCar = await Cars.findOne({ plate_number: plate_number });
      if (existingCar) {
        return res.json({ status: 400, message: "Plate number already exists" });
      }
      const data = new Cars({
        plate_number: plate_number,
        filename: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        conneteType: req.file.mimetype,
        brand: brand,
        model: model,
        price: price,
        description: description,
        mileage: mileage,
        Air_Conditioning_Availability: Air_Conditioning_Availability,
        seats: seats,
        luggage: luggage,
        fuel: fuel,
      });
      console.log("data", data)
      await data.save();
      return res.json({ status: 200, message: "add cars succesfully.!!" })
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: "intrnal server error" });
    }
  } else {
    return res.json({ status: 400, message: "all field are required" });
  }
};

const DisplayCars = async (req, res) => {
  try {
    const data = await Cars.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching cars', error: error.message });
  }
};

const UpdateCras = async (req, res) => {
  const {
    plate_number,
    model,
    price,
    description,
    mileage,
    Air_Conditioning_Availability,
    seats,
    luggage,
    fuel,
    brand
  } = req.body;
  const carId = req.params.id;
  try {
    console.log("plate number == ", plate_number);
    const product = await Cars.findById(carId);
    if (!product) {
      return res.json({ status: 404, message: "Car not found" });
    }

    if (plate_number && plate_number !== product.plate_number) {
      return res.json({ status: 400, message: "Plate number cannot be modified" });
    }
    const updateFields = {
      model,
      price,
      description,
      mileage,
      Air_Conditioning_Availability,
      seats,
      luggage,
      fuel,
      brand
    };
    if (req.file) {
      updateFields.filename = req.file.originalname;
      updateFields.path = req.file.path;
      updateFields.size = req.file.size;
      updateFields.contentType = req.file.mimetype;
    }

    await Cars.findByIdAndUpdate(
      carId,
      { $set: updateFields }
    );


    res.json({ status: 200, message: "Update Product Successfully..!" });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "intrnal server error" });
  }
}

const viewData = async (req, res) => {
  try {
    const carId = req.params.id;
    const data = await Cars.findById(carId);

    console.log("data==", data);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching cars', error: error.message });
  }
}

const deleteCars = async (req, res) => {
  try {
    const carId = req.params.id;
    console.log("cars id ==", carId);
    date = new Date();
    const product = await Cars.findOne({
      _id: carId,
    });
    console.log("product===", product);

    const result = await Cars.findOneAndUpdate(
      { _id: carId },
      { $set: { deletedAt: date } }
    );
    console.log("result == ", result);
    if (!result) {
      res.json({status:400, message: "documnet is not found" });
    }
    res.json({status:200, message: "Documnet Deleted Successfully..!!" });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "intrnal server error" });
  }
}

module.exports = { AddCars, DisplayCars, UpdateCras, viewData, deleteCars }



   