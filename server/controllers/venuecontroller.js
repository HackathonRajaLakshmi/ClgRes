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
        id:data.id,
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

  const editVenue = async (req, res) => {
    const { id } = req.params; 
    const { Vimage, Vname, VType, VRating } = req.body; 
  
    
    if (!Vimage || !Vname || !VType || !VRating) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {

      const updatedVenue = await Vdata.findByIdAndUpdate(
        id,
        { Vimage, Vname, VType, VRating },
        { new: true } 
      );
  
      if (!updatedVenue) {
        return res.status(404).json({ message: "Venue not found" });
      }
  

      return res.status(200).json({ message: "Venue updated successfully", updatedVenue });
  
    } catch (error) {

      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  

  const removeVenue = async (req, res) => {
    const { name } = req.params; 
  
    try {
      const deletedVenue = await Vdata.findOneAndDelete({ Vname: name }); 
      if (!deletedVenue) {
        return res.status(404).json({ message: "Venue not found" });
      }
      return res.status(200).json({ message: "Venue removed successfully" });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
module.exports = { Vget, VPut ,editVenue,removeVenue};
