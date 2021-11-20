const { Router } = require('express');
const getAllWears = require('../controllers/getAllWears');
const getWearById = require('../controllers/getWearById');

const router = Router();

router.get('/wears', getAllWears);

router.get('/wear/:id', getWearById);

module.exports = router;
