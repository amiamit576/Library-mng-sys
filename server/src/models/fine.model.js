import {mongoose,Schema} from "mongoose"

const fineSchema = new mongoose.Schema({
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Loan',
      required: true
    },
    fineAmount: {
      type: Number,
      required: true
    },
    paymentDate: {
      type: Date
    }
  });
  
  const Fine = mongoose.model('Fine', fineSchema);
  module.exports = Fine;
  