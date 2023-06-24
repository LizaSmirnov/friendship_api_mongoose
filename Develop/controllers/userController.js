
const  User  = require('../models/User');
const { Thought } = require('../models');

module.exports = {

    async getAllUsers(req,res) {
        try {
            const users = await User.find();
            
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(404).json(err);
        }
    },

    async getUserById(req, res){
        try {
            const users = await User.findOne({ _id: req.params.Id})
            .select('-__v')//used to excluded the __v field from the returned user obj
            // .lean()//methos is used to convert the retrieved user obj in plain js; optional better for improving performance
            .populate('friends')
            .populate('thoughts')
            console.log(users);
            if(!users){
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(users);

        } catch (err) {
            console.log(err);
            return res.status(404).json(err);
        }
    },

    async createUser(req, res){
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(404).json(err);
        }
    },

    async deleteUser(req, res){
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if(!user){
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            const thoughts = await Thoughts.findOneAndUpdate(
                { username: user.username },
                { $pull: { thoughts: { username: user.username } } },
                { new: true }
            );

            if(!thoughts){
                return res.status(404).json({ message: 'User deleted, but not thoughts were found' });
            }
            res.json({ message: 'User and associated thoughts sucessfully deleted' });
        } catch (err) {
            console.log(err);
            return res.status(404).json(err);
        }
    },

    async addFriend(req, res){
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.body } },
                { runValidators:true, new: true }
            );

            if(!user){
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(404).json(err);
        }
    },

    async removeFriend(req, res){
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.body } },
                { runValidators:true, new: true }
            );

            if(!user){
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({ message: 'Friend successfully removed' });
        } catch (err) {
            console.log(err);
            return res.status(404).json(err);
        }
    },

};