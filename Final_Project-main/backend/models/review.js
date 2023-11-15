// reviewModel.js

// Jika aplikasi berkembang, disarankan untuk menggunakan database seperti MongoDB, MySQL, dll.

// Tetapi untuk tujuan contoh, kita akan menyimpan data ulasan sementara di memori.

let reviews = [];

// Fungsi untuk mendapatkan semua ulasan
exports.getAllReviews = () => {
  return reviews;
};

// Fungsi untuk menambahkan ulasan baru
exports.addReview = (newReview) => {
  reviews.push(newReview);
};
