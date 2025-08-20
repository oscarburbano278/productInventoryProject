// backend/src/dtos/auth.dto.js

// DTO para el registro de usuario
const RegisterUserDto = (data) => {
  const { name, email, password } = data;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Validation Error: El nombre es obligatorio.');
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new Error('Validation Error: El correo electrónico no es válido.');
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    throw new Error('Validation Error: La contraseña debe tener al menos 6 caracteres.');
  }
  return { name, email, password };
};

// DTO para el inicio de sesión
const LoginUserDto = (data) => {
  const { email, password } = data;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new Error('Validation Error: El correo electrónico no es válido.');
  }
  if (!password || typeof password !== 'string' || password.trim() === '') {
    throw new Error('Validation Error: La contraseña es obligatoria.');
  }
  return { email, password };
};

module.exports = {
  RegisterUserDto,
  LoginUserDto,
};