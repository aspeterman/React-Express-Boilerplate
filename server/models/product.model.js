import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Text is required'
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String
    },
    stock: {
        type: Number
    },
    category: {
        type: String
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    comments: [{
        text: String,
    }],
}, {
    timestamps: true
})

export default mongoose.model('Shop', ProductSchema)
