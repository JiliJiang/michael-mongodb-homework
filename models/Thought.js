const { Schema, Types, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const ReactionSchema= require("./Reaction")

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minlength: 1,
      maxlength: 280,
      required: "thought text is required",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },

    username: {
      type: String,
      required: "username is required",
    },

    reactions: [ReactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  console.log("reaction", this.reactions)
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
