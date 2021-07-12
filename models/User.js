import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  isTech: {
    type: Boolean,
    required: true,
    default: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true
})

const User = model('user', UserSchema)
export default User
