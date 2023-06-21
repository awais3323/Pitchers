import React, { useState } from "react";
import SelectOption from "../SelectOptions";
import InputText from "../InputText";
import { BsCheck2 } from "react-icons/bs";

const Profiles = (props) => {
  const { title, type, objKey, getValue, field } = props;
  const [appName, setAppName] = useState({});
  const [url, setUrl] = useState({});

  function manipulateSocialProfilesApp(objKey, fields) {
    setAppName({ value: objKey.value, field: fields });
  }
  function manipulateSocialProfilesUrl(objKey, fields) {
    setUrl({ value: objKey.value, field: fields });
  }
  function combinebothAppUrl() {
    getValue(
      {
        key: field,
        value: { social: appName, url: url },
      },
      field
    );
  }
  return (
    <>
      <SelectOption
        title={title}
        type={type}
        objKey={objKey}
        signInDataManipulation={manipulateSocialProfilesApp}
        field="social_profiles"
      />
      <InputText
        title={title}
        type={type}
        objKey={objKey}
        field="url"
        getValue={manipulateSocialProfilesUrl}
      />
      <BsCheck2 className="correct-icon" onClick={combinebothAppUrl} />
    </>
  );
};

export default Profiles;
