// backend/src/services/auth.service.js
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const registerUser = async (userData) => {
  // 1. Hashear la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // 2. Crear el usuario en la base de datos
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    },
  });

  // 3. Devolver un objeto sin la contraseña para no exponerla
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const loginUser = async (email) => {
  // 1. Buscar el usuario por su email
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

module.exports = {
  registerUser,
  loginUser,
};