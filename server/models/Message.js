const { Schema, model } = require("mongoose");

// Creating a schema for the Message model using the Schema constructor
const messageSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],

  //   dateSent: {
  //     type: Date,
  //     default: Date.now,
  //   },

  dateSent: {
    type: String,
    required: true,
  },
});

// Creating the Message model using the messageSchema
const Message = model("Message", messageSchema);

// Exporting the Message model
module.exports = Message;
