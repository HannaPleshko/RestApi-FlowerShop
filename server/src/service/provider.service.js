const { getProviderDB, getProviderByIdDB, createProviderDB, updateProviderDB, deleteProviderDB } = require('../repository/provider.repository');

async function getProvider() {
  const provider = await getProviderDB();
  return provider;
}

async function getProviderById(id) {
  const provider = await getProviderByIdDB(id);
  return provider;
}

async function createProvider(providername) {
  const provider = await createProviderDB(providername);
  return provider;
}

async function updateProvider(id, providername) {
  const provider = await updateProviderDB(id, providername);
  return provider;
}

async function deleteProvider(id) {
  const provider = await deleteProviderDB(id);
  return provider;
}

module.exports = { getProvider, getProviderById, createProvider, updateProvider, deleteProvider };
