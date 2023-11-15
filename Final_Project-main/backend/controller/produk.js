const ProductModel = require('../models/produk');
const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the filename
    },
});

const upload = multer({ storage });

const getProductsById = (req, res) => {
    const id = req.params.id;
    ProductModel.getProductsById(id, (err, data) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json({ data });
    });
};

const getProducts = (req, res) => {
    ProductModel.getProducts((err, data) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(200).json({ data });
    });
};

const addProduct = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // Multer has saved the file to req.file
        const product = {
            nama: req.body.nama,
            kategori_diamond: req.body.kategori_diamond,
            harga: req.body.harga,
            keterangan: req.body.keterangan,
            image: req.file ? req.file.path : null, // Save the file path to the database
        };

        ProductModel.addProduct(product, (err, data) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(201).json({ data });
        });
    });
};

module.exports = {
    getProducts,
    getProductsById,
    addProduct
};
