// backend/src/controllers/auth.controller.js
const authService = require('../services/auth.service');
const { RegisterUserDto, LoginUserDto } = require('../dtos/auth.dto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Clave secreta para firmar los tokens
const JWT_SECRET = process.env.JWT_SECRET || 'mi-clave-secreta';

exports.register = async (req, res) => {
  try {
    const userData = RegisterUserDto(req.body);
    const newUser = await authService.registerUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message.includes('Validation Error')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = LoginUserDto(req.body);
    const user = await authService.loginUser(email);

    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Si las credenciales son correctas, crear un token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    const { password: userPassword, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    if (error.message.includes('Validation Error')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
};