import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "urql";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import { BsArrow90DegDown } from "react-icons/bs";
import { ADD_COMMENT_PARENT, DELETE_OSP_COMMENT, UPDATE_OSP_COMMENT } from "../../../gql/mutations";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsArrowsCollapse } from "react-icons/bs"
import { getOspByParentId } from "../../../gql/query";

const OspComments = ({ oc, userMatched, user, margin, reExecuteGetOspsQuery }) => {
    let iconsStyle = { fontSize: "2rem", borderRadius: "20px" };
    const [showReplyInputBox, setShowReplyInputBox] = useState(false);
    const [forEditInput, setForEditInput] = useState(false);
    const [pauseGetCommentByParent, setPauseGetCommentByParent] = useState(true);
    const [onExpandGetComments, setOnExpandGetComments] = useState({ check: "" })
    const [subComments, setSubComments] = useState([]);
    let inputRef = useRef();

    const [, addCommentsWithParent] = useMutation(ADD_COMMENT_PARENT);
    const [, deleteOspComment] = useMutation(DELETE_OSP_COMMENT);
    const [, updateOspComment] = useMutation(UPDATE_OSP_COMMENT);
    const [res, reExecuteGetOspCommentsByQuery] = useQuery({ query: getOspByParentId, variables: { parentId: oc?._id }, pause: pauseGetCommentByParent });
    
    useEffect(() => {
        if (res.data) {
            setSubComments(res?.data?.getOspCommentsByParentId?.ospSubComments)
        }
    }, [res.data, onExpandGetComments.check])

    async function handleComment() {
        if (forEditInput) {
            let data = {
                comment: inputRef.current.value,
                id: oc?._id
            }
            let response = await updateOspComment({ options: data })
            toast.success(response?.data?.updateOspComment)
            inputRef.current.value = "";
            reExecuteGetOspsQuery({ requestPolicy: 'network-only' });
            setSubComments([]);
            checkForEdit(false, false);
        }
        else {
            try {
                let data = {
                    username: user?.user.username,
                    osp_id: oc?._id,
                    comment: inputRef.current.value,
                    parent_id: oc._id.toString(),
                };
                let response = await addCommentsWithParent({ options: data });
                inputRef.current.value = "";
                toast.success(response?.data.createOspCommentsByParents);
                reExecuteGetOspsQuery({ requestPolicy: 'network-only' });
                reExecuteGetOspCommentsByQuery({ requestPolicy: 'network-only' })
                setShowReplyInputBox(false)
            } catch (err) {
                toast.error(err.message);
            }
        }
    }


    async function deleteComment() {
        let response = await deleteOspComment({ deleteOspCommentId: oc?._id })
        toast.success(response?.data?.deleteOspComment);
        reExecuteGetOspsQuery({ requestPolicy: 'network-only' });
    }

    function checkForEdit(forInputBoxDisplayValue, forInputValue) {
        setShowReplyInputBox(forInputBoxDisplayValue)
        setForEditInput(forInputValue)
    }

    function getSubComments() {
            reExecuteGetOspCommentsByQuery({ requestPolicy: 'network-only' })
            setOnExpandGetComments({ check: crypto.randomUUID() })
    }

    return (
        <>
            <div className="each-comment" style={{ marginLeft: `${margin}rem`, borderLeft: "2px solid black" }}>
                {userMatched ? (
                    <>
                        <AiOutlineDelete onClick={() => deleteComment()} />
                        <AiOutlineEdit className="ml-3" onClick={() => checkForEdit(true, true)} />
                    </>
                ) : null}
                <span className="ml-4">
                    <b>{oc.username}: </b>
                </span>
                <span className="ml-4">{oc.comment}</span>
                {user?.user ? (
                    <>
                        <span
                            className="ml-4 cur-point"
                            onClick={() => setShowReplyInputBox(true)}
                        >
                            {" "}
                            ... Reply
                        </span>{" "}
                    </>
                ) : null}
                        <BsArrow90DegDown className="ml-2"
                            onClick={() => getSubComments()}
                        />
                <BsArrowsCollapse onClick={() => setSubComments([])} />
                <b><span className="ml-4">{oc.edited ? ` ~ Edited` : null}</span></b>
                {showReplyInputBox ? (
                    <div className="my-comment-box">
                        <label htmlFor="text">
                            <b>Reply: </b>
                        </label>
                        <input type="text" name="text" id="commentBox" ref={inputRef} />
                        <IoCheckmarkDoneOutline
                            className="comment-button"
                            style={iconsStyle}
                            onClick={() => handleComment()}
                        />
                        <MdCancel
                            onClick={() => checkForEdit(false, false)}
                            style={iconsStyle}
                        />
                    </div>
                ) : null}
                {subComments.length > 0 &&
                    subComments.map((sc, i) => (
                        <OspComments key={i} oc={sc} margin={margin + 1} userMatched={userMatched} user={user} reExecuteGetOspsQuery={reExecuteGetOspCommentsByQuery} />

                    ))}
            </div>
        </>
    );
};

export default OspComments;
