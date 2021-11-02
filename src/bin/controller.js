const { query } = require('express');
const pool = require('../../db');
const queries = require('./queries');

// Products

const getProducts = (req, res) => {
    pool.query(queries.getProducts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getProductById = (req, res) => {
    const id = req.body.id;
    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) throw error;
        if (results.rows[0]) {
            res.status(200).json(results.rows);
        } else {
            res.status(200).send('That id does\'t exist in the database.');
        }
        
    })
}

const addProduct = (req, res) => {
    const { name, category, season, year, color, size, price, amount } = req.body;
    pool.query(queries.addNewProduct, [name, category, season, year, color, size, price, amount], (error, results) => {
        if (error) throw error;
        res.status(201).send('Product added successfully');
    });
}

const removeProduct = (req, res) => {
    const id = req.body.id;
    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) throw error;
        if (results.rows[0]){
            pool.query(queries.removeProduct, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send('Product deleted from the database');
            })
        } else {
            res.send('Product doesn\'t exist in the database.')
        }
    })
}

const updateProduct = (req, res) => {
    const { id, color, size, price } = req.body;
    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) throw error;
        const chosenProduct = results.rows[0];
        if (chosenProduct) {
            pool.query(queries.updateProudct, [id, color, size, price], (error, results) => {
                if (error) throw error;
                res.status(200).send('Product updated in the database');
            })
        } else {
            res.send('Product not found in the database');
        }
    })
}

// Users

const getUser = (req, res) => {
    const { email, password } = req.body;
    pool.query(queries.getUser, [email], (error, results) => {
        if (error) throw error;
        if (results.rows[0]) {
            console.log(results.rows[0].password);
            if (results.rows[0].password === password) {
                res.status(200).send('You have successfully logged in');
            } else {
                res.status(200).send('The password is wrong.');
            }
        } else {
            res.status(404).send('Either the email or the password are wrong');
        }
    })
}

const addNewUser = (req, res) => {
    const { user_name, password, email, birth_date } = req.body;
    pool.query(queries.emailExists, [email], (error, results) => {
        if (error) throw error;
        if (results.rows[0]) {
            res.send('Email already exists in the database');
        } else {
            pool.query(queries.addNewUser, [user_name, password, email, "user", birth_date], (error, results) => {
                if (error) throw error;
                res.status(200).send(`User added successfully to the database`);
            })
        }
    })
}

const updateData = (req, res) => {
    const { email, password, birth_date } = req.body;
    pool.query(queries.getUser, [email], (error, results) => {
        if (error) throw error;
        if (results.rows[0]) {
            pool.query(queries.updateData, [email, password, birth_date], (error, results) => {
                if (error) throw error;
                res.status(200).send('Data updated successfully');
            })
        } else {
            res.status(404).send('User not found');
        }
    })
}

const deleteUser = (req, res) => {
    const {email, password} = req.body;
    pool.query(queries.getUser, [email], (error, results) => {
        if (error) throw error;
        if (results.rows[0] && results.rows[0].active === true) {
            pool.query(queries.deleteUser, [email, password], (error, results) => {
                if (error) throw error;
                res.status(200).send('User deleted successfully.');
            })
        } else {
            res.status(200).send('User not found in the database');
        }
    })
}

// Cart

const currentProductsCart = (req, res) => {
    const customer_id = req.params.id;
    pool.query(queries.productsCart, [customer_id], (error, results) => {
        if (error) throw error;
        if (results.rows[0]) {
            res.status(200).json(results.rows[0].cart_products);
        } else {
            res.status(200).send('Your shopping basket is empty');
        }
    })
}

const addProductCart = (req, res) => {
    const { customer_id, product_id } = req.body;
    pool.query(queries.productsCart, [customer_id], (error, results) => {
        if (error) throw error;
        if (results.rows[0]) {
            pool.query(queries.updateCurrentTimeStamp, [customer_id], (error, results) => {
                if (error) throw error;
                pool.query(queries.addProductCart, [customer_id, product_id], (error, results) => {
                    if (error) throw error;
                    res.status(200).send('Product added successfully to the cart');
                })
            })
        } else {
            pool.query(queries.newCart, [customer_id, product_id], (error, results) => {
                if (error) throw error;
                res.status(200).send('Product added successfully to a new cart');
            })
        }
    })
}

const removeProductCart = (req, res) => {
    const { customer_id, product_id } = req.body;
    pool.query(queries.productsCart, [customer_id], (error, results) => {
        if (error) throw error;
        if (results.rows[0]) {
            const currentCart = results.rows[0].cart_products;
            if (currentCart.includes(product_id)){
                const index = currentCart.indexOf(product_id);
                if (index !== -1) {
                currentCart.splice(index, 1);
                }
                pool.query(queries.removeProductCart, [customer_id, currentCart], (error, results) => {
                    if (error) throw error;
                    res.status(200).send('Product successfully removed from the cart');
                })
            } else {
                res.status(200).send('That product wasn\'t in your basket');
            }
        } else {
            res.status(200).send('Your shopping basket is empty');
        }
    })
}

// Checkout
const placeOrder = (req, res) => {
    const customer_id = req.body.customer_id;
    pool.query(queries.productsCart, [customer_id], (error, results) => {
        if (error) throw error;
        if (results.rows[0]) {
            const productsList = results.rows[0].cart_products;
            pool.query(queries.placeOrder, [productsList, customer_id], (error, results) => {
                if (error) throw error;
                res.status(200).send('Order placed successfully');
            })
        } else {
            res.status(200).send('Your shopping basket is empty, you cannot place an order');
        }
    })
}

const cancelOrder = (req, res) => {
    const order_id = req.body.id;
    pool.query(queries.currentOrder, [order_id], (error, results) => {
        if (error) throw error;
        if (results.rows[0] && results.rows[0].active === true) {
            pool.query(queries.cancelOrder, [order_id], (error, results) => {
                if (error) throw error;
                res.send('Your order has been cancelled');
            })
        } else {
            res.status(200).send('There is not an order with that id in the database');
        }
    })
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
    getUser,
    addNewUser,
    updateData,
    deleteUser,
    addProductCart,
    removeProductCart,
    currentProductsCart,
    placeOrder,
    cancelOrder
}