const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        const product = await Product.findAll();
        
        return res.json(product);
    }
};