const { Schema, model, Types } = require("mongoose");

// Creating a schema for the Message model using the Schema constructor
const messageSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  dateSent: {
    type: String,
    required: true,
    default: Date.now,
  },
});

// Creating the Message model using the messageSchema
const Message = model("Message", messageSchema);

// Exporting the Message model
module.exports = Message;
