const App = require('./src/app');
const CustomerRoute = require('./src/routes/customer.route');
const ProviderRoute = require('./src/routes/provider.route');
const ProductRoute = require('./src/routes/product.route');
const SaleController = require('./src/routes/sale.route');

const app = new App([new CustomerRoute(), new ProviderRoute(), new ProductRoute(), new SaleController()]);

app.listen();
