const express = require('express')
const authMiddleware = require('./middlewares/auth');

const ProfileController = require("../src/controllers/ProfileController"); 

const routes = express.Router();

routes.use(authMiddleware);

routes.get("/feed", (req, res) =>{
    return res.json({ msg: "esse é o feed" });
})

routes.get("/perfil", ProfileController.show);
routes.put("/perfil", ProfileController.update);

module.exports = routes;