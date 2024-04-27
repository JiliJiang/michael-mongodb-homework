const router= require('express').Router();
const { User, Thought } = require("../../models");

//1.api/users

//1.1 Get all users

router.get("/", (req, res) => {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then((data) => 
    res.json(data))
    .catch(err => res.json(err));;
  });
  
  //1.2 Get a user by id
  
router.get("/:id", (req, res) => {
    User.find({ _id: req.params.id })
    .populate({
      path:'thoughts',
      select:'-__v'
    })
    .select('-__v')
    .then((data) => 
    {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      };
    res.json(data)})
    .catch(err => res.json(err));;
  });
  
  
  //1.3 Create a user
  
router.post("/", ({ body }, res) => {
    User.create(body)
    .then((data) => 
    res.json(data))
    .catch(err => res.json(err));;
  });
  
  
  //1.4 Update a user by id
  
 router.put("/:id", ({ body, params }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then((data) =>{
      if (!data) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(data);
    })
    .catch(err => res.json(err));
  });
  
  
  //1.5 Delete a user 
  
  //When a user is deleted, all the relevant thoughts are deleted at the same time.
  
router.delete("/:id", async ({ params }, res) => {
    // get the array of thoughts
    const user = await User.findById(params.id);
    const thoughts = user.thoughts;
  
    
    // loop through array of thought and delete
    thoughts.forEach((id) => {
      Thought.findOneAndDelete({ _id: id }).catch((err) => {
        if (err) throw err
      })
    });
  
    User.findOneAndDelete({ _id: params.id }).then(() => {
      res.json({message: "user and associated thoughts deleted!"});
    })
    .catch((err) => res.json(err));
  }); 
  
  //2. api/users/:userId/friends/:friendId

//2.1 Add a friend by id

router.post("/:userId/friends", ({params, body}, res) => {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: body.id } },
      { new: true}
    ).then((data) => 
    {
      if (!data) {
        res.status(404).json({ message: 'No friend found with this id!' });
        return;
      };
    res.json(data)})
    .catch(err => res.json(err));;
  });
  
  //2.2 Delete a friend by id
  
  
router.delete("/:userId/friends/:friendId", (req, res) => {
   
          User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }).then(data => res.json(data)).catch((err) => {if (err) throw err});
        
      });

module.exports = router;