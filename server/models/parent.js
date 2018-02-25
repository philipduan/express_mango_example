const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ChildrenSchema } = require('./children');

const ParentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name for the parent']
  },
  description: {
    type: String
  },
  strictnessLevel: {
    type: Number
  },
  children: [ChildrenSchema],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post'
    }
  ]
});

const Parent = mongoose.model('parent', ParentSchema);
module.exports = {
  Parent
};
