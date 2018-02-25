const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'parent'
  },
  title: String,
  content: String
});

const Post = mongoose.model('post', PostSchema);
module.exports = {
  Post
};
