const jwt = require('jsonwebtoken');

const generateAuthToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
    return token;
};

const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = {
    authenticate,
    generateAuthToken
};
