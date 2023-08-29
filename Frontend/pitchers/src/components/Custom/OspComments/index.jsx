import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "urql";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import { ADD_COMMENT_PARENT, DELETE_OSP_COMMENT, UPDATE_OSP_COMMENT } from "../../../gql/mutations";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { getOspByParentId } from "../../../gql/query";
import { AiFillEdit } from "react-icons/ai";
import { BsFillReplyFill } from "react-icons/bs";
import { FaComment, FaTrash } from "react-icons/fa";
import { BiCollapse } from "react-icons/bi"


const OspComments = ({ oc, userMatched, user, margin, reExecuteGetOspsQuery }) => {
    let iconsStyle = { fontSize: "2rem", borderRadius: "20px" };
    const [showReplyInputBox, setShowReplyInputBox] = useState(false);
    const [forEditInput, setForEditInput] = useState(false);
    const [pauseGetCommentByParent, setPauseGetCommentByParent] = useState(true);
    const [onExpandGetComments, setOnExpandGetComments] = useState({ check: "" })
    const [subComments, setSubComments] = useState([]);
    const [inputEditDefaultValue, setInputEditDefaultValue] = useState('');
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
            setInputEditDefaultValue('')
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
        if (forInputValue) {
            setInputEditDefaultValue(oc.comment)
        }
        else {
            setInputEditDefaultValue('')
        }
        setShowReplyInputBox(forInputBoxDisplayValue)
        setForEditInput(forInputValue)
    }

    function getSubComments() {
        reExecuteGetOspCommentsByQuery({ requestPolicy: 'network-only' })
        setOnExpandGetComments({ check: crypto.randomUUID() })
    }

    return (
        <>
            <div className="d-flex flex-column flex-wrap mt-2" style={{ marginLeft: `${margin}vmax`, borderLeft: "2px solid  rgba(88, 86, 86, 0.63)" }}>

                <div className="d-flex flex-row flex-wrap" >
                    <div className="d-flex flex-row flex-wrap ai-center" >

                        <span className="ml-4">
                            <b>{oc.username}: </b>
                        </span>
                        <span className="ml-4">{oc.comment}</span>
                    </div>
                    <div className="each-comment" >
                        {userMatched ? (
                            <>
                                <FaTrash className="cur-point" onClick={() => deleteComment()} />
                                <AiFillEdit className="ml-3 cur-point" onClick={() => checkForEdit(true, true)} />
                            </>
                        ) : null}
                        {user?.user ? (
                            <>
                                <BsFillReplyFill
                                    className="ml-4 cur-point"
                                    onClick={() => setShowReplyInputBox(true)}
                                />
                            </>
                        ) : null}
                        <FaComment className="ml-2 cur-point"
                            onClick={() => getSubComments()}
                        />
                        <BiCollapse onClick={() => setSubComments([])} className="cur-point" />
                        <b><span className="ml-4">{oc.edited ? ` ~ Edited` : null}</span></b>

                    </div>
                </div>
                {showReplyInputBox ? (
                    <div className="my-comment-box">
                        <label htmlFor="text">
                            <b>Reply: </b>
                        </label>
                        <input type="text" name="text" id="commentBox" ref={inputRef} defaultValue={inputEditDefaultValue} />
                        <IoCheckmarkDoneOutline
                            className="comment-button cur-point"
                            style={iconsStyle}
                            onClick={() => handleComment()}
                        />
                        <MdCancel
                            className="cur-point"
                            onClick={() => checkForEdit(false, false)}
                            style={iconsStyle}
                        />
                    </div>
                ) : null}
                {subComments.length > 0 &&
                    subComments.map((sc, i) => (
                        <OspComments key={i} oc={sc} margin={2} userMatched={userMatched} user={user} reExecuteGetOspsQuery={reExecuteGetOspCommentsByQuery} />

                    ))}
            </div>
        </>
    );
};

export default OspComments;
