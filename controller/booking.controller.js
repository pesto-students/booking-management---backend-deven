const Booking = require("../db/models/Booking");
const { default: mongoose } = require("mongoose");
const yup = require("yup");
const { sendBookingEmail } = require("../lib/sendEmail");

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // default to first page with 10 items per page

  try {
    const bookings = await Booking.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("propertyId", "name"); // populate property name

    const totalBookings = (await Booking.find()).length;

    res.json({
      totalRecords: totalBookings,
      totalPages: Math.ceil(totalBookings / limit),
      currentPage: page,
      bookings,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await Booking.findById(id).populate("propertyId", "name");
    booking.id = booking._id;
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    dateCheckIn: yup.date().required(),
    dateCheckOut: yup.date().required(),
    adults: yup.number().required(),
    children: yup.number().required(),
    room: yup.number().required(),
    // specialRequest: yup.string(),
    // status: yup.boolean().required(),
    propertyId: yup.string().required(),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json({ message: err.errors.join(", ") });
  }

  const booking = new Booking(req.body);

  try {
    const savedBooking = await booking.save();

    const to = booking.email;
    const subject = "Booking confirmation email";
    const data = {
      name: booking.name,
      email: booking.email,
      dateCheckIn: booking.dateCheckIn,
      dateCheckOut: booking.dateCheckOut,
      adults: booking.adults,
      children: booking.children,
      room: booking.room,
      specialRequest: booking.specialRequest,
    };
    const info = await sendBookingEmail({ to, subject, data });

    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateById = async (req, res) => {
  const id = req.params.id;

  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    dateCheckIn: yup.date(),
    dateCheckOut: yup.date(),
    adults: yup.number(),
    children: yup.number(),
    room: yup.number(),
    specialRequest: yup.string(),
    status: yup.boolean(),
    propertyId: yup.string(),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json({ message: err.errors.join(", ") });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { ...req.body, modifiedAt: new Date() },
      { new: true } // return the updated document
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
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
    const property = await Booking.findByIdAndRemove(id);

    if (!property) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
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
