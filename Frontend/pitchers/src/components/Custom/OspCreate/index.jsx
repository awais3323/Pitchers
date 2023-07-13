import React from 'react'
import { useState } from 'react'
import "./index.css"
import AdditionalSections from '../AdditionalSections';
import { CREATE_OSP } from '../../../gql/mutations';
import { useMutation } from 'urql';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const OspCreate = () => {
  const [sectionCount, setSectionCount] = useState(0)
    const { user } = useSelector((state) => state.user);
  const [, createOsp] = useMutation(CREATE_OSP);
  const [value, setValue] = useState([])

  function getValue(obj){
    let data = value;
    data.push(obj)
    setValue(data)
  }

  async function createOsps(){
    let mainTitle = document.getElementById("main-title").value;
    let mainDescription = document.getElementById("main-description").value;
    let tag1 = document.getElementById("tag-1").value;
    let tag2 = document.getElementById("tag-2").value;
    let tag3 = document.getElementById("tag-3").value;
    let tag4 = document.getElementById("tag-4").value;
    let tag5 = document.getElementById("tag-5").value;
    try{
      let data = {Author:user?.user._id, title:mainTitle, description:mainDescription, data:value, tags:[tag1, tag2, tag3, tag4, tag5]}
console.log(data)
      let response = await createOsp({options:data})
      console.log(response)
      toast.success("Osp has been created")
    }
    catch(err){
      toast.error(err.message)
    }
  }

  return (
    <div className='main-form'>
      <h1>Create Open Source Project</h1>
      <div className='title-container'>
        <span>Main Title:</span>
        <input type="text" className='title-input' placeholder='Main Title' id='main-title' />
      </div>
      <div className='desc-container'>
        <span>Description:</span>
        <textarea name="main-description" id="main-description" rows="10" className='desc-input' placeholder='Main Description'></textarea>
      </div>
      <h2 className='main-form'>Additional Section</h2>
      {
        Array(sectionCount).fill("").map((data, i) => (
        <AdditionalSections key={i} index={i} getValue={getValue}/>
        ))
      }
      <button onClick={() => setSectionCount(sectionCount + 1)} className='add-section-btn'>  Add Section </button>
      <div>

        <div className='main-tag-div'>
          <h5>Tags: </h5>
          <div className='tag-div'>
            <input type="text" className='tag-input' placeholder="tag 1" id='tag-1' />
            <input type="text" className='tag-input' placeholder="tag 2" id='tag-2' />
            <input type="text" className='tag-input' placeholder="tag 3" id='tag-3' />
            <input type="text" className='tag-input' placeholder="tag 4" id='tag-4' />
            <input type="text" className='tag-input' placeholder="tag 5" id='tag-5' />
          </div>
        </div>
      </div>
      <button onClick={createOsps} className='add-section-btn'> Create Osp</button>
    </div>
  )
}

export default OspCreate;
