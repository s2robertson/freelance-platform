import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $isEmployer: Boolean!, $skills: [ServiceInput]) {
    addUser(username: $username, email: $email, password: $password, isEmployer: $isEmployer, skills: $skills) {
      token
      user {
        _id
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String, $email: String, $password: String, $isEmployer: Boolean!, $skills: [ServiceInput]) {
    updateUser(_id: $id, username: $username, email: $email, password: $password, isEmployer: $isEmployer, skills: $skills) {
      _id
    }
  }
`

export const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String!, $ownerId: ID!, $freelancers: [UserInput], $dueDate: String, $budget: Int, $services: [ServiceInput]) {
    addProject(name: $name, description: $description, ownerId: $ownerId, freelancers: $freelancers, dueDate: $dueDate, budget: $budget, services: $services) {
      _id
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($projectId: ID!, $name: String!, $description: String!, $ownerId: ID!, $freelancers: [UserInput], $dueDate: String, $budget: Int, $services: [ServiceInput]) {
    updateProject(projectId: $projectId, name: $name, description: $description, ownerId: $ownerId, freelancers: $freelancers, dueDate: $dueDate, budget: $budget, services: $services) {
      _id
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: ID!) {
    deleteProject(projectId: $projectId)
  }
`

export const ADD_SERVICE = gql`
  mutation AddService($name: String!) {
    addService(name: $name) {
      _id
    }
  } 
`

export const UPDATE_SERVICE = gql`
  mutation UpdateService($serviceId: ID!, $name: String) {
    updateService(serviceId: $serviceId, name: $name) {
      _id
      name
    }
  }
`

export const DELETE_SERVICE = gql`
  mutation DeleteService($serviceId: ID!) {
    deleteService(serviceId: $serviceId)
  }
`

export const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $senderId: UserInput!, $dateSent: String!, $receiverIds: [UserInput]!) {
    sendMessage(text: $text, senderId: $senderId, dateSent: $dateSent, receiverIds: $receiverIds) {
      _id
      text
      sender {
        _id
        name
      }
      receiver {
        _id
        name
      }
      dateSent
    }
  }
`