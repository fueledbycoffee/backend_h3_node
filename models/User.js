const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId,
      bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;
  
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  displayName: String,
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});

UserSchema.pre('save', function (next) {
  const user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (passwordCandidate, callback) {
  bcrypt.compare(passwordCandidate, this.password, (err, isMatch) => {
    if(err) return callback(err);
    callback(null, isMatch);
  });
}


module.exports = mongoose.model('User', UserSchema);