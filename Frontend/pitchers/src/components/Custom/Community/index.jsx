// import { useQuery } from 'urql'
// import { getOspByArgs } from '../../../gql/query';
// import "./index.css"
// const Community = () => {
//   let data = {}
//   function getData() {
//     let inputVal = document.getElementById("search").value;
//     let selectVal = document.getElementById("select").value;
//     data = { arg: selectVal, value: inputVal }
//   }
//   console.log(data)
//     const [result] = useQuery({ query: getOspByArgs, variables: { options: data } });
  
//   return (
//     <div className='community-box'>
//       <input type="text" name="search" id="search" />
//       <select defaultValue="title" name="select" id="select">
//         <option value="user">User</option>
//         <option value="title" selected>Title</option>
//         <option value="tag">Tags</option>
//       </select>
//       <button onClick={getData} id='search-btn'>Search</button>
//     </div>
//   )
// }

// export default Community

import React, { useState } from 'react';
import { useQuery } from 'urql';
import { getOspByArgs } from '../../../gql/query';
import './index.css';
import Cards from '../Cards';

const Community = () => {
  const [data, setData] = useState({ arg: '', value: '' });
  const [getOsp, setgetOsp] = useState([]);

  const handleInputChange = (event) => {
        let inputVal = document.getElementById("search").value;
    let selectVal = document.getElementById("select").value;
    setData({arg:selectVal, value:inputVal});
  };

  const handleSearch = () => {
    // Execute the query when the search button is clicked
    executeQuery();
  };

  const [result, executeQuery] = useQuery({
    query: getOspByArgs,
    variables: { options: data },
    pause: true, // Pause the initial query execution
  });

  // Access the data from the query result
  const { data: queryData, fetching, error } = result;
  // setgetOsp(result.getOspByArgs)
  console.log(queryData)

  return (
    <>
    <div className='community-box'>
      <input type='text' name='value' onChange={handleInputChange} id='search' />
      <select name='arg' onChange={handleInputChange} id='select'>
        <option value='user'>User</option>
        <option value='title' selected>Title</option>
        <option value='tag'>Tags</option>
      </select>
      <button onClick={handleSearch} id='search-btn'>
        Search
      </button>
      </div>
      <div className='cards-box-search'>
      {/* Render the query result */}
      {fetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error occurred: {error.message}</p>
      ) : (
        <>
          {queryData && queryData?.getOspByArgs?.map((data => (
               <Cards id={data._id} title={data.title} description={data.description} createdAt={data.createdAt} />
            
          )))}
        </>
      )}
    </div>
    </>
  );
};

export default Community;