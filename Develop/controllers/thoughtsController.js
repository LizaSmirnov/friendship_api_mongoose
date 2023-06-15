const { ObjectId } = require('moongose').Types;
const {User, Thoughts, Reactions } = require('../models');


module.exports = {
//get all thoughts
async getThoughts(req, res){
try {
    const thoughts = await Thoughts.find();
    const thoughtObj = {
        thoughts,
    };
    return res.json(thoughtObj);
} catch (err) {
    console.log(err);
    return res.status(404).json(err);
}   
},
//get single thought
async getSingleThought(req, res){
    try{
        const thought = await Thought.findByOne({_id: req.params.studentId})
        .select('-__V')
        .lean();

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
        res.json(thought)
    } catch (err){
        res.status(404).json(err);
    }
},

async deleteThought(req, res){
    try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.userId});

        if(!thought){
            return res(404).json({ message: 'no thoughts found rip'})
        }
        const reaction = await Reaction.findOneAndUpdate(
            {users : req.params.userId},
            {$pull: { users: req.params.userId } },
            { new: true }
          );
    
          if (!reaction) {
            return res.status(404).json({
              message: 'Thought deleted, but no reactions found',
            });
          }
    
          res.json({ message: 'Thoughts be gone' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    },
  // Add an thought to a user
  async addThought(req, res) {
    try {
      console.log('You are adding a thought');
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
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
  // Remove assignment from a student
  async removeThought(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

        
    