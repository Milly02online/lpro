const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { authentication } = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const { loginSchema } = require('../schemas/auth');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
	try {
		const result = loginSchema.safeParse(req.body);
		if (!result.success) {
			return res.status(400).json({ errors: result.error.errors });
		}

		const { username, password } = result.data;

		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.status(200).json({ message: 'Login successful', token });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: error.message });
	}
});

router.post('/logoff', (req, res) => {
	res.status(501).json({ message: 'Not Implemented' });
});

router.get('/public-resource', (req, res) => {
	res.status(200).json({ message: 'Access granted to public resource' });
});

router.get('/token-protected-resource', authentication, (req, res) => {
	try {
		res.status(200).json({ message: 'Access granted to protected resource', user: req.user });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: error.message });
	}
});

router.get(
	'/role-protected-resource',
	authentication,
	authorization(['ADMINISTRATOR']),
	(req, res) => {
		try {
			res.status(200).json({
				message: 'Access granted to protected resource',
				user: req.user,
			});
		} catch (error) {
			console.error(error);
			res.status(400).json({ message: error.message });
		}
	}
);

module.exports = router;
