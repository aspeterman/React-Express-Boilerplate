import formidable from 'formidable'
import fs from 'fs'
import Product from '../models/product.model'
import User from '../models/user.model'
import productImage from './../../client/assets/images/noimage.png'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let product = new Product(fields)
        product.postedBy = req.profile
        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        try {
            let result = await product.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const productById = async (req, res, next, id) => {
    try {
        let product = await Product.findById(id).populate('postedBy', '_id name').exec()
        if (!product)
            return res.status('400').json({
                error: "product not found"
            })
        req.product = product
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve product"
        })
    }
}

const listByUser = async (req, res) => {
    try {
        let products = await Product.find({ postedBy: req.profile._id })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listProducts = async (req, res) => {

    try {
        let products = await Product.find({})
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    let product = req.product
    try {
        let deletedProduct = await product.remove()
        res.json(deletedProduct)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + productImage)
}

const like = async (req, res) => {
    try {
        let result = await Product.findByIdAndUpdate(req.body.productId, { $push: { likes: req.body.userId } }, { new: true })
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const unlike = async (req, res) => {
    try {
        let result = await Product.findByIdAndUpdate(req.body.productId, { $pull: { likes: req.body.userId } }, { new: true })
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const comment = async (req, res) => {
    let comment = req.body.comment
    comment.postedBy = req.body.userId
    try {
        let result = await Product.findByIdAndUpdate(req.body.productId, { $push: { comments: comment } }, { new: true })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const addCartProduct = async (req, res, next) => {
    const product = req.body.productId
    const user = req.body.userId
    try {
        await User.findByIdAndUpdate(user, { $push: { cart: product } })
            .populate('cart', '_id name')
            .exec()
        next()
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


const removeCartProduct = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, { $pull: { cart: req.body.productId } })
        next()
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


const uncomment = async (req, res) => {
    let comment = req.body.comment
    try {
        let result = await Product.findByIdAndUpdate(req.body.productId, { $pull: { comments: { _id: comment._id } } }, { new: true })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const search = async (req, res) => {
    const query = {}
    if (req.query.search)
        query.name = { '$regex': req.query.search, '$options': "i" }
    try {
        let products = await Product.find(query)
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const isPoster = (req, res, next) => {
    let isPoster = req.product && req.auth && req.product.postedBy._id == req.auth._id
    if (!isPoster) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

export default {
    listByUser,
    listProducts,
    create,
    productById,
    remove,
    photo,
    defaultPhoto,
    like,
    unlike,
    comment,
    uncomment,
    addCartProduct,
    removeCartProduct,
    search,
    isPoster
}
