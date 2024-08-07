import express from 'express';
import User from '../models/User.js';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';

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

	sendVerificationEmail(newToken, email, name);

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
const verifyEmail = asyncHandler(async (req, res) => {
	const token = req.headers.authorization.spilt(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await User.findById(decoded.id);

		if (user) {
			user.action = true;
			await user.save();
			res.json('Thanks for activating your account. You can close this windows now.');
		} else {
			res.status(404).send('User not found.');
		}
	} catch (error) {
		res.status(401).send('Email address could not be verified.');
	}
});

//password_Reset request
const passwordResetRequest = asyncHandler(async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email: email });

		if (user) {
			const newToken = genToken(user._id);
			sendPasswordResetEmail(newToken, user.email, user.name);
			res.status(200).send(`We have send you a recover email to ${email}`);
		}
	} catch (error) {
		res.status(401).send('There is not account with such an email address');
	}
});

// Password reset
const passwordReset = asyncHandler(async (req, res) => {
	const token = req.headers.authorization.spilt(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await User.findById(decoded.id);

		if (user) {
			user.password = req.body.password;
			await user.save();
			res.json('Your password has been updated sucessfully.');
		} else {
			res.status(404).send('User not found.');
		}
	} catch (error) {
		res.status(401).send('Password reset failed.');
	}
});

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/verify-email').get(verifyEmail);
userRoutes.route('/password-reset-request').past(passwordResetRequest);
userRoutes.route('/password-reset').post(passwordReset);

export default userRoutes;
