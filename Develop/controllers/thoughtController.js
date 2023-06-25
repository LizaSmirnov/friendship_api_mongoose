const { ObjectId } = require('mongoose').Types;
const {User, Thought } = require('../models');


module.exports = {
//get all thoughts
async getThought(req, res){
try {
    const thought = await Thought.find()
        .populate('reactions')
        .select('-__v');//method used to exclude __v field from the returned user object
 
    return res.json(thought);

} catch (err) {
    console.log(err);
    return res.status(404).json(err);
}   
},
//get single thought
async getSingleThought(req, res){
    try{
        const thought = await Thought.findOne({_id: req.params.id})
        .select('-__v')
        .populate('reactions');

        if(!thought){
            return res.status(404).json({message: "no thought found by that id yoo..."})
        }
        res.json({
            thought,
        });
    } catch (err){
        console.log(err);
        return res.status(404).json(err);
    }
},
//create new thought
async createThought(req, res){
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
           {username: req.body.username},
           { $push: {thoughts:thought._id}},
           {new: true});

           if(!user){
            res.status(404).json({message:'sorry no user'})
            res.json(thought);
            }
           } catch(err){
              console.log(err);
              res.status(500).json(err)
            }
          },
//delete your thoughhtttt        
async deleteThought(req, res){
    try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.idd});
        if(!thought){
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(404).json(err);
      }
    },
    
  // Add an thought to a user
  async updateThought(req, res) {
    try {
      console.log('You are adding a thought');
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thought: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' })
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add an thought to a user
  async addReaction(req, res) {
    try {
      console.log('You are adding a reaction');
      console.log(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thoughts found with that ID :(' })
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction
  async removeReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};


    