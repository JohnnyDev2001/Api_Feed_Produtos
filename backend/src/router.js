const express = require("express");

const UserController = require("./controllers/UserController");

const router = express.Router();

router.post('/login', UserController.index);
router.post('/cadastro', UserController.store);

module.exports = router;