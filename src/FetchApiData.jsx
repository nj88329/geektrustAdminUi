import { useState, useEffect } from 'react';


// custom hook created for fetching the data


const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      
      try {
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        const result = await resp.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loader, error };
};

export default useFetch;
