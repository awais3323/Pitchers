import PropTypes from "prop-types";
import "./index.css";
import { useEffect, useState } from "react";

const InputText = (props) => {
  let { title, type, getValue, objKey } = props;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      getValue({
        key: objKey,
        value: type == "number" ? parseInt(inputValue) : inputValue,
      });
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <div className="input-div">
      <span>{title}:</span>
      <input
        type={type}
        className="custom-input"
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

InputText.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  getValue: PropTypes.func,
};

export default InputText;
