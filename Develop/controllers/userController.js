const { ObjectId } = require('mongoose').Types; //default mongoose uses objs as ids as default
const { User, Thought, Reaction } = require('../models');

module.exports = {

    async getAllUsers(req,res) {
        try {
            const users = await User.find();
            const userObj = {
                users,
            };
            return res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(404).json(err);
        }
    },

    async getUserById(req, res){
        try {
            const user = await User.findOne({_id: req.params.userId })
            .select('-__v')
            .lean();

            if(!user){
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json({
                user,
                thought: await thought(req.params.userId),
            });
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