import React from "react";
import "./index.css";
const Intro = () => {
  return (
    <div className="main-area">
      <div className="main-area-sub1 d-flex flex-column ai-center">
        <span className="app-name-head text-main-color"><span className="highlight-main-head">Pitch</span>ers</span>
        <div className="main-head-tags d-flex flex-column ai-center">
          <span className="app-name-tags text-main-color">
            {" "}
            <b>#IDEA</b> <b>#DREAM</b> <b>#VISION</b> <b>#GOAL</b>{" "}
            <b>#YOURSELF</b>
          </span>
          <span className="app-name-tags text-main-color">
          " Be the Change you want to see in this world " ~ Qoute
          </span>
        </div>
      </div>
    </div>
  );
};

export default Intro;
