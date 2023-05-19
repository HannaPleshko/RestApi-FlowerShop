const App = require('./src/app');
const CustomerRoute = require('./src/routes/customer.route');
const ProviderRoute = require('./src/routes/provider.route');
const ProductRoute = require('./src/routes/product.route');

const app = new App([new CustomerRoute(), new ProviderRoute(), new ProductRoute()]);

app.listen();