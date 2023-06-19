import React from "react";
import InputText from "../InputText";
import "./index.css";
const Experience = (props) => {
  let { getValue } = props;
  return (
    <div className="exp-ed-box">
      <div className="inputs-box">
        <InputText
          title=""
          type="experiences"
          objKey="text"
          getValue={getValue}
        />
        <InputText
          title=""
          type="experiences"
          objKey="text"
          getValue={getValue}
        />
      </div>
      <textarea className="text-area"></textarea>
    </div>
  );
};

export default Experience;
