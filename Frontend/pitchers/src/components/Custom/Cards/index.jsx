import { useNavigate } from "react-router-dom";

const Cards = (props) => {
  const { id, title, description, createdAt } = props
  const navigate = useNavigate()

  function moveToOspShow(e) {
    e.preventDefault();
    navigate(`/osp-show/${id}`)
    
  }
  return (
    <div onClick={(e)=>moveToOspShow(e)}>
      <div className="card mb-3" style={{ maxWidth: "340px" }}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                {description}
              </p>
              <p className="card-text">
                <small className="text-muted">{createdAt}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
