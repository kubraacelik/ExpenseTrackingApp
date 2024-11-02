const { addIncome } = require("../controllers/income");

const router = require("express").Router(); // Express.js kütüphanesinden bir Router nesnesi oluşturur.

router.post("/add-income",addIncome);

module.exports = router;
