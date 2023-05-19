const App = require('./src/app');
const CustomerRoute = require('./src/routes/customer.route');
const ProviderRoute = require('./src/routes/customer.route');

const app = new App([new CustomerRoute(), new ProviderRoute()]);

app.listen();