/* eslint-disable no-undef */
/*/ eslint-disable no-unused-vars */
    const express=require('express')
    const authMiddleware=require('../middlewares/auth.middleware')
    const showController=require('../controllers/show.controller')
    const bookingController=require('../controllers/booking.controller')
    
const multer = require('multer')
    const upload=multer({storage:multer.memoryStorage()})

    const router=express.Router();

    router.post('/shows',authMiddleware.authUser,authMiddleware.authAdmin,upload.single('theatrePoster'),showController.createShows)

    router.post('/shows/booking',authMiddleware.authUser,bookingController.createBooking)
    router.get('/shows/single/:id',showController.getSingleShow)
    router.get('/shows/:id',showController.getShows)
router.get(
  "/my-bookings/:userId",
  bookingController.getMyBookings
);
    // Booking Routes here





    module.exports=router;
