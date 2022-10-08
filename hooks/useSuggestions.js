import { useEffect, useState } from "react";
import { retrieveSuggestions } from "../controllers/SuggestionController";

const useSuggestions = (page, limit) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const retrieve = async (page, limit) => {
    try {
      setLoading(true);
      const respData = await retrieveSuggestions(page, limit);
      if (respData.length < limit || respData.length === 0) {
        setHasMore(false);
      }
      if (page === 0) setData(respData);
      else setData((prev) => [...prev, ...respData]);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieve(page, limit);
  }, [page, limit]);
  return { data, loading, hasMore, error };
};

export default useSuggestions;
