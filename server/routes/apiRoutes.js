const { Router } = require('express');
const getAllWears = require('../controllers/getAllWears');
const getWearById = require('../controllers/getWearById');
const getProfile = require('../controllers/getProfile');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/wears', getAllWears);

router.get('/wear/:id', getWearById);

router.get('/profile', authMiddleware, getProfile);

module.exports = router;
