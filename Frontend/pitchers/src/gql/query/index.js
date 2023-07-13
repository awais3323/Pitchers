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
