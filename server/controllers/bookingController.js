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



module.exports = { booking };
