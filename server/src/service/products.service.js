const { getProductsDB, getProductByIdDB, createProductDB, updateProductDB, deleteProductDB } = require('../repository/products.repository');

async function getProducts() {
  const products = await getProductsDB();
  if (!products.length) throw new Error('products DB is empty');
  return products;
}

async function getProductById(id) {
  const products = await getProductByIdDB(id);
  if (!products.length) throw new Error('products DB is empty');
  return products;
}
async function createProduct(providerId, price, productName) {
  const products = await createProductDB(providerId, price, productName);
  if (!products.length) throw new Error('products DB is empty');
  return products;
}

async function updateProduct(id, providerId, price, productName) {
  const products = await updateProductDB(id, providerId, price, productName);
  if (!products.length) throw new Error('products DB is empty');
  return products;
}

async function deleteProduct(id) {
  const products = await deleteProductDB(id);
  if (!products.length) throw new Error('products DB is empty');
  return products;
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
