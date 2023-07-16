const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    profileDescription: String
    isEmployer: Boolean!
    skills: [Service]
  }

  input UserInput {
    _id: ID!
    username: String!
    email: String!
    password: String!
    isEmployer: Boolean!
    skills: [ServiceInput]
  }

  type Project {
    _id: ID!
    name: String!
    description: String!
    freelancers: [User]
    dueDate: String
    budget: Int
    servicesNeeded: [Service]
  }

  type Service {
    _id: ID!
    name: String!
  }

  input ServiceInput {
    _id: ID!
    name: String!
  }

  type Message {
    _id: ID!
    subject: String!
    text: String!
    sender: User!
    receiver: [User]!
    dateSent: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    projects: [Project]
    project(_id: ID!): Project
    services: [Service]
    service(_id: ID!): Service
    user(_id: ID!): User
    messages: [Message]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, isEmployer: Boolean!,  skills: [ServiceInput]): Auth
    updateUser(username: String, email: String, password: String, isEmployer: Boolean, skills: [ServiceInput]): User

    addProject(name: String!, description: String!, freelancers: [UserInput], dueDate: String, budget: Int, services: [ServiceInput]): Project
    updateProject(name: String!, description: String!, freelancers: [UserInput], dueDate: String, budget: Int, services: [ServiceInput]): Project

    addService(name: String!): Service
    updateService(serviceId: ID!, name: String): Service

    sendMessage(subject: String!, text: String!, receiverIds: [ID!]!): Message

    deleteProject(projectId: ID!): ID
    deleteService(serviceId: ID!): ID

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
