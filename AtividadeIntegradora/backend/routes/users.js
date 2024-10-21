const express = require("express");
const router = express.Router();

const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Rota para cadastrar usuário
router.post("/register", async (req, res) => {
  try {
    // Validação dos dados do usuário
    const parsedData = userSchema.parse(req.body);

    // Verifica se o username já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { username: parsedData.username },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    // Criar usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        name: parsedData.name,
        username: parsedData.username,
        password: hashedPassword,
        email: parsedData.email,
        phoneNumber: parsedData.phoneNumber,
        cpf: parsedData.cpf,
        dateOfBirth: parsedData.dateOfBirth
          ? new Date(parsedData.dateOfBirth)
          : null,
      },
    });

    // Retornar o usuário criado (sem a senha)
    const { password, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    // Lidar com erros de validação ou outros erros
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
