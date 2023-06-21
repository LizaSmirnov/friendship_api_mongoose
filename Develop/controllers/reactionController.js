const { ObjectId } = require('mongoose').Types;
const {User, Thought, Reaction } = require('../models');


module.exports = {
//get all thoughts
async getReactions(req, res){
try {
    const reaction = await Reaction.find();
    const reactionObj = {
        reaction,
    };
    return res.json(reactionObj);
} catch (err) {
    console.log(err);
    return res.status(404).json(err);
}   
},
//get single thought
async getSingleReaction(req, res){
    try{
        const reaction = await Reaction.findByOne({_id: req.params.studentId})
        .select('-__V')//verisonKey key value contains the internal revision of the document(renameable)
        .lean();

        if(!reaction){
            return res.status(404).json({message: "no reaction stone cold..."})
        }
        res.json({
            reaction,
        });
    } catch (err){
        console.log(err);
        return res.status(404).json(err);
    }
},
//create new thought
async createReaction(req, res){
    try {
        const reaction = await Reaction.create(req.body);
        res.json(reaction)
    } catch (err){
        res.status(404).json(err);
    }
},

// async deleteReaction(req, res){
//     try {
//         const reaction = await Reaction.findOneAndRemove({ _id: req.params.userId});

//         if(!reaction){
//             return res(404).json({ message: 'no reaction stone cold...'})
//         }
//         const reaction = await Reaction.findOneAndUpdate(
//             {thoughts : req.params.thoughtId},
//             {$pull: { users: req.params.thoughtId } },
//             { new: true }
//           );
    
//           if (!reaction) {
//             return res.status(404).json({
//               message: 'Thought deleted, but no reactions found',
//             });
//           }
    
//           res.json({ message: 'Reactions no more' });
//         } catch (err) {
//           console.log(err);
//           res.status(500).json(err);
//         }
//     },
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
  // Remove assignment from a student
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
