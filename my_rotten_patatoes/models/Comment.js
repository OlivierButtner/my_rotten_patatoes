// models/User.js

import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    

    movie_id: String,
    user_id: String,
    content: String,
})
CommentSchema.set('timestamps',true);

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)