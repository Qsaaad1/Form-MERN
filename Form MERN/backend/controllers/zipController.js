const asyncHandler = require("express-async-handler");
const Zip = require("../models/zipModel");

const zipChecker = asyncHandler(async (req, res) => {
    const { zip } = req.body;
    try {
      const zipExists = await Zip.findOne({ zip });
  
      if (!zipExists) {
        res.status(400).json("Zip Does Not Exist");
      } else {
        res.status(200).json("Zip Exists");
        
      }
    } catch (error) {
      console.error("Error in ZIP check:", error);
      res.status(500).json("Internal Server Error");
    }
  });

module.exports = {
  zipChecker,
};
