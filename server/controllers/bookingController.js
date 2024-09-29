const bookings = require('../models/bookingModel'); 


const PriorityHandler = (booking) => {
    let score = 0;
    
    if (booking.role === "Staff") {
        score += 25;
    } else if (booking.role === "Pg") {
        score += 15;
    } else if (booking.role === "Ug") {
        score += 10;
    }
    
    if (booking.urge === "High") {
        score += 15;
    } else if (booking.urge === "Mid") {
        score += 10;
    } else if (booking.urge === "Low") {
        score += 5;
    }
    
    return score;
};

const booking = async (req, res) => {
    const { Vname, VType, date, bookingTime, endTime, urge, role, score } = req.body;

    try {
        console.log(req.body);

        const bookingStartTime = new Date(`${date} ${bookingTime}`);
        const bookingEndTime = new Date(`${date} ${endTime}`);

        const newBooking = { 
            Vimage,
            Vname, 
            VType, 
            date,
            bookingTime: bookingStartTime, 
            endTime: bookingEndTime, 
            urge, 
            role, 
            score: req.body.score || PriorityHandler({ role, urge })
        };

        const conflictingBooking = await bookings.findOne({
            "booking.VType": VType,  
            $or: [ 
                { 
                    "booking.bookingTime": { $lt: bookingEndTime }, 
                    "booking.endTime": { $gt: bookingStartTime }
                }
            ]
        });

        if (conflictingBooking) {
            const existingBookingIndex = conflictingBooking.booking.findIndex(b => 
                b.VType === VType &&
                (new Date(b.bookingTime) < new Date(bookingEndTime) && new Date(b.endTime) > new Date(bookingStartTime))                
            );

            if (existingBookingIndex !== -1) {
                await conflictingBooking.save(); 
                let exUser = await bookings.findOne({ email: req.user.email });
                if (!exUser) {
                    exUser = new bookings({
                        email: req.user.email,
                        booking: [newBooking]
                    });
                } else {
                    exUser.booking.push(newBooking);
                }
                const savedBookings = await exUser.save();
                console.log("Saved Bookings:", savedBookings);
                
                return res.status(200).json({
                    msg: "Successfully replaced previous booking and added new booking!",
                    savedBookings
                });
            } else {
                return res.status(400).json({
                    msg: "This resource is already booked during the selected time with a higher priority.",
                    existingBooking: conflictingBooking.booking[existingBookingIndex]
                });
            }
        } else {
            let exUser = await bookings.findOne({ email: req.user.email });

            if (!exUser) {
                exUser = new bookings({
                    email: req.user.email,
                    booking: [newBooking]
                });
            } else {
                exUser.booking.push(newBooking);
            }

            const savedBookings = await exUser.save();
            console.log("Saved Bookings:", savedBookings);
            
            return res.status(200).json({
                msg: "Successfully added the booking!",
                savedBookings
            });
        }

    } catch (err) {
        console.error("Error in booking:", err);
        res.status(500).json({
            msg: "Server Error",
            error: err.message
        });
    }
};

const ShowCart = async (req, res) => {
    try {
        const Data = await bookings.findOne({ email: req.user.email }).exec();
<<<<<<< HEAD

=======
>>>>>>> 9767b45825e17ca28eec06288ecbbfa08912c7ed
        console.log("Booking Data:", Data);

        if (!Data) {
            return res.status(404).json({
                Msg: "No bookings found for this user.",
            });
        }
        if (!Data.booking || Data.booking.length === 0) {
            return res.status(204).json({
                Msg: "No bookings available.",
                retData: [],
            });
        }

        const retData = Data.booking.map(data => ({
            Vimage:data.Vimage,
            Vname: data.Vname,
            VType: data.VType,
            date: data.date,
            bookingTime: data.bookingTime,
            endTime: data.endTime,
            urge: data.urge,
            score: data.score,
        }));
        console.log("Formatted Booking Data:", retData);

        res.status(200).json({
            Msg: "Bookings retrieved successfully.",
            retData,
        });
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({
            Msg: "Server Error",
            error: err.message,
        });
    }
};



module.exports = { booking,ShowCart};
