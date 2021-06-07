import express from 'express'
import authCtrl from '../controllers/auth.controller'
import productCtrl from '../controllers/product.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/products/new/:userId')
    .post(authCtrl.requireSignin, productCtrl.create)

router.route('/api/products/photo/:productId')
    .get(productCtrl.photo)

router.route('/api/products/defaultphoto')
    .get(productCtrl.defaultPhoto)

router.route('/api/products/by/:userId')
    .get(authCtrl.requireSignin, productCtrl.listByUser)

router.route('/api/products')
    .get(productCtrl.listProducts)

router.route('/api/products/like')
    .put(authCtrl.requireSignin, productCtrl.like)
router.route('/api/products/unlike')
    .put(authCtrl.requireSignin, productCtrl.unlike)

router.route('/api/products/comment')
    .put(authCtrl.requireSignin, productCtrl.comment)
router.route('/api/products/uncomment')
    .put(authCtrl.requireSignin, productCtrl.uncomment)

router.route('/api/products/:productId')
    .delete(authCtrl.requireSignin, productCtrl.isPoster, productCtrl.remove)

router.route('/api/products/addCart')
    .put(authCtrl.requireSignin, productCtrl.addCartProduct)

router.route('/api/products/removecart')
    .put(authCtrl.requireSignin, productCtrl.removeCartProduct)

router.param('userId', userCtrl.userByID)
router.param('postId', productCtrl.productById)

export default router
