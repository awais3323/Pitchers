import { inputValues } from "../../Constant";
import { toast } from "react-toastify";
import InputText from "../Custom/InputText";
import "./index.css";

const RegisterUser = () => {
  let data = {};

  const getValue = (objKey) => {
    data[objKey.key] = objKey.value;
  };
  function check() {
    console.log(data["password"], data["confirm"]);
    if (data["password"] != data["confirm"]) {
      toast.error("Password and Confirm Password are not same.");
    }
  }
  return (
    <div className="register-main">
      <span className="register-main-head">Let's be a Pitcher...</span>
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
      <button onClick={() => check()}>Submit</button>
    </div>
  );
};

export default RegisterUser;
