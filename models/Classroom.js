const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const ClassroomSchema = new Schema({
  name: { type: String, require },
  students: [{ type: ObjectId, ref: 'Student'}],
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Classroom', ClassroomSchema);