const { Router } = require('express');
const getAllWears = require('../controllers/functions/getAllWears');
const getWearById = require('../controllers/functions/getWearById');
const getProfile = require('../controllers/functions/getProfile');
const postCheckout = require('../controllers/functions/postCheckout');
const postAddWear = require('../controllers/functions/postAddWear');
const getOrders = require('../controllers/functions/getOrders');
const deleteWear = require('../controllers/functions/deleteWear');
const wearController = require('../controllers/wearController');
//middleтвари
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = Router();

//functions old я был тупой и совершал ошибки
router.get('/wears', getAllWears);

router.get('/wear/:id', getWearById);

router.get('/profile', authMiddleware, getProfile);

router.post('/checkout', authMiddleware, postCheckout);

router.post('/addwear', roleMiddleware(['ADMIN']), postAddWear);

router.get('/orders', roleMiddleware(['ADMIN']), getOrders);

router.delete('/wear/delete/:id', roleMiddleware(['ADMIN']), deleteWear);

//так лучше делать, вылелять роутер для отдельных сущностей
router.use('/wear', wearController);

module.exports = router;
