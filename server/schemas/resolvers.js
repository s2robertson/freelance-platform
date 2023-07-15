// Importing the AuthenticationError class from apollo-server-express package
const { AuthenticationError } = require("apollo-server-express");
// Importing the User, Project, Service, and Message models
const { User, Project, Service, Message } = require("../models");
// Import the signToken function from the auth utils module
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {

    // Retrieve all projects from the database
    projects: async () => {
      return await Project.find().populate(['owner', 'servicesNeeded', 'freelancers']);
    },
    // Retrieve all services from the database
    services: async () => {
      return await Service.find();
    },

    // Retrieve project by ID
    project: async (parent, { _id }, context) => {
      // Is user logged in?
      if (context.user) {
        // Find the project by ID and populate owner, servicesNeeded & freelancers
        try {
          const project = await Project.findById(_id).populate(
            ['owner', 'freelancers', 'servicesNeeded']
          );
          return project;
        } catch (e) {
          throw new Error("Project not found");
        }
      }
      throw new AuthenticationError("Not logged in");
    },

    // Retrieve user by ID
    user: async (parent, args) => {
      // Retrieve the logged-in user
      const user = await User.findById(args._id).populate(['skills', 'projects']);
      return user;
    },

    users: async (parent) => {
      // Retrieve the logged-in user
      const user = await User.find().populate('skills', 'projects');
      //await user.populate('projects');
      return user;
    },
  },

  Mutation: {
    // Adding a new user
    addUser: async (parent, args) => {
      // creates new user with args
      const user = await User.create(args);
      const token = signToken({ username: user.username, _id: user._id, email: user.email });

      await user.populate('skills');
      await user.populate('projects');
      console.log(user);

      return { token, user };
    },

    // Updating an existing user
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(context.user._id, args, { new: true })
        await user.populate(['skills', 'projects']);

        console.log(user);

        return user
      }
      throw new AuthenticationError("Not logged in");
    },

    // Adding a new project
    addProject: async (parent, { name, description, freelancers, budget }, context) => {
      if (context.user) {
        // Create a new project with the name, description, and ownerId
        const project = await Project.create({ name, description, owner: context.user._id, freelancers, budget });
        // find the current logged in user, and push the just-created project into the projects array
        await User.findByIdAndUpdate(context.user._id, { $push: { projects: project._id } }, { new: true });
        return project;
      }
      throw new AuthenticationError("Not logged in");
    },

    // Update an existing project
    updateProject: async (parent, { _id, name, description, freelancers }, context) => {
      if (context.user) {
        // Update the project by ID with name and description
        const updatedProject = await Project.findByIdAndUpdate(
          _id,
          { name, description, freelancers },
          { new: true }
        );
        return updatedProject;
      }
      throw new AuthenticationError("Not logged in");
    },

    // Add a new service
    addService: async (parent, { name }, context) => {
      if (context.user) {
        // Creating a new service with name
        const service = await Service.create({ name });
        return service;
      }
      throw new AuthenticationError("Not logged in");
    },

    // Update an existing service
    updateService: async (parent, { serviceId, name }, context) => {
      if (context.user) {
        // Update the service by ID with the name
        const updatedService = await Service.findByIdAndUpdate(
          serviceId,
          { name },
          { new: true }
        );
        return updatedService;
      }
      throw new AuthenticationError("Not logged in");
    },

    // Send a new message
    sendMessage: async (parent, { text, senderId, receiverIds }, context) => {
      if (context.user) {
        // Creating a new message with the text, senderId, and receiverIds
        const message = await Message.create({ text, senderId, receiverIds });
        return message;
      }
      throw new AuthenticationError("Not logged in");
    },

    // Delete a project
    deleteProject: async (parent, { projectId }, context) => {
      if (context.user) {
        // Find the project and delete the project by ID
        await Project.findByIdAndDelete(projectId);
        return ("Project deleted:" + projectId);
      }
      throw new AuthenticationError("Not logged in");
    },

    // Delete a service
    deleteService: async (parent, { serviceId }, context) => {
      if (context.user) {
        // Find the service and delete the service by ID
        await Service.findByIdAndDelete(serviceId);
        return ("Service deleted:" + serviceId);
      }
      throw new AuthenticationError("Not logged in");
    },

    // User login
    login: async (parent, { email, password }) => {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // Checking if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // Generate a token for the authenticated user
      const token = signToken({ username: user.username, _id: user._id, email: user.email });
      console.log(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
