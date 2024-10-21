const { z } = require('zod');

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, "Password too short")
});

const data = {
  email: "lrodrigues@ifsp.edu.br",
  password: "minhasenha"
};

try {
  schema.parse(data);
  console.log('Data is valid');
} catch (error) {
  console.log(error.errors);
}