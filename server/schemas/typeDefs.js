const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    isEmployer: Boolean
    skills: [Service]
  }

  type Project {
    _id: ID
    name: String
    description: String
    owner: User
    freelancers: [User]
    dueDate: String
    budget: Int
    servicesNeeded: [Service]
  }

  type Service {
    _id: ID
    name: String!
  }

  type Message {
    _id: ID
    text: String
    sender: User
    receiver: [User]!
    dateSent: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: User
    projects: [Project]
    project(_id: ID!): Project
    services: [Service]
    service(Id: ID!): Service
    user(_Id: ID!): [Message]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    updateUser(userId: ID!, name: String, email: String, password: String): User

    addProject(name: String!, description: String!, ownerId: ID!): Project
    updateProject(projectId: ID!, name: String, description: String): Project

    addService(name: String!): Service
    updateService(serviceId: ID!, name: String): Service

    sendMessage(text: String!, senderId: ID!, receiverIds: [ID]!): Message

    deleteProject(projectId: ID!): Boolean
    deleteService(serviceId: ID!): Boolean

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
