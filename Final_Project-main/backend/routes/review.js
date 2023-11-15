// reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('./reviewController'); // Sesuaikan dengan path file controller Anda

// Endpoint untuk mendapatkan semua ulasan
router.get('/reviews', reviewController.getAllReviews);

// Endpoint untuk menambahkan ulasan baru
router.post('/reviews', reviewController.addReview);

module.exports = router;
