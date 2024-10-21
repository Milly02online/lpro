const { z } = require("zod");

const userSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(6),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  cpf: z.string().optional(),
  dateOfBirth: z.string().optional(), 
});

module.exports = userSchema;
