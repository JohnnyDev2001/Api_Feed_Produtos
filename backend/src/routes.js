const express = require('express')
const authMiddleware = require('./middlewares/auth');

const ProfileController = require("../src/controllers/ProfileController"); 
const ProductController = require("../src/controllers/ProductController");
const FeedController = require("../src/controllers/FeedController"); 

const routes = express.Router();

routes.use(authMiddleware);

routes.get("/perfil", ProfileController.show);
routes.put("/perfil", ProfileController.update);

routes.post("/product", ProductController.store);

routes.get("/feed", FeedController.show);

module.exports = routes;