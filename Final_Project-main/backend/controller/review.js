// reviewController.js

// Simpan data ulasan sementara
let reviews = [];

// Menambahkan ulasan baru
exports.addReview = (req, res) => {
  const { productId, username, rating, comment } = req.body;

  // Validasi input
  if (!productId || !username || !rating || !comment) {
    return res.status(400).json({ error: 'Harap lengkapi semua bidang ulasan.' });
  }

  // Simpan ulasan baru
  const newReview = {
    productId,
    username,
    rating,
    comment,
    timestamp: new Date().toISOString(),
  };

  reviews.push(newReview);

  res.status(201).json({ message: 'Ulasan berhasil ditambahkan.', review: newReview });
};

// Mendapatkan semua ulasan
exports.getAllReviews = (req, res) => {
  res.json(reviews);
};
