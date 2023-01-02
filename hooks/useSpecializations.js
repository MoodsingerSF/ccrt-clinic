import { useEffect, useState } from "react";
import { retrieveAllSpecializations } from "../controllers/DoctorController";

const useSpecializations = (page, limit) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const retrieve = async (page, limit) => {
    try {
      setLoading(true);
      const data = await retrieveAllSpecializations(page, limit);
      if (data.length < limit) {
        setHasMore(false);
      }
      if (page === 0) setData([{ id: -1, name: "All" }, ...data]);
      else setData((prev) => [...prev, ...data]);
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

export default useSpecializations;
