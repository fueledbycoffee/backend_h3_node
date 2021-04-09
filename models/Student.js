const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;
  
const StudentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, require: true, unique: true },
  comments : [{
    title: String,
    content: String,
    Author: String
  }],
  dateOfBirth: Date,
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});

module.exports = mongoose.model('Student', StudentSchema);