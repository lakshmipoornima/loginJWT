const express=require('express')
const router=express.Router()
const controller=require('../controllers/userController');
const { validateToken } = require('../middlewares/JWT');

router.route('/create').post(controller.createUser);
router.route('/login').post(controller.loginUser);
router.route('/home').get(validateToken,controller.getHome)


module.exports=router;