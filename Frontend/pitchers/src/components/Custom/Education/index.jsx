import React, { useState } from "react";
import InputText from "../InputText";
import { BsCheck2 } from "react-icons/bs";
import TextArea from "../TextArea";
import "./index.css";

const Education = (props) => {
  let { getValue, field, objKey } = props;
  const [educationValue, setEducationValue] = useState({});

  function getEducation(objKey) {
    let eds = educationValue;
    if (eds[objKey.key]) {
      eds[objKey.key] = "";
    }
    eds[objKey.key] = objKey.value;
    setEducationValue(eds);
  }
  function assignEducation() {
    getValue(
      {
        key: objKey,
        value: educationValue,
      },
      field
    );
  }
  return (
    <div className="exp-ed-box">
      <div className="inputs-box">
        <BsCheck2 className="correct-icon" onClick={assignEducation} />
        <InputText
          title="Title"
          type="text"
          objKey="title"
          field={field}
          getValue={getEducation}
        />
        <InputText
          title="Institute"
          type="text"
          objKey="institute_name"
          getValue={getEducation}
          field={field}
        />
        <TextArea
          title="description"
          objKey="description"
          field={field}
          getValue={getEducation}
        />
        <InputText
          title="Date Joined"
          type="date"
          field={field}
          objKey="date_joined"
          getValue={getEducation}
        />
        <InputText
          title="Date left"
          type="date"
          name=""
          field={field}
          objKey="date_left"
          getValue={getEducation}
        />
      </div>
    </div>
  );
};

export default Education;
