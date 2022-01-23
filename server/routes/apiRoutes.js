const { Router } = require('express');
const getAllWears = require('../controllers/getAllWears');
const getWearById = require('../controllers/getWearById');
const getProfile = require('../controllers/getProfile');
const postCheckout = require('../controllers/postCheckout');
const postAddWear = require('../controllers/postAddWear');
const getOrders = require('../controllers/getOrders');
const deleteWear = require('../controllers/deleteWear');
const wearController = require('../controllers/wearController');
//middleтвари
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = Router();

router.get('/wears', getAllWears);

router.get('/wear/:id', getWearById);

router.get('/profile', authMiddleware, getProfile);

router.post('/checkout', authMiddleware, postCheckout);

router.post('/addwear', roleMiddleware(['ADMIN']), postAddWear);

router.get('/orders', roleMiddleware(['ADMIN']), getOrders);

router.delete('/wear/delete/:id', roleMiddleware(['ADMIN']), deleteWear);

router.use('/wear', wearController);

module.exports = router;
