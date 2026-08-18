const authService = require('../services/authService');

const authController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Name, email and password are required' });
            }

            const newUser = await authService.registerUser(name, email, password);

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        } catch (error) {
            console.error('Registration Error:', error);
            if (error.message === 'User already exists') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const { user, token } = await authService.loginUser(email, password);

            res.cookie('jwtToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                path: '/'
            });

            res.status(200).json({
                message: 'User authenticated',
                token: token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error('Login Error:', error);
            if (error.message === 'Invalid email or password') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    logout: (req, res) => {
        try {
            res.clearCookie('jwtToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                path: '/'
            });
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Logout Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = authController;
