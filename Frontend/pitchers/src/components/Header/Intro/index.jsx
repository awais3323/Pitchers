import React from "react";
import "./index.css";
const Intro = () => {
  return (
    <div className="main-area">
      <div className="main-area-sub1 d-flex flex-column ai-center">
        <span className="app-name-head text-main-color">Pitchers</span>
        <div className="main-head-tags d-flex flex-column ai-center">
          <span className="app-name-tags text-main-color">
            {" "}
            Pitch Your <b>#IDEA</b> <b>#DREAM</b> <b>#VISION</b> <b>#GOAL</b>{" "}
            <b>#Yourself</b>
          </span>
          <span className="app-name-tags text-main-color">
          " Be the Change you want to see in this world "
          </span>
        </div>
      </div>
    </div>
  );
};

export default Intro;
