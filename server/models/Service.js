// Importing from Mongoose for creating schemas and models
const { Schema, model } = require("mongoose");

// Defining the service schema using the Schema constructor
const serviceSchema = new Schema({
  //name of the service.
  name: {
    type: String,
    required: true,
  },
});

// Creating the Service model
const Service = model("Service", serviceSchema);

module.exports = Service;
