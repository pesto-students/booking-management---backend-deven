const Property = require("../db/models/Property");
const yup = require("yup");
const { default: mongoose } = require("mongoose");

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // default to first page with 10 items per page

  try {
    const properties = await Property.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    const totalProperties = (await Property.find()).length;

    // const totalProperties = await Property.countDocuments(); // get total count of properties

    console.log(req.query);
    res.json({
      totalRecords: totalProperties,
      totalPages: Math.ceil(totalProperties / limit),
      currentPage: page,
      properties,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;

  try {
    const property = await Property.findById(id);
    property.id = property._id;
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    console.log("property");
    console.log({ property });

    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    destination: yup.string(),
    //roomTypes: yup.array().of(yup.string()).required(),
    status: yup.boolean().required(),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json({ message: err.errors.join(", ") });
  }

  req.body.roomTypes = req.body.roomTypes.map((element) => {
    return { ...element, _id: mongoose.Types.ObjectId() };
  });
  const property = new Property(req.body);

  try {
    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateById = async (req, res) => {
  const id = req.params.id;

  const schema = yup.object().shape({
    name: yup.string(),
    destination: yup.string(),
    // roomTypes: yup.array().of(yup.string()),
    status: yup.boolean(),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json({ message: err.errors.join(", ") });
  }

  try {
    const property = await Property.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // return the updated document
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    res.status(400).json({
      message: "Error storing data",
      errors: err.message,
    });
  }
};

const deleteById = async (req, res) => {
  const id = req.params.id;

  try {
    const property = await Property.findByIdAndRemove(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
