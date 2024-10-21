const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const { registerSchema } = require('../schemas/user');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
	try {
		const result = registerSchema.safeParse(req.body);
		if (!result.success) {
			return res.status(400).json({ errors: result.error.errors });
		}

    const { name, username, password, email, phone, role } = result.data;

		const existingUser = await prisma.user.findUnique({ where: { username } });
		if (existingUser) {
			return res.status(400).json({ message: 'Username already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const data = {
			name,
			username,
			password: hashedPassword,
			email,
      phone,
      role
		};
		const newUser = await prisma.user.create({ data });

		delete newUser.password;

		res.status(201).json({ message: 'User registered successfully', user: newUser });
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
