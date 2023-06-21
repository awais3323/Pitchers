import { Link } from "react-router-dom";
import { LogValues } from "../../Constant";
import { useContext, useState } from "react";
import { barContext } from "../../App";
import InputText from "../Custom/InputText";
import "./index.css";
import { useMutation } from "urql";
import { LOGIN_MUT } from "../../gql/mutations";
import { toast } from "react-toastify";

const LoginUser = () => {
  const topLoad = useContext(barContext);
  const [data, setData] = useState({})

  const [, logIn] = useMutation(LOGIN_MUT);
  const getValue = (objKey) => {
    let tempData = data;
    tempData[objKey.key] = objKey.value;
    setData(tempData);
  };
  async function logInUser(){
      const response = await logIn({ options: data });
      if(response.data.loginUser.status){
      toast.success("User Logged In");
      }
      else{
      toast.error(response.data.loginUser.errors[0].message);
      }
  }

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
          field={ele.value}
        />
      ))}
      <button className="log-in-btn" onClick={logInUser}>Log In</button>
      <a href="">Forgot Password</a>
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