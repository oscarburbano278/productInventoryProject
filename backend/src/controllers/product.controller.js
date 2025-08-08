const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// 1. Importar los DTOs que creaste
const { ProductDto, ProductListDto, CreateProductDto, UpdateProductDto } = require('../dtos/product.dto');

exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    // 2. Usar el DTO de lista para formatear la respuesta
    const productsDto = ProductListDto(products);
    res.json(productsDto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos', details: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    // 3. Usar el DTO para validar y formatear los datos de entrada
    const createProductData = CreateProductDto({ name, description, price, stock });

    const product = await prisma.product.create({
      data: createProductData,
    });

    // 4. Usar el DTO para formatear la respuesta
    const productDto = ProductDto(product);
    res.status(201).json(productDto);
  } catch (error) {
    // Manejar errores de validación del DTO
    if (error instanceof Error && error.message.includes('Validation Error')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error al crear producto', details: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    // 5. Usar el DTO para validar y formatear los datos de entrada
    const updateProductData = UpdateProductDto({ name, description, price, stock });

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: updateProductData,
    });

    // 6. Usar el DTO para formatear la respuesta
    const productDto = ProductDto(product);
    res.json(productDto);
  } catch (error) {
    // Manejar errores de validación del DTO
    if (error instanceof Error && error.message.includes('Validation Error')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error al editar producto', details: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', details: error.message });
  }
};