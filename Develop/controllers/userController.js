const { ObjectId } = require('mongoose').Types; //default mongoose uses objs as ids as default
const { User, Thoughts, Reaction } = require('../models');

module.exports = {

    async getUsers(req,res) {
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

    async getSingleUser(req, res){
        try {
            const user = await User.findOne({_id: req.params.userId })
            .select('-__v')
            .lean();
        }
    }
}