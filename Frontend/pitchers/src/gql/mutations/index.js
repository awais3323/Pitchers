export const REGISTER_MUT = `
mutation RegisterUser($options: UserRegister!) {
  registerUser(options: $options) {
    errors {
      field
      message
    }
    user {
      _id
      name
      username
      title
      intro
      email
      phone_no
      gender
      age
      date_of_birth
      createdAt
      updatedAt
    }
    status
  }
}
`;
export const LOGIN_MUT = `
mutation LoginUser($options: LoginUser!) {
  loginUser(options: $options) {
    errors {
      field
      message
    }
    user {
      _id
      name
      username
      title
      intro
      email
      phone_no
      gender
      age
      date_of_birth
      createdAt
      updatedAt
    }
    status
  }
}
`;
export const ADD_COMMENT= `
mutation CreateOspComments($options: ospComments!) {
  createOspComments(options: $options)
}
`;
export const CREATE_OSP = `
mutation CreateOsp($options: createOsp!) {
  createOsp(options: $options) {
    _id
    Author
    osp_id
    title
    description
    createdAt
    updatedAt
  }
}
`