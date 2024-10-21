const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authorization = (allowedRoles = []) => {
	return async (req, res, next) => {
		const userId = req.user.id;

		try {
			const user = await prisma.user.findUnique({ where: { id: userId } });

			if (!user) {
				return res.status(403).json({ message: 'User not found.' });
			}

			if (!allowedRoles.includes(user.role)) {
				return res.status(403).json({
					message: 'Access denied: you do not have permission to access this resource.',
				});
			}

			next();
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	};
};

module.exports = { authorization };
