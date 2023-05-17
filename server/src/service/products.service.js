const { getProductsDB, getProductByIdDB, createProductDB, updateProductDB, deleteProductDB } = require('../repository/products.repository');

async function getProducts() {
  const products = await getProductsDB();
  return products;
}

async function getProductById(id) {
  const products = await getProductByIdDB(id);
  return products;
}
async function createProduct(providerid, price, productname) {
  const products = await createProductDB(providerid, price, productname);
  return products;
}

async function updateProduct(id, providerid, price, productname) {
  const products = await updateProductDB(id, providerid, price, productname);
  return products;
}

async function deleteProduct(id) {
  const products = await deleteProductDB(id);
  return products;
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
