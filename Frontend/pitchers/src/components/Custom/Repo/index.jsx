import React from "react";

const Repo = (props) => {
    let {title, desc, url, forks, open_issues, branch} = props;
    const style={
        display:"flex",
        justifyContent:"space-around"
    }
  return (
    <div>
      <div className="card" style={{width: "18rem", margin:"0.5vmax"}}>
        <div className="card-body" >
          <h5 className="card-title">{title}</h5>
          {/* <p className="card-text">
            {desc}
          </p> */}
          <div style={style}>

          <p className="card-text">
            forks: {forks}
          </p>
          <p className="card-text">
            Issues: {open_issues}
          </p>
          </div>
          <a href={url} target="blank"className="btn btn-primary">
            visit
          </a>
        </div>
      </div>
    </div>
  );
};

export default Repo;
