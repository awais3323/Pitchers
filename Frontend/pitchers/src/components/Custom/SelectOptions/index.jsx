import React, { useState } from "react";
import "./index.css";

const SelectOption = (props) => {
  let { signInDataManipulation, objKey, field } = props;
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    signInDataManipulation(
      {
        key: objKey,
        value: event.target.value,
      },
      field
    );
  };

  return (
    <div>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="select-main"
      >
        <option value="">Select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </div>
  );
};

export default SelectOption;
