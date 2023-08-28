import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import { getOspById, getOspByParentId } from '../../../gql/query'
import { ADD_COMMENT } from '../../../gql/mutations'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify";
import OspComments from '../OspComments'
import "./index.css"

const OspShow = () => {
  const { id } = useParams()
  const commentsRef = useRef()
  const { user } = useSelector((state) => state.user);
  
  let data = { id: parseInt(id), user_id: user?.user?._id || 3 }
  const [, addComments] = useMutation(ADD_COMMENT);
  const [result, reexecuteQuery] = useQuery({ query: getOspById, variables: { options: data } });

  const [osp, setOsp] = useState({
    details: null,
    description: null,
    tags: null,
    userDetails: null,
    comments: null
  })

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
  
  async function createComments() {
    let comment = document.getElementById("commentBox");
    try {
      let data = { username: user?.user.username, osp_id: osp?.details?.osp_id, comment: comment.value, parent_id: osp?.details?.osp_id.toString() }
      let response = await addComments({ options: data })
      commentsRef.current.value = '';
      reexecuteQuery({ requestPolicy: 'network-only' });
      toast.success(response?.data.createOspComments)
    }
    catch (err) {
      toast.error(err.message)
    }
  }
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
        {osp?.tags?.map((ot, i) => (
          <span className='tag-span' key={i}> #{ot.tag_name}</span>
        ))}
      </div>
      <div className='osp-description-box'>
        {osp?.description?.map((od, i) => (
          <div className='osp-description' key={i}>
            <h3>{od.title}</h3>
            <span>{od.description}</span>
          </div>
        ))}
      </div>
      <div className='osp-comment-box'>
        <h2>Comments</h2>
        {user?.user ?
          <div className='my-comment-box'>
            <label htmlFor="text"><b>Add your Comment: </b></label>
            <input type="text" name="text" id="commentBox" ref={commentsRef} />
            <button onClick={createComments} className='comment-button'>Submit</button>
          </div> : ""
        }
        <div className='osp-comments-commmunity'>
          {osp?.comments?.map((oc, i) => (
            <OspComments oc={oc} margin={0} reExecuteGetOspsQuery={reexecuteQuery} userMatched={user?.user?.username === osp?.userDetails?.username} user={user} key={i} />
          ))}
        </div>
      </div>

    </>
  )
}

export default OspShow
