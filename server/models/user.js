// Importing from Mongoose for creating schemas and models
const { Schema, model } = require("mongoose");
// Importing the bcrypt module for password hashing
const bcrypt = require("bcrypt");

const Project = require('./Project')
const Service = require('./Service');

// Defining the user schema using the Schema constructor
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  isEmployer: {
    type: Boolean,
    required: true,
  },
  profileDescription: {
    type: String,
    default: 'No description yet'
  },
  // The projects field represents the skills associated with the user
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    }
  ],
  // The skills field represents the skills associated with the user
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

// Hashing the password before saving
userSchema.pre("save", async function (next) {
  // Checking if the password field is new or modified
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    // Hashing the password using bcrypt
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  // Comparing the provided password with the hashed password using bcrypt
  return bcrypt.compare(password, this.password);
};

// Creating the User model
const User = model("User", userSchema);

module.exports = User;
