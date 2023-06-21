import React, { useState } from "react";
import InputText from "../InputText";
import { BsCheck2 } from "react-icons/bs";
import TextArea from "../TextArea";
import "./index.css";

const Experience = (props) => {
  let { getValue, field, objKey } = props;
  const [experienceValue, setexperienceValue] = useState({});

  function getExperience(objKey) {
    let exps = experienceValue;
    if (exps[objKey.key]) {
      exps[objKey.key] = "";
    }
    exps[objKey.key] = objKey.value;
    setexperienceValue(exps);
  }
  function assignExperience() {
    getValue(
      {
        key: objKey,
        value: experienceValue,
      },
      field
    );
  }
  return (
    <div className="exp-ed-box">
      <div className="inputs-box">
        <BsCheck2 className="correct-icon" onClick={assignExperience} />
        <InputText
          title="Title"
          type="text"
          objKey="title"
          getValue={getExperience}
          field={field}
        />
        <InputText
          title="Company"
          type="text"
          objKey="company_name"
          getValue={getExperience}
          field={field}
        />
        <TextArea
          title="description"
          objKey="description"
          field={field}
          getValue={getExperience}
        />
        <InputText
          title="Date Joined"
          type="date"
          objKey="date_joined"
          getValue={getExperience}
          field={field}
        />
        <InputText
          title="Date left"
          type="date"
          objKey="date_left"
          getValue={getExperience}
          field={field}
        />
      </div>
    </div>
  );
};

export default Experience;
