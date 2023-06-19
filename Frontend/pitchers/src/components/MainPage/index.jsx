import React, { useEffect, useState } from "react";
import axios from "axios";
import { userNamaes } from "../../Constant";
import Cards from "../Custom/Cards";


const MainPage = () => {
  const [response, setResponse] = useState([]);
  const [logins, setLogins] = useState([]);

  async function fetchGitHubData() {
    for (let i = 0; i < userNamaes.length; i++) {
      let data = await axios.get(
        `https://api.github.com/users/${userNamaes[i]}`,
        {
          headers: {
            Authorization: ``,
          },
        }
      );
      let res = response;
      res.push(data.data);
      setResponse(res);
    }
  }
  
    fetchGitHubData();
  console.log(response);
  return (
    <div className="famous-user-main-box">
      {response.map((data) => (
        <Cards img={data.avatar_url}/>
      ))}
    </div>
  );
};

export default MainPage;
