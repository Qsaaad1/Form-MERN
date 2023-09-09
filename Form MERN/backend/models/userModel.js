const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  country: {
    type: String,
  },
  region: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  zip: {
    type: String,
  },
});

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },

    companyEmail: {
      type: String, // Add the "company email" field
      // unique: true, // Assuming company emails should also be unique
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    about: {
      type: String,
    },
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    gender: {
      type: String,
    },

    phoneNumbers: [
      {
        type: String, // Assuming phone numbers are stored as strings
        // Add any other validation rules you need
      },
    ],

    userData: [addressSchema],
  },
  {
    timestamps: true,
  }
);

/////////////////////////////////////////////////////////////////////

const User = mongoose.model("User", userSchema);
module.exports = User;
