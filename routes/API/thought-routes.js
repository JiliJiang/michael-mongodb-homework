const router= require('express').Router();
const { User, Thought } = require("../../models");

//3. api/thoughts

//3.1  Get all thoughts 

router.get("/", (req, res) => {
    Thought.find({}).
    then((data) => res.json(data))
    .catch(err => res.json(err));
  });
  
  //3.2 Get a thought by id
  
 router.get("/:id", (req, res) => {
    Thought.find({ _id: req.params.id })
    .then((data) => 
    {
      if (!data) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      };
    res.json(data)}) 
    .catch(err => res.json(err));
  });
  
  //3.3 Create a thought by user id
  
 router.post("/:userId", ({ params, body }, res) => {
    
    Thought.create(body)
    .then(({_id})=>{
        return User.findOneAndUpdate(
          {_id:params.userId}, 
          {$push:{thoughts:_id}}, 
          { new: true, runValidators: true }
    );
    })    
      .then((data) => 
      {
        if (!data) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        };
      res.json(data)})
      .catch((err) => {
        if (err) throw err;
      });
    }
  );
  
  
  //4. api/thoughts/:thoughtId/reactions/
  
  //4.1 post a reaction
  
 router.post("/:thoughtId/reactions/", ({ params, body }, res) => {
    
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    ).then((data) => 
    {
      if (!data) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      };
    res.json(data)})
    .catch((err) => {if (err)throw err})
  });
  
  //4.2 delete a reaction
  
router.delete(
    "/:thoughtId/reactions/:reactionId",
    async ({ params }, res) => {
  
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      ).then((data) => res.json(data))
      .catch(err => res.json(err));
    }
  );

module.exports = router;