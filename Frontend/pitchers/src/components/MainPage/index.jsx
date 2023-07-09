import "./index.css"
import { useQuery } from "urql";
import Cards from "../Custom/Cards";
import { useEffect, useState } from "react";
import { allOsp } from "../../gql/query";

const MainPage = () => {
  const [osp, setOsp] = useState([]);
  const [result, getAllOsp] = useQuery({ query: allOsp });
  useEffect(() => {
    setOsp(result?.data?.osps)
  })
  console.log(osp)

  return (

    <div className="famous-user-main-box">
      {osp && osp?.map((data) => (
        <Cards id={data._id} title={data.title} description={data.description} createdAt={data.createdAt} />
      ))}
    </div>
  )
};

export default MainPage;
