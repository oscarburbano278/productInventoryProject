// backend/src/dtos/product.dto.js

// DTO de Salida: Define la estructura del objeto que se envía al cliente
const ProductDto = (product) => {
  if (!product) return null;
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    stock: product.stock,
  };
};

const ProductListDto = (products) => {
  if (!products || !Array.isArray(products)) return [];
  return products.map(product => ProductDto(product));
};

// DTO de Entrada: Define y valida los datos que se reciben del cliente

const CreateProductDto = (data) => {
  const { name, price, description, stock } = data;

  // Validaciones del DTO de creación
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Validation Error: El nombre es obligatorio y debe ser un texto.');
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Validation Error: El precio debe ser un número mayor a 0.');
  }
  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    throw new Error('Validation Error: El stock debe ser un número igual o mayor a 0.');
  }

  return { name, description, price, stock };
};

const UpdateProductDto = (data) => {
  const { name, price, stock } = data;

  // Validaciones del DTO de actualización
  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    throw new Error('Validation Error: El nombre debe ser un texto válido.');
  }
  if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
    throw new Error('Validation Error: El precio debe ser un número mayor a 0.');
  }
  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    throw new Error('Validation Error: El stock debe ser un número igual o mayor a 0.');
  }

  // Devolver solo los campos que tienen un valor definido para la actualización
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (price !== undefined) updateData.price = price;
  if (stock !== undefined) updateData.stock = stock;

  return updateData;
};

module.exports = {
  ProductDto,
  ProductListDto,
  CreateProductDto,
  UpdateProductDto
};