import { Link } from "react-router-dom";
import { LogValues } from "../../Constant";
import { useContext } from "react";
import { barContext } from "../../App";
import InputText from "../Custom/InputText";
import "./index.css";

const LoginUser = () => {
  let data = {};
  const topLoad = useContext(barContext);

  const getValue = (objKey) => {
    data[objKey.key] = objKey.value;
  };

  return (
    <div className="LoginUser">
      <span className="register-main-head">Let's be a Pitcher...</span>
      {LogValues.map((ele, i) => (
        <InputText
          key={i}
          title={ele.title}
          type={ele.type}
          objKey={ele.value}
          getValue={getValue}
        />
      ))}
      <div>
        Already a Pitcher?{" "}
        <Link to="/Sign" onClick={() => topLoad()}>
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default LoginUser;
