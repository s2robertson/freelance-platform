const { Schema, model } = require("mongoose");

// Creating a schema for the Message model using the Schema constructor
const messageSchema = new Schema({
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
  dateSent: {
    type: String,
    required: true,
  },
});

// Creating the Message model using the messageSchema
const Message = model("Message", messageSchema);

// Exporting the Message model
module.exports = Message;
