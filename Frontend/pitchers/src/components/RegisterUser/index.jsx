import {
  genderValues,
  hobbyValues,
  inputValues,
  langValues,
  socialProfiles,
} from "../../Constant";
import { toast } from "react-toastify";
import InputText from "../Custom/InputText";
import "./index.css";
import SelectOption from "../Custom/SelectOptions";
import { IoAddCircleOutline, IoEllipseSharp } from "react-icons/io5";
import { useState } from "react";
import Experience from "../Custom/Experience";
import Education from "../Custom/Education";
import { useMutation } from "urql";
import Profiles from "../Custom/Profiles";
import { REGISTER_MUT } from "../../gql/mutations";

const RegisterUser = () => {
  const [LangNo, setlangNo] = useState(3);
  const [socialNo, setSocialNo] = useState(1);
  const [exp, setExp] = useState(1);
  const [ed, setEd] = useState(1);
  const [lang, setLang] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [data, setData] = useState({});
  const [socialPro, setSocialPro] = useState({});

  const getValue = (objKey) => {
    let tempData = data;
    tempData[objKey.key] = objKey.value;
    setData(tempData);
  };

  const [, register] = useMutation(REGISTER_MUT);
  const signInDataManipulation = (objKey, field) => {
    if (objKey.key == "languages") {
      let langs = lang;
      langs.unshift(parseInt(objKey.value));
      setLang(langs);
      getValue({ key: objKey.key, value: lang });
    } else if (objKey.key == "hobbies") {
      let hobbys = hobby;
      hobbys.unshift(parseInt(objKey.value));
      setHobby(hobbys);
      getValue({ key: objKey.key, value: hobbys });
    } else if (objKey.key == "gender") {
      getValue({ key: objKey.key, value: objKey.value });
    } else if (field == "Experience") {
      let exp = experience;
      exp.push(objKey.value);
      setExperience(exp);
      getValue({ key: objKey.key, value: experience });
    } else if (field == "Education") {
      let ed = education;
      ed.push(objKey.value);
      setEducation(ed);
      getValue({ key: objKey.key, value: education });
    } else if (objKey.key === "social_profiles") {
      let socPro = {}; // Initialize socPro as an empty object
      let arrSocPros = [];
      arrSocPros.push(parseInt(objKey.value.social.value));
      socPro[objKey.key] = arrSocPros;
      socPro[objKey.value.url.field] = [objKey.value.url.value];
      setSocialPro(socPro);
      getValue({ key: field, value: socPro });
    }
  };

  async function check() {
    if (data["password"] != data["confirm"]) {
      toast.error("Password and Confirm Password are not same.");
    } else {
      delete data.confirm;
      const response = await register({ options: data });
      console.log(response.data);
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
            field="input"
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
                  signInDataManipulation={signInDataManipulation}
                  field="Languages"
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
                  signInDataManipulation={signInDataManipulation}
                  field="Hobbies"
                />
              ))}
          </div>
          <span onClick={() => setlangNo(LangNo + 1)} className="add-button">
            <IoAddCircleOutline />
          </span>
        </div>
      </div>
      <div className="lang-main">
        <h3 className="fl-lt">Social Profile</h3>
        <div className="lang-select-add">
          <div className="lang-select-box">
            {Array(socialNo)
              .fill({})
              .map((d, i) => (
                <div className="social-profile-box">
                  <Profiles
                    key={i}
                    title={socialProfiles.title}
                    type={socialProfiles.type}
                    objkey={socialProfiles.value}
                    getValue={signInDataManipulation}
                    field="social_profiles"
                  />
                </div>
              ))}
          </div>
          <span
            onClick={() => setSocialNo(socialNo + 1)}
            className="add-button"
          >
            <IoAddCircleOutline />
          </span>
        </div>
      </div>
      <div className="gender-main">
        <h3 className="fl-lt">Gender</h3>
        <SelectOption
          key={genderValues.title}
          title={genderValues.title}
          type={genderValues.type}
          objKey={genderValues.value}
          signInDataManipulation={signInDataManipulation}
          field="Gender"
        />
      </div>
      <div className="ex-ed-select-box">
        <h3 className="fl-lt">Experience</h3>
        <div className="">
          <div className="">
            {Array(exp)
              .fill({})
              .map((d, i) => (
                <Experience
                  key={i}
                  getValue={signInDataManipulation}
                  field="Experience"
                  objKey="experiences"
                />
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
            {Array(ed)
              .fill({})
              .map((d, i) => (
                <Education
                  key={i}
                  getValue={signInDataManipulation}
                  field="Education"
                  objKey="educations"
                />
              ))}
          </div>
          <span onClick={() => setEd(ed + 1)} className="add-button">
            <IoAddCircleOutline />
          </span>
        </div>
      </div>
      <button onClick={() => check()} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default RegisterUser;
