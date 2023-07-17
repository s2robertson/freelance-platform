const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    profileDescription: String
    isEmployer: Boolean!
    skills: [Service]
    projects: [Project]
  }

  type Project {
    _id: ID!
    name: String!
    description: String!
    owner: User!
    freelancers: [User]
    dueDate: String
    budget: Int
    servicesNeeded: [Service]
  }

  type Service {
    _id: ID!
    name: String!
  }

  type Message {
    _id: ID!
    subject: String!
    text: String!
    sender: User
    receiver: [User]
    dateSent: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    projects: [Project]
    project(_id: ID!): Project
    projectsByService(services: [ID!]): [Project]
    services: [Service]
    service(_id: ID!): Service
    user(_id: ID!): User
    messages: [Message]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, isEmployer: Boolean!, profileDescription: String, skills: [ID], projects: [ID]): Auth
    updateUser(username: String, email: String, password: String, isEmployer: Boolean, profileDescription: String, skills: [ID], projects: [ID]): User

    addProject(name: String!, description: String! freelancers: [ID], dueDate: String, budget: Int, services: [ID]): Project
    updateProject(_id: ID!, name: String, description: String, freelancers: [ID], dueDate: String, budget: Int, services: [ID]): Project

    ## MUTATIONS COMMENTED OUT -- ADMIN PRIVELAGES UPDATE? REUSABLE...

    #addService(name: String!): Service
    #updateService(_id: ID, name: String): Service
    #deleteService(serviceId: ID!): ID

    sendMessage(subject: String!, text: String!, receiverIds: [ID]!): Message
    deleteMessage(messageId: ID!): ID

    deleteProject(projectId: ID!): ID

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
