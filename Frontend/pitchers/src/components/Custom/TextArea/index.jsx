import React from "react";
import { useEffect, useState } from "react";

const TextArea = (props) => {
  let { objkey } = props;
  let { title, type, getValue, objKey,field } = props;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      getValue({
        key: objKey,
        value: type == "number" ? parseInt(inputValue) : inputValue,
      },field);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);
  return (
    <>
      <textarea
        className="text-area"
        placeholder={objkey}
        onChange={(e) => setInputValue(e.target.value)}
      ></textarea>
    </>
  );
};

export default TextArea;
