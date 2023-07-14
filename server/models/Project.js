// Importing from Mongoose for creating schema
const { Schema, model } = require("mongoose");

// Defining the Project schema using the Schema constructor
const projectSchema = new Schema({
  //name of the project
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  freelancers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dueDate: {
    type: String,
    //  type: Date,
  },
  budget: {
    type: Number,
  },
  servicesNeeded: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

// Creating the Project model
const Project = model("Project", projectSchema);

module.exports = Project;
