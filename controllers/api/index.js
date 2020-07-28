const router = require("express").Router();
const burgerRoutes = require("./burger");

// Book routes
router.use("/burger", burgerRoutes);

module.exports = router;
