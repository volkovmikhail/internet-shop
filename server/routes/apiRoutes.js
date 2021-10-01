const { Router } = require('express');
const getAllWears = require('../controllers/getAllWears');

const router = Router();

router.get('/wears', getAllWears);

module.exports = router;
