const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');
const productRoutes = require('./routes/produk');

app.use(express.json());

app.use('/', userRoutes);
app.use('/', reviewRoutes);
app.use('/', productRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
