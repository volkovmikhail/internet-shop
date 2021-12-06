const { Router } = require('express');
const getAllWears = require('../controllers/getAllWears');
const getWearById = require('../controllers/getWearById');
const getProfile = require('../controllers/getProfile');
const postCheckout = require('../controllers/postCheckout');
const postAddWear = require('../controllers/postAddWear');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = Router();

router.get('/wears', getAllWears);

router.get('/wear/:id', getWearById);

router.get('/profile', authMiddleware, getProfile);

router.post('/checkout', authMiddleware, postCheckout);

router.post('/addwear', roleMiddleware(['ADMIN']), postAddWear);

module.exports = router;
