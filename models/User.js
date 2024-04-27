const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: 
    {
      type: String,
      unique: true,
      trim: true,
      required:"username is required"
    },

    email: 
    {
      type: String,
      unique: true,
      required:"email is required",
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },

    thoughts:
    [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],

    friends:
    [
      {
      type: Schema.Types.ObjectId,
      ref:'User'
      }
    ],

    userCreated: 
    {
      type: Date,
      default: Date.now,
      get:userCreatedVal=>dateFormat(userCreatedVal)
    },
 },
    {
      toJSON: 
      {
        virtuals: true,
        getters: true
      },
      id: false
    },
 
)

UserSchema
.virtual('friendCount')
.get(function() {
  return this.friends.length;
});


const User = model('User', UserSchema);

module.exports = User;
