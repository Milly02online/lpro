const { z } = require('zod');

const registerSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	username: z.string().min(1, { message: 'Username is required' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
	email: z.string().email({ message: 'Invalid email address' }).optional(),
	phone: z.string().min(8, { message: 'Phone number must be at least 8 characters long' }).optional(),
	role: z.enum(['STAFF', 'ADMINISTRATOR']).optional(),
});

module.exports = { registerSchema };
