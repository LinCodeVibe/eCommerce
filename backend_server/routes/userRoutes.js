import express from 'express';
import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const userRoutes = express.Router();

//TODO: redefine expiresIn
const genToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
};

// Login
const loginUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await user.matchPasswords(password))) {
		user.firstLogin = false;
		await user.save();
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.googleImage,
			goodleId: user.googleId,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
			active: user.active,
			firstLogin: user.firstLogin,
			created: user.createdAt,
		});
	} else {
		res.status(401).send('Invalid Email or Password.');
		throw new Error('User not found.');
	}
});

// Register
const registerUser = expressAsyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400).send('The account with the email is already existed.');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	const newToken = genToken(user._id);

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.googleImage,
			googleId: user.googleId,
			firstLogin: user.firstLogin,
			isAdmin: user.isAdmin,
			token: newToken,
			active: user.active,
			createdAt: user.createdAt,
		});
	} else {
		res.status(400).send('We cannot register your account.');
		throw new Error('Something went wrong. Please check your information and try again.');
	}
});

// verify Email

//password_Reset request

// Password reset

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);

export default userRoutes;
