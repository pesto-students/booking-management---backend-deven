const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// mongoose.connect('mongodb://localhost:27017/pest-booking-management');
mongoose.connect(
  "mongodb+srv://sdeven:FWtQarp4fREW4dNH@cluster0.4c0ixve.mongodb.net/pesto-booking-management"
);
