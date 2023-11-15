const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const { generateAuthToken } = require('../middleware/auth');

class UserController {
    
    static async getAllUser(_, res, next) {
        try {
            const allUsers = await userModel.getAllUser();
            res.status(200).json({ message: "success", data: allUsers });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getUsername(req, res) {
        const { username } = req.params;

        try {
            const user = await userModel.getUsername(username);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'success', data: user });
        } catch (error) {
            console.error('Error getting user by username:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    static async login(req, res) {
        const { email, username, password } = req.body;
        const user = await userModel.getUserByUsernameOrEmail(email || username);

        if (!user) return res.status(400).json({ message: 'User not found.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid username or password.' });

        const token = generateAuthToken({ id: user.id, username: user.username, email: user.email });
        res.header('x-auth-token', token).json({ message: 'Login successful', token: token });
    };

    static async register(req, res) {
        const { email, username, password } = req.body;
    
        const newUser = {
            email,
            username,
            password,
        };
    
        try {
            const user = await userModel.createUser(newUser);
            const loginLink = '/login';
    
            res.status(201).json({
                message: 'Registration successful. Please proceed to login.',
                user,
                loginLink,
            });
        } catch (error) {
            if (error.message === 'Email already in use') {
                return res.status(400).json({ message: 'Email already in use' });
            }
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Registration error' });
        }
    }
    
};
module.exports = UserController;
