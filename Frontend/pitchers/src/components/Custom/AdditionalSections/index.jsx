import React, { useState } from 'react'
import { BsCheck2 } from "react-icons/bs";

const AdditionalSections = (props) => {
    let { index, getValue } = props;
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    function setValue(){
    getValue({ title: title, description: description })
    }

    return (
            <>
                <div className='title-container'>
                    <span>Title {index + 1}: <BsCheck2 className="correct-icon" onClick={setValue}/> </span>
                    <input type="text" className='title-input' placeholder="title" name='title' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='desc-container'>
                    <span>Description {index + 1}:</span>
                    <textarea name="description" id="description" cols="30" rows="10" className='desc-input' placeholder='Description' onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>
            </>
    )
}

export default AdditionalSections
