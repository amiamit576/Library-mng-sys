const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true,'username  is  required '],
      lowercase:true,
      trim:true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'librarian','user'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;
  