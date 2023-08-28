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
export const ADD_COMMENT_PARENT = `
mutation CreateOspCommentsByParents($options: ospComments!) {
  createOspCommentsByParents(options: $options)
}`
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
export const DELETE_OSP_COMMENT = `
mutation DeleteOspComment($deleteOspCommentId: Int!) {
  deleteOspComment(id: $deleteOspCommentId)
}
`
export const UPDATE_OSP_COMMENT = `
mutation UpdateOspComment($options: updateOspComments!) {
  updateOspComment(options: $options)
}
`