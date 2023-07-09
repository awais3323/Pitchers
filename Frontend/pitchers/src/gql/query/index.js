import { gql } from "urql";

export const getOspById = gql`
query GetOspById() {
  getOspById(id: 25) {
    osp {
      _id
      Author
      osp_id
      title
      description
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
    user {
      name
      username
      title
      email
      gender
      age
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
}
`;
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
