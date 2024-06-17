const express = require("express");
const authmiddleware = require('../middlewares/authmiddleware');
const { getBalance, tranferMoney } = require("../controllers/accountController");
const router = express.Router();

router.route('/balance')
    .all(authmiddleware)
    .get(getBalance)

router.route('/transfer')
    .all(authmiddleware)
    .post(tranferMoney)

    module.exports = router