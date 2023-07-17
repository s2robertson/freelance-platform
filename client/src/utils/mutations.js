import { gql } from '@apollo/client';

// we only need to return the token from this mutation, as its the only thing we need to log a user in
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $isEmployer: Boolean!, $profileDescription: String) {
  addUser(username: $username, email: $email, password: $password, isEmployer: $isEmployer, profileDescription: $profileDescription) {
    user {
      _id
      username
      email
      isEmployer
      profileDescription
    }
  }
}
`

export const UPDATE_USER = gql`
  mutation UpdateUser($username: String, $email: String, $password: String, $isEmployer: Boolean, $profileDescription: String) {
  updateUser(username: $username, email: $email, password: $password, isEmployer: $isEmployer, profileDescription: $profileDescription) {
    _id
    username
    email
    isEmployer
    profileDescription
    skills {
      _id
      name
    }
    projects {
      _id
      name
    }
    messages {
      _id
      text
    }
  }
}
`

export const ADD_PROJECT = gql`
 mutation AddProject($name: String!, $description: String!, $freelancers: [ID], $dueDate: String, $budget: Int, $services: [ID]) {
  addProject(name: $name, description: $description, freelancers: $freelancers, dueDate: $dueDate, budget: $budget, services: $services) {
    _id
    name
    description
    owner {
      _id
      username
    }
    freelancers {
      _id
      username
    }
    dueDate
    budget
    servicesNeeded {
      _id
      name
    }
  }
}
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $name: String, $description: String, $freelancers: [ID], $dueDate: String, $budget: Int, $services: [ID]) {
  updateProject(_id: $id, name: $name, description: $description, freelancers: $freelancers, dueDate: $dueDate, budget: $budget, services: $services) {
    _id
    name
    description
    owner {
      _id
      username
    }
    freelancers {
      _id
      username
    }
    dueDate
    budget
    servicesNeeded {
      _id
      name
    }
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
    name
  }
}
`

export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID, $name: String) {
  updateService(_id: $id, name: $name) {
    _id
    name
  }
}
`

export const DELETE_SERVICE = gql`
  mutation UpdateService($serviceId: ID!) {
  deleteService(serviceId: $serviceId)
}
`

export const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $receiverIds: [ID]!) {
  sendMessage(text: $text, receiverIds: $receiverIds) {
    _id
    text
    sender {
      _id
      username
    }
    receiver {
      _id
      username
    }
    dateSent
  }
}
`

export const DELETE_MESSAGE = gql`
  mutation SendMessage($messageId: ID!) {
  deleteMessage(messageId: $messageId)
}
`