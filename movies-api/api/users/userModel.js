import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: { type: String, required: true },
  favorites: [{ type: Number }],
  mustWatch: [{ type: Number }],
  profile: {
      displayName: { type: String, default: '' },
      bio: { type: String, default: '' },
      joinDate: { type: Date, default: Date.now }
  }
});

UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
  } catch (error) {
     next(error);
  }

  } else {
      next();
  }
});

export default mongoose.model('User', UserSchema);