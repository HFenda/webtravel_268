const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

router.get('/history', isAuthenticated, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.session.user._id }).populate('trip');
        res.render('user/history', { bookings });
    } catch (error) {
        console.error('Error fetching booking history:', error);
        res.status(500).send('An error occurred while fetching booking history.');
    }
});

router.get('/trips/:tripId/question', isAuthenticated, async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.tripId);
        res.render('user/question', { trip });
    } catch (error) {
        console.error('Error fetching trip details:', error);
        res.status(500).send('An error occurred while fetching trip details.');
    }
});

router.post('/trips/:tripId/question', isAuthenticated, async (req, res) => {
    const { question } = req.body;
    try {
        await Trip.findByIdAndUpdate(req.params.tripId, { $push: { questions: { body: question, user: req.session.user.username, date: new Date() } } });
        res.redirect('/trips/' + req.params.tripId);
    } catch (error) {
        console.error('Error posting a question:', error);
        res.status(500).send('An error occurred while posting your question.');
    }
});

module.exports = router;