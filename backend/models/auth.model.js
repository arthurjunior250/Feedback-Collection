const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
  profilePicture: { type: String},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String,enum: ['standard-user', 'admin'],default: 'standard-user'},
  password: { type: String, required: true },
}, {
  timestamps: true,
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
