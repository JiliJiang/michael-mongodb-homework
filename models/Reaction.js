const { Schema, Types, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {

  reactionId: 
  {
    type: Schema.Types.ObjectId,
    default: ()=> new Types.ObjectId(),
  },

  reactionBody: 
  {
    type: String,
    required: "reaction body is required",
    maxlength: 280,
  },

  createdAt: 
  {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },

  username: 
  {
    type: String,
    required: "username is required",
  },
},
{
  toJSON:
  {
    getters:true
  },
  id: false
}
);

//const Reaction = model("Reaction", ReactionSchema);

module.exports = ReactionSchema;
