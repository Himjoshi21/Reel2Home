const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller")
/*Post /api/food/[protected]*/
router.post('/',foodController.createFood);

module.exports = router;
