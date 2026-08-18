const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');

const authService = {
    registerUser: async (name, email, password) => {
        const existingUser = await userDao.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return await userDao.createUser({
            name,
            email,
            password: hashedPassword
        });
    },

    loginUser: async (email, password) => {
        const user = await userDao.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({
            name: user.name,
            email: user.email,
            _id: user._id
        }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });

        return { user, token };
    }
};

module.exports = authService;
