const getProducts = "SELECT * FROM products";
const getProductById = "SELECT * FROM products WHERE id = $1";
const addNewProduct = "INSERT INTO products (name, category, season, year, color, size, price, amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const removeProduct = "DELETE FROM products WHERE id = $1";
const updateProudct = "UPDATE products SET color = $2, size = $3, price = $4 WHERE id = $1";

const getUser = "SELECT * FROM users WHERE email = $1";
const addNewUser = "INSERT INTO users (user_name, password, email, user_permissions, birth_date) VALUES ($1, $2, $3, $4, $5)";
const emailExists = "SELECT * FROM users WHERE email = $1";
const updateData = "UPDATE users SET password = $2, birth_date =$3 WHERE email = $1";
const deleteUser = "UPDATE users SET active = 'false' WHERE email = $1 AND password = $2";

const productsCart = "SELECT cart_products FROM cart WHERE customer_id = $1 AND ref_time > now() - interval '10 minute'";
const updateCurrentTimeStamp = "UPDATE cart SET ref_time = now() WHERE customer_id = $1 AND ref_time > now() - interval '10 minute'";
const addProductCart = "UPDATE cart SET cart_products = array_append(cart_products, $2) WHERE customer_id = $1 AND ref_time > now() - interval '10 minute'";
const newCart = "INSERT INTO cart (customer_id, cart_products, ref_time) VALUES ($1, ARRAY[$2::numeric], now())";
const removeProductCart = "UPDATE cart SET cart_products = $2 WHERE customer_id = $1 AND ref_time > now() - interval '10 minute'";

const currentOrder = "SELECT * FROM orders WHERE id = $1 ORDER BY date";
const placeOrder = "INSERT INTO orders (products, customer_id, date) VALUES ($1, $2, now())";
const cancelOrder = "UPDATE orders SET active = 'false' WHERE id = $1";

module.exports = {
    getProducts,
    getProductById,
    addNewProduct,
    removeProduct,
    updateProudct,
    getUser,
    addNewUser,
    emailExists,
    updateData,
    deleteUser,
    productsCart,
    updateCurrentTimeStamp,
    addProductCart,
    newCart,
    removeProductCart,
    currentOrder,
    placeOrder,
    cancelOrder
};