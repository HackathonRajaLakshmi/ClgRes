const Vdata = require('../models/venueModel');

const VPut = async (req, res) => {
  const { Vimage, Vname, VType, VRating } = req.body;
  try {
    const ExVenue = await Vdata.findOne({ Vname });
    if (ExVenue) {
      return res.status(400).json({
        Msg: "Venue is already added",
        ExVenue
      });
    }
    const AddVenue = await Vdata.create({ Vimage, Vname, VType, VRating });
    if (!AddVenue) {
      return res.status(401).json({
        Msg: "Oops! Something went wrong"
      });
    }
    return res.status(200).json({
      Msg: "Venue added successfully",
      AddVenue
    });

  } catch (err) {
    return res.status(500).json({
      Msg: "Server error",
      error: err.message
    });
  }
};

const Vget = async (req, res) => {
    try {
      const Findvenue = await Vdata.find();
  
      if (Findvenue.length === 0) {
        return res.status(404).json({
          Msg: "No venues found", 
        });
      }
  
      const formattedVenues = Findvenue.map(data => ({
        Vimage: data.Vimage,
        Vname: data.Vname,
        VType: data.VType,
        VRating: data.VRating, 
      }));
  
      return res.status(200).json({
        Msg: "Venues found successfully",
        Findvenue: formattedVenues,
      });
    } catch (err) {
      return res.status(500).json({
        Msg: "Server error",
        error: err.message,
      });
    }
  };
  
module.exports = { Vget, VPut };
