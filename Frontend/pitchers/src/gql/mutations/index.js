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
