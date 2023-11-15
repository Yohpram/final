const pool = require('../config/config');

const getProductsById = (id, callback) => {
    pool.query(`SELECT * FROM produk WHERE id = $1`, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results.rows);
    });
};

const getProducts = (callback) => {
    pool.query('SELECT * FROM produk', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results.rows);
    });
};

const addProduct = (product, callback) => {
    const { nama, kategori_diamond, harga, keterangan, image } = product;
    pool.query(
        'INSERT INTO produk (nama, kategori_diamond, harga, keterangan, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nama, kategori_diamond, harga, keterangan, image],
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results.rows[0]);
        }
    );
};

module.exports = {
    getProducts,
    getProductsById,
    addProduct
};

