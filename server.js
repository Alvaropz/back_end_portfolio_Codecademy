const express = require('express');
const morgan = require('morgan');
const productsRoutes = require('./src/routes/routesProducts');
const usersRoutes = require('./src/routes/routesUsers');
const cartRoutes = require('./src/routes/routesCart');
const checkoutRoutes = require('./src/routes/routesCheckout');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send('This is the Homepage')
})
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Starting up the server
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});