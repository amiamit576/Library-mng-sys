const memberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    membershipDate: {
      type: Date,
      default: Date.now
    }
  });
  
  const Member = mongoose.model('Member', memberSchema);
  module.exports = Member;
  