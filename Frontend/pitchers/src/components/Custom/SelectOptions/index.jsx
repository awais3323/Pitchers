import React, { useState } from 'react';
import "./index.css"
const SelectOption = (props) => {
  let { title, type, makeArray, objKey } = props;
  const [selectedOption, setSelectedOption]= useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
      makeArray({
        key: objKey,
        value: event.target.value,
      });
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectChange} className='select-main'>
        <option value="">Select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default SelectOption;
