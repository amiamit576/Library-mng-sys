import {mongoose,Schema} from 'mongoose'

const publisherSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    phone: {
      type: String
    }
  },{
    timestamps: true,
  });
  
  const Publisher = mongoose.model('Publisher', publisherSchema);
export default Publisher
  