const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    isEmployer: Boolean!
    skills: [Service]
    projects: [Project]
  }

  input UserInput {
    _id: ID!
    username: String!
    email: String!
    password: String!
    isEmployer: Boolean!
    skills: [ServiceInput]
    projects: [ProjectInput]
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

  input ProjectInput {
    _id: ID!
  }

  type Service {
    _id: ID!
    name: String!
  }

  input ServiceInput {
    _id: ID!
  }

  type Message {
    _id: ID!
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, isEmployer: Boolean!, skills: [ID], projects: [ID]): Auth
    updateUser(username: String, email: String, password: String, isEmployer: Boolean, skills: [ID], projects: [ID]): User

    addProject(name: String!, description: String! freelancers: [ID], dueDate: String, budget: Int, services: [ID]): Project
    updateProject(_id: ID!, name: String, description: String, freelancers: [ID], dueDate: String, budget: Int, services: [ID]): Project

    addService(name: String!): Service
    updateService(_id: ID, name: String): Service

    sendMessage(text: String!, senderId: UserInput!, receiverIds: [UserInput]!, dateSent: String!): Message

    deleteProject(projectId: ID!): ID
    deleteService(serviceId: ID!): ID

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
