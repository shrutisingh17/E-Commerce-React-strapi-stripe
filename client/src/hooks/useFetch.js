// // we;ve o write useEffect for each page to fetch products which is not good. So, we created this useFetch hook

// import { useEffect, useState } from "react";
// import { makeRequest } from "../makeRequest"

// const useFetch = (url) => {

//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const res = await makeRequest.get(url);
//                 setData(res.data.data);
//             } catch (error) {
//                 setError(true);
//                 console.log(error)
//                 console.log(error.request)
//             }
//             setLoading(false); //after data fetch-loading finish
//         };
//         fetchData();
//     }, [url]);
//     return { data, loading, error };
// }
// export default useFetch;

import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(url)
  
        // const res = await makeRequest.get(url);
        setData(res.data.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error};
};

export default useFetch;
