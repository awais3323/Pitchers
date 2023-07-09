import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getOspById } from '../../../gql/query'
import "./index.css"

const OspShow = () => {
  const { id } = useParams()

  const [osp, setOsp] = useState({
    details: null,
    description: null,
    tags: null,
    userDetails: null,
    comments: null
  })

  const [result] = useQuery({ query: getOspById, variables: { id } });

  useEffect(() => {
    if (result.data) {
      const { getOspById } = result.data;
      setOsp({
        details: getOspById?.osp || null,
        description: getOspById?.ospDescriptions || null,
        tags: getOspById?.ospTags || null,
        userDetails: getOspById?.user || null,
        comments: getOspById?.ospComments || null
      });
    }
  }, [result.data]);

  console.log(result?.data)
  return (
    <>
      <div className='osp-main-intro'>
        <div className='user-osp-main-box'>
          {/* <h3>User Details</h3> */}
          <span><b>Name:</b> {osp?.userDetails?.name}</span>
          <span><b>Username:</b> {osp?.userDetails?.username}</span>
          <span><b>Title:</b> {osp?.userDetails?.title}</span>
          <span><b>Email:</b> {osp?.userDetails?.email}</span>
          <span><b>Age:</b> {osp?.userDetails?.age}</span>
        </div>
        <div className='osp-intro'>

          <h3> {osp?.details?.title}</h3>
          <h4> {osp?.details?.description}</h4>
          <h6> Created At: {osp?.details?.createdAt}</h6>
        </div>
      </div>
      <div className='osp-tags-box'>
        {osp?.tags?.map(ot => (
          <span className='tag-span'> #{ot.tag_name}</span>
        ))}
      </div>
      <div className='osp-description-box'>
        {osp?.description?.map(od => (
          <div className='osp-description'>
            <h3>{od.title}</h3>
            <span>{od.description}</span>
          </div>
        ))}
      </div>
      <div className='osp-comment-box'>
        <h2>Comments</h2>
        <div className='my-comment-box'>
          <label htmlFor="text"><b>Add your comment: </b></label>
          <input type="text" name="text" id="comment" />
        </div>
        <div className='osp-comments-commmunity'>
          {osp?.comments?.map(oc =>(
            <div className='each-comment'>
            <span><b>{oc.username}: </b></span>
            <span>{oc.comment}</span>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default OspShow
