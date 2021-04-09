const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const GradeSchema = new Schema({
  score: { type: Number, require },
  subject: { type: String, require },
  student: { type: ObjectId, ref: 'Student'},
  comment: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Grade', GradeSchema);