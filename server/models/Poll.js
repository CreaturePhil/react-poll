import mongoose from 'mongoose';

let pollSchema = new mongoose.Schema({
  question: String,
  author: String,
  options: [
    {
      oid: Number,
      name: String,
      votes: { type: Number, default: 0 },
      voters: [
        {
          oid: Number,
          ip: String
        }
      ]
    }
  ]
});

export default mongoose.model('Poll', pollSchema);
