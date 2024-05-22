const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },

    saveBook: async (parent, { newBook }, context) => {
      if (context.user) {
        const updatedData = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: { savedBooks: newBook },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return updatedData;
      }
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedData = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedData;
      }
    },
  },
};

module.exports = resolvers;