const Product = require('../models/Product');

module.exports = {
  async store(req, res) {
    const id = req.userId;
    const { name, description, price } = req.body;
    //const { filename } = req.file;

    const product = await Product.create({ name, description, price, user_id: id });

    return res.json(product);
  }
};