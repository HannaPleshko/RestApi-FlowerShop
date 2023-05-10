const { getProviderDB, getProviderByIdDB, createProviderDB, updateProviderDB, deleteProviderDB } = require('../repository/provider.repository');

async function getProvider() {
  const provider = await getProviderDB();
  if (!provider.length) throw new Error('provider DB is empty');
  return provider;
}

async function getProviderById(id) {
  const provider = await getProviderByIdDB(id);
  if (!provider.length) throw new Error('provider DB is empty');
  return provider;
}

async function createProvider(providerName) {
  const provider = await createProviderDB(providerName);
  if (!provider.length) throw new Error('provider DB is empty');
  return provider;
}

async function updateProvider(id, providerName) {
  const provider = await updateProviderDB(id, providerName);
  if (!provider.length) throw new Error('provider DB is empty');
  return provider;
}

async function deleteProvider(id) {
  const provider = await deleteProviderDB(id);
  if (!provider.length) throw new Error('provider DB is empty');
  return provider;
}

module.exports = { getProvider, getProviderById, createProvider, updateProvider, deleteProvider };
