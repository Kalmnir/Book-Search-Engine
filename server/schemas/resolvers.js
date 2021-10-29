const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select("-password");
                return userData;
            }
            throw new AuthenticationError("Not logged in.")
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const newUser = await User.create(args);
            const token = signToken(newUser);

            return { token, newUser };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("User does not exist");
            }
            const correctPw = await User.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorect password");
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.bookData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You must be logged in!");
        },
        deleteBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in.");
        },
    },

};

module.exports = resolvers;