import { hobbyValues, inputValues, langValues } from "../../Constant";
import { toast } from "react-toastify";
import InputText from "../Custom/InputText";
import "./index.css";
import SelectOption from "../Custom/SelectOptions";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import Experience from "../Custom/Experience";
import Education from "../Custom/Education";

const RegisterUser = () => {
  let data = {};
  const [LangNo, setlangNo] = useState(3);
  const [exp, setExp] = useState(1);
  const [lang, setLang] = useState([]);
  const [hobby, setHobby] = useState([]);

  const getValue = (objKey) => {
    data[objKey.key] = objKey.value;
    console.log(data);
  };

  const makeArray = (objKey) => {
    if (objKey.key == "languages") {
      let langs = lang;
      langs.unshift(objKey.value);
      setLang(langs);
      getValue({ key: objKey.key, value: lang });
    }
    else if (objKey.key == "hobbies") {
      let hobbys = hobby;
      hobbys.unshift(objKey.value);
      setHobby(hobbys);
      getValue({ key: objKey.key, value: hobbys});
    }
  };
  function check() {
    console.log(data["password"], data["confirm"]);
    if (data["password"] != data["confirm"]) {
      toast.error("Password and Confirm Password are not same.");
    }
  }
  return (
    <div className="register-main">
      <span className="register-main-head">We know you're a Pitcher...</span>
      <div className="register-form-section">
        {inputValues.map((ele, i) => (
          <InputText
            key={i}
            title={ele.title}
            type={ele.type}
            objKey={ele.value}
            getValue={getValue}
          />
        ))}
      </div>
      <div className="lang-main">
        <h3 className="fl-lt">Languages</h3>
        <div className="lang-select-add">
          <div className="lang-select-box">
            {Array(LangNo)
              .fill({})
              .map((d, i) => (
                <SelectOption
                  key={i}
                  title={langValues.title}
                  type={langValues.type}
                  objKey={langValues.value}
                  makeArray={makeArray}
                />
              ))}
          </div>
          <span onClick={() => setlangNo(LangNo + 1)} className="add-button">
            <IoAddCircleOutline />
          </span>
        </div>
      </div>
      <div className="lang-main">
        <h3 className="fl-lt">Hobbies</h3>
        <div className="lang-select-add">
          <div className="lang-select-box">
            {Array(LangNo)
              .fill({})
              .map((d, i) => (
                <SelectOption
                  key={i}
                  title={hobbyValues.title}
                  type={hobbyValues.type}
                  objKey={hobbyValues.value}
                  makeArray={makeArray}
                />
              ))}
          </div>
          <span onClick={() => setlangNo(LangNo + 1)} className="add-button">
            <IoAddCircleOutline />
          </span>
        </div>
      </div>
      <div className="gender-main">
        <h3 className="fl-lt">Gender</h3>
        <SelectOption />
      </div>
      <div className="ex-ed-select-box">
        <h3 className="fl-lt">Experience</h3>
        <div className="">
          <div className="">
            {Array(exp)
              .fill({})
              .map((d, i) => (
                <Experience key={i} getValue={getValue} />
              ))}
          </div>
          <span onClick={() => setExp(exp + 1)} className="add-button">
            <IoAddCircleOutline />
          </span>
        </div>
      </div>
      <div className="ex-ed-select-box">
        <h3 className="fl-lt">Education</h3>
        <div className="">
          <div className="">
            {Array(exp)
              .fill({})
              .map((d, i) => (
                <Education key={i} getValue={getValue} />
              ))}
          </div>
          <span onClick={() => setExp(exp + 1)} className="add-button">
            <IoAddCircleOutline />
          </span>
        </div>
      </div>
      <button onClick={() => check()}>Submit</button>
    </div>
  );
};

export default RegisterUser;
