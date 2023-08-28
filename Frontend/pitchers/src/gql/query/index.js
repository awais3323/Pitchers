import { gql } from "urql";

export const getOspById = gql`
query GetOspById($options: getOspById!) {
  getOspById(options: $options) {
    osp {
      _id
      Author
      osp_id
      title
      description
      createdAt
      updatedAt
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
    ospDescriptions {
      _id
      osp_id
      title
      description
      createdAt
      updatedAt
    }
    ospTags {
      _id
      osp_id
      tag_name
      createdAt
      updatedAt
    }
    ospComments {
      _id
      osp_id
      username
      comment
      edited
      createdAt
      updatedAt
    }
  }
}`;

export const allOsp = gql`
  query Osps {
    osps {
      _id
      Author
      osp_id
      title
      description
      createdAt
      updatedAt
    }
  }
`;
export const getOspByArgs = gql`
query GetOspByArgs($options: getOspByArgs!) {
  getOspByArgs(options: $options) {
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
export const getOspByParentId = gql`
query GetOspCommentsByParentId($parentId: Int!) {
  getOspCommentsByParentId(parentId: $parentId) {
    ospSubComments {
      _id
      osp_id
      username
      parent_id
      comment
      edited
      createdAt
      updatedAt
    }
  }
}
`