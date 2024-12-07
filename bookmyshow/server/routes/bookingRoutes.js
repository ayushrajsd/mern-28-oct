const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const EmailHelper = require("../utils/emailHelper");

router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Booking for movie tickets",
      confirm: true,
    });
    const transactionId = paymentIntent.id;
    res.send({
      success: true,
      message: "Payment successful",
      data: transactionId,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    // add booking in database
    const newBooking = new Booking(req.body);
    await newBooking.save();

    // update booked seats in show
    const show = await Show.findById(req.body.show).populate("movie");
    const updatedSeats = [...show.bookedSeats, ...req.body.seats];
    const updatedShow = await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedSeats,
    });
    // trigger email to user
    // adding more detauls to the booking email
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    console.log("this is populated booking", populatedBooking);
    await EmailHelper("tickets.html", populatedBooking.user.email, {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.name,
      theatre: populatedBooking.show.theatre.name,
      date: populatedBooking.show.date,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.price,
      transactionId: populatedBooking.transactionId,
    });

    res.send({
      success: true,
      message: "Booking successful",
      data: populatedBooking,
      uodatedShow: updatedShow,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.get("/get-all-bookings/:userId", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched!",
      data: bookings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
