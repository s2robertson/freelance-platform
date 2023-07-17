// Importing the AuthenticationError class from apollo-server-express package
const { AuthenticationError, UserInputError } = require("apollo-server-express");
// Importing the User, Project, Service, and Message models
const { User, Project, Service, Message } = require("../models");
// Import the signToken function from the auth utils module
const { signToken } = require("../utils/auth");
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const moment = require('moment');

const resolvers = {
  Query: {
    // Retrieve all of the current user's projects from the database
    projects: async (parent, args, context) => {
      if (context.user) {
        // console.log('Attempting to find projects');
        const projects = await Project.find({ owner: context.user._id }).populate('servicesNeeded');
        // console.log('Found projects: ', projects);
        return projects;
      }
      // console.log('Tried to find projects, but user wasn\'t logged in');
      throw new AuthenticationError('Not logged in');
    },
    // Retrieve all services from the database
    services: async () => {
      return await Service.find();
    },

    // Retrieve project by ID
    project: async (parent, { _id }, context) => {
      console.log('Attempting to fetch project: ', _id);
      // Is user logged in?
      if (context.user) {
        // Find the project by ID and populate owner, servicesNeeded & freelancers
        try {
          const project = await Project.findById(_id).populate(['owner', 'freelancers', 'servicesNeeded']);
            // .populate(
            //   'owner', 'freelancers', 'servicesNeeded'
            // )
            ;
          return project;
        } catch (e) {
          throw new Error("Project not found");
        }
      }
      throw new AuthenticationError("Not logged in");
    },

    // Retrieve projects that are asking for certain skills
    projectsByService: async (parent, { services }) => {
      if (!services || services.length === 0) {
        throw new UserInputError('No services requested');
      }
      const projects = await Project.find({ servicesNeeded: { $in: services }, seekingFreelancers: true }).populate('servicesNeeded');
      // console.log('Returning projects: ', projects);
      return projects;
    },

    // Retrieve user by ID
    user: async (parent, args) => {
      // Retrieve the logged-in user
      const user = await User.findById(args._id).populate('skills').populate('projects');
      return user;
    },

    // delete
    users: async (parent) => {
      // Retrieve the logged-in user
      const user = await User.find().populate('skills').populate('projects');
      return user;
    },

    messages: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      const messages = await Message.find({ 
        $or: [{ sender: context.user._id }, { receiver: context.user._id }]
      }).sort({ dateSent: -1 }).populate('sender').populate('receiver');
      return messages;
    }
  },

  Mutation: {
    // Adding a new user
    addUser: async (parent, args) => {
      // creates new user with args and populates both the projects and skills arrays
      const user = (await ((await User.create(args)).populate('projects'))).populate('skills');
      const token = signToken({ username: user.username, _id: user._id, email: user.email });

      console.log(user);

      return { token, user };
    },

    // Updating an existing user
    updateUser: async (parent, args, context) => {
      if (context.user) {
        // finds user by ID and assigns new values based on args accepted
        // something to note, is that previous data will be overwritten so for example, if you want to add a new skill or project, you'll need to add the existing ones first. This is something that I couldn't find a way to work around and will need to be taken into consideration when building the front-end
        const user = await User.findByIdAndUpdate(context.user._id, args, { new: true })
        await user.populate(['projects', 'skills']);

        return user
      }
      throw new AuthenticationError("Not logged in");
    },

    // Adding a new project
    addProject: async (parent, { name, description, freelancers, budget, dueDate, servicesNeeded }, context) => {
      if (context.user) {

        // Create a new project with the name, description, and ownerId
        const project = await Project.create({ name, description, owner: context.user._id, freelancers, budget, dueDate, servicesNeeded });

        // find the current logged in user, and push the just-created project into the projects array
        await User.findByIdAndUpdate(context.user._id, { $push: { projects: project._id } }, { new: true });

        // populate projects
        await project.populate('servicesNeeded');
        console.log(project);
        return project;
      }
      throw new AuthenticationError("Not logged in");
    },

    // Update an existing project
    updateProject: async (parent, args, context) => {
      // console.log('Attempting to update project');
      if (!args?._id) {
        throw new UserInputError('Invalid project id');
      }
      if (context.user) {

        // create reference to project we're trying to update
        const projectRef = await Project.findById(args._id);

        // compares the reference projects' owner._id to the signed in user's id -> if they do not match, throw an error
        if (!projectRef.owner.equals(context.user._id))
          throw new Error("You can only edit projects that belong to you!")

        // Update the project by ID with name and description
        const updatedProject = await Project.findByIdAndUpdate(args._id, args, { new: true });
        await updatedProject.populate(['owner', 'freelancers', 'servicesNeeded']);

        return updatedProject;
      }
      throw new AuthenticationError("Not logged in");
    },

    // Send a new message
    sendMessage: async (parent, { subject, text, receiverIds }, context) => {
      if (context.user) {

        for (let i = 0; i < receiverIds.length; i++) {
          if (receiverIds[i] === context.user._id)
            receiverIds.splice(i, 1)
        }

        // prevents you from sending a message to yourself
        if (!receiverIds.length)
          throw new Error("You cannot send a message to yourself!");

        // Creating a new message with the text, senderId, and receiverIds
        const message = await Message.create({ subject, text, sender: context.user._id, receiver: receiverIds, dateSent: moment().format('L') });
        await message.populate(['sender', 'receiver'])
        return message;
      }
      throw new AuthenticationError("Not logged in");
    },

    // Delete a project
    deleteProject: async (parent, { projectId }, context) => {
      if (context.user) {
        // creates a reference to the project we're trying to delete
        const projectRef = await Project.findById(projectId);

        // compares the rference projects' owner._id to the signed in user's id -> if they do not match, throw an error
        if ((projectRef.owner._id).toString() !== context.user._id)
          throw new Error("You can only delete projects that belong to you!")

        // delete project and remove it from the signed in user's projects array
        const project = await Project.findByIdAndDelete(projectId);
        await User.findByIdAndUpdate(context.user._id, { $pull: { projects: project._id } }, { new: true });

        return ("Project deleted:\n" + projectId);
      }
      throw new AuthenticationError("Not logged in");
    },

    //FIXME: commented out due to unnecessary functionality
    // Delete a service
    // remove admin
    // deleteService: async (parent, { serviceId }, context) => {
    //   if (context.user) {
    //     // Find the service and delete the service by ID
    //     const service = await Service.findByIdAndDelete(serviceId);

    //     await User.findByIdAndUpdate(context.user._id, { $pull: { skills: service._id } }, { new: true });

    //     return ("Service deleted:" + serviceId);
    //   }
    //   throw new AuthenticationError("Not logged in");
    // },

    //FIXME: commented out due to unnecessary functionality
    // Add a new service
    // remove admin
    // addService: async (parent, { name }, context) => {
    //   if (context.user) {
    //     // Creating a new service with name
    //     const service = await Service.create({ name });
    //     // add service to current user's skills array
    //     await User.findByIdAndUpdate(context.user._id, { $push: { skills: service._id } }, { new: true });
    //     await User.findById(context.user._id).populate('skills');
    //     return service;
    //   }
    //   throw new AuthenticationError("Not logged in");
    // },

    //FIXME: commented out due to unnecessary functionality
    // Update an existing service
    // remove admin
    // updateService: async (parent, { _id, name }, context) => {
    //   if (context.user) {
    //     // Update the service by ID with the name
    //     const updatedService = await Service.findByIdAndUpdate(
    //       _id,
    //       { name },
    //       { new: true }
    //     );

    //     return updatedService;
    //   }
    //   throw new AuthenticationError("Not logged in");
    // },

    deleteMessage: async (parent, { messageId }, context) => {
      if (context.user) {
        const message = await Message.findByIdAndDelete(messageId);

        await User.findByIdAndUpdate(context.user._id, { $pull: { messages: message._id } }, { new: true })

        return ("Message deleted:\n" + messageId);
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
