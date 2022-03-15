import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    text: mongoose.SchemaTypes.String,
    author: mongoose.SchemaTypes.String,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('Entry', schema);
