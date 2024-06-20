const express = require('express');
const { listTransactions, getStatisticsByMonth, getBarChartData, getPieChartData, getCombinedData } = require('../controllers/productController');
const router = express.Router();

router.route('/transactions').get(listTransactions);
router.route('/statistics').get(getStatisticsByMonth);
router.route('/bar-chart').get(getBarChartData);
router.route('/pie-chart').get(getPieChartData);
router.route('/combined').get(getCombinedData);

module.exports = router;
